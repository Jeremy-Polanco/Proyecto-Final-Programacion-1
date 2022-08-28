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
   .login-link {
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
    <form-row class="name" name="name" type="text"></form-row>
    <form-row class="email" name="email" type="email"></form-row>
    <form-row class="password "name="password" type="password"></form-row>
   <button class="btn btn-block">Register</button>
   <p>
    Already a have an account?
    <a href="./login" class="login-link">Log In</a>
   </p>
   </form>
 </section>
`;

class Register extends HTMLElement {
  constructor() {
    super();

    this.isLoading;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const btn = this.shadowRoot.querySelector('.btn');
    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'name',
      });
      const email = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'email',
      });
      const password = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'password',
      });

      this.handleSubmit({ name, email, password });
    });
  }

  async handleSubmit({ name, email, password }) {
    const user = { name, email, password };

    this.toggleLoading();

    try {
      const response = await fetch('api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      this.toggleLoading();

      if (response.status === 201) {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertText: data.msg,
          alertType: 'success',
        });

        setUserToLocalStorage(await data);
      } else {
        displayAlert({
          shadowRoot: this.shadowRoot,
          alertText: data.msg,
          alertType: 'danger',
        });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('user');
      displayAlert({
        shadowRoot: this.shadowRoot,
        alertText: error.msg || 'there was an error',
        alertType: 'danger',
      });
    }
  }

  submitCallback(e) {
    e.preventDefault();

    const name = getInputValue({
      shadowRoot: this.shadowRoot,
      inputName: 'name',
    });
    const email = getInputValue({
      shadowRoot: this.shadowRoot,
      inputName: 'email',
    });
    const password = getInputValue({
      shadowRoot: this.shadowRoot,
      inputName: 'password',
    });
    this.handleSubmit({ name, email, password });
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

window.customElements.define('register-card', Register);
