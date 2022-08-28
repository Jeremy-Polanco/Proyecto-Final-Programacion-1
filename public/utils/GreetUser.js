const template = document.createElement('template');

template.innerHTML = `
 <h1></h1>
`;

class GreetUser extends HTMLElement {
  constructor() {
    super();
    this.user = JSON.parse(localStorage.getItem('user')).user;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(
      'h1'
    ).innerHTML = `Bienvenido ${this.user.name}`;
  }
}

window.customElements.define('greet-user', GreetUser);
