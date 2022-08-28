import '../components/FormRow.js';
import { getInputValue, displayAlert } from '../utils/index.js';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
 <style>
  h4,
  p {
   text-align: center
  }
  p {
   margin: 0;
   margin-top: 1rem
  }
  .login-link {
   display: inline-block;
   margin-left: 0.25rem;
   text-transform: capitalize;
   color: var(--primary-500);
   cursor: pointer;
  }
 </style>
  <main class="page">
  <div></div>
   <form class="form">
    <h4>Forgot password</h4>
    <form-row class="email" name="email" type="email"></form-row>   
    <button class="btn btn-block">
    Get reset password link
    </button>
    <p>
    Already have an account?
     <a href="/login" class="login-link">Log in</a>
    </p>
   </form>
  </main>
`;

class ForgotPassword extends HTMLElement {
  constructor() {
    super();

    this.isLoading = false;
    this.showAlert = false;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'email',
      });

      await this.handleSubmit(email);
    });
  }
  async handleSubmit(email) {
    this.toggleLoading();

    if (!email) {
      displayAlert({
        shadowRoot: this.shadowRoot,
        alertType: 'danger',
        alertText: 'Please provide email',
      });
    }
    try {
      const response = await fetch('api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      this.toggleLoading();
      if ((await response.status) === 200) {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertType: 'success',
          alertText: data.msg,
        });
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

    if (this.isLoading) {
      form.classList.add('form-loading');
    } else {
      form.classList.remove('form-loading');
    }
  }
}

window.customElements.define('forgot-password', ForgotPassword);
