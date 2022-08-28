import '../components/FormRow.js';

import {
  getInputValue,
  displayAlert,
  setUserToLocalStorage,
} from '../utils/index.js';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
<style>
  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-600);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
</style>
<section class="page">
  <div></div>
  <form class="form">
    <form-row class="email" name="email" type="email"></form-row>
    <form-row class="password "name="password" type="password"></form-row>
    <button class="btn btn-block">Login</button>
    <p>
      Don't have an account?
      <a href="/register" class="register-link">Register</a>
    </p>
    <p>
      Forgot your password?
      <a href="forgot-password" class='reset-link'>
      Reset Password 
      </a>
    </p>
  </form>
</section>
`;

class Login extends HTMLElement {
  constructor() {
    super();

    this.isLoading;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'email',
      });
      const password = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'password',
      });

      await this.handleSubmit({ email, password });
    });
  }
  async handleSubmit({ email, password }) {
    const user = { email, password };
    this.toggleLoading();

    try {
      const response = await fetch('api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      this.toggleLoading();

      if ((await response.status) === 200) {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertText: `Welcome ${data.user.name}, Redirecting to dashboard...`,
          alertType: 'success',
        });

        setUserToLocalStorage(await data);

        setTimeout(() => {
          window.location.replace('/');
        }, 3000);
      } else {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertText: data.msg,
          alertType: 'danger',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  toggleLoading() {
    this.isLoading = !this.isLoading;
    const form = this.shadowRoot.querySelector('form');
    const formBtn = this.shadowRoot.querySelector('.btn');
    if (this.isLoading) {
      form.classList.add('form-loading');
      formBtn.innerHTML = `Loading...`;
    } else {
      form.classList.remove('form-loading');
      formBtn.innerHTML = `login`;
    }
  }
}

window.customElements.define('login-card', Login);
