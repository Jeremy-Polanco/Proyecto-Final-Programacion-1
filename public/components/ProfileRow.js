const template = document.createElement('template');

template.innerHTML = `
 <link rel="stylesheet" href="../index.css" />
 <style>
 .profile-row {
  border-top: 1px solid #D3D3D3;
  border-bottom: 1px solid #D3D3D3;
  padding: 2% 5%;
 }

 .row-container {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  align-items: center;
 }

 .row-container .label {
  text-transform: uppercase;
  font-size: 0.875rem;
  margin: 0;
  color: var(--grey-500)
 }

 .row-container span {
  font-size: 1.125rem;
  font-weight: 500
 }

 .row-container .value {
  max-width: 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
 }
 
.row-container .password {
  font-size: 0;
 }
.row-container .password::before {
  content: '∗∗∗∗∗'; font-size: initial;
 }

 .row-container .img { 
 max-width: 72px;
 }

 @media (max-width: 776px){
    .profile-row {
    border-top: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    padding: 2% 5%;
  }
  .row-container {
    display: flex;
    justify-content: space-between;
    gap: 20%;
  }

  .row-container span {
    font-size: 1rem;
  }
  
  .row-container .label {
    font-size: 13px;
  }
 }

 </style>
 <div class='profile-row'>
  <div class="row-container">
    <h3 class='label'></h3>
    <div class="value"></div>
  </div>
 </div>
`;

class ProfileRow extends HTMLElement {
  constructor() {
    super();

    this.type = this.getAttribute('type');
    this.value = this.getAttribute('value');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('label');

    if (this.type === 'img') {
      this.shadowRoot.querySelector('.value').innerHTML = `<img src="${
        this.value
      }" alt="${this.getAttribute('label')}" class="img"/>`;
    } else if (this.type === 'password') {
      this.shadowRoot.querySelector(
        '.value'
      ).innerHTML = `<span class="password">${this.value}</span>`;
    } else {
      this.shadowRoot.querySelector(
        '.value'
      ).innerHTML = `<span>${this.value}</span>`;
    }
  }
}

export default window.customElements.define('profile-row', ProfileRow);
