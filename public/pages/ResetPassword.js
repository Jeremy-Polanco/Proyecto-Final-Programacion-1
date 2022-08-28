import '../components/FormRow.js';
import { getInputValue, displayAlert, params } from '../utils/index.js';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
 <style>
 h4,
 p {
  text-align: center;
 }
 p{
  margin: 0;
  margin-top: 1rem;
 }
 </style>
 <section class="page">
  <div></div>
  <form class="form">
   <h4>reset password</h4>
   <form-row class="password" type="password" name="password"></form-row>
   <button class="btn btn-block">New Password</button>
  </form>
 </section>
`;

class ResetPassword extends HTMLElement {
  constructor() {
    super();

    this.isLoading;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const password = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'password',
      });

      await this.handleSubmit(password);
    });
  }

  async handleSubmit(password) {
    this.toggleLoading();

    if (!password) {
      displayAlert({
        shadowRoot: this.shadowRoot,
        alertType: 'danger',
        alertText: 'Please provide a password',
      });
    }
    try {
      const response = await fetch('api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token: params.get('token'),
          email: params.get('email'),
        }),
      });
      const data = await response.json();
      this.toggleLoading();
      if ((await response.status) === 200) {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertType: 'success',
          alertText: data.msg,
        });

        setTimeout(() => {
          window.location.replace('/login');
        }, 2500);
      }
    } catch (error) {
      displayAlert({
        shadowRoot: this.shadowRoot,
        alertType: 'danger',
        alertText: 'Something went wrong, please try again',
      });

      console.log(error);
    }
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    const form = this.shadowRoot.querySelector('form');
    const formBtn = this.shadowRoot.querySelector('.btn');
    if (this.isLoading) {
      form.classList.add('form-loading');
      formBtn.innerHTML = `Please wait...`;
    } else {
      form.classList.remove('form-loading');
      formBtn.innerHTML = `New password`;
    }
  }
}

window.customElements.define('reset-password', ResetPassword);
