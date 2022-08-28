import { params } from '../utils/getQueryParam.js';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
 <section class="page">
 </section>
`;

class VerifyAccount extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  async verifyToken() {
    try {
      const response = await fetch('/api/v1/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          verificationToken: params.get('token'),
          email: params.get('email'),
        }),
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async connectedCallback() {
    const page = this.shadowRoot.querySelector('.page');

    page.innerHTML = `
    <div class="loading"></div>
    `;
    const response = await this.verifyToken();

    if ((await response.status) === 200) {
      page.innerHTML = `
    <h2>Account Confirmed</h2>
    <a href='/login' class='btn'>
      Please login
    </a>
    `;
    } else {
      page.innerHTML = `
      <h4>There was an error, please double check your verification link </h4>
    `;
    }
  }
}

window.customElements.define('verify-account', VerifyAccount);
