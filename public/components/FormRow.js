const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="../index.css" />
  <div class="form-row">
   <label class="form-label"></label>
   <input class="form-input"/>
  </div>
`;

class FormRow extends HTMLElement {
  constructor() {
    super();

    this.name = this.getAttribute('name');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      .querySelector('.form-row')
      .classList.add(this.getAttribute('name'));
    const formLabel = this.shadowRoot.querySelector('label');
    formLabel.htmlFor = this.getAttribute('name');
    formLabel.textContent = this.getAttribute('name');
    const input = this.shadowRoot.querySelector('input');
    if (this.name === 'bio') {
      input.classList.add('form-textarea');
    }

    input.type = this.getAttribute('type');
    input.name = this.getAttribute('name');
  }
}

export default window.customElements.define('form-row', FormRow);
