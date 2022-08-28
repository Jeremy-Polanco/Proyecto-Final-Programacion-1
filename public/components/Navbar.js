import { logoutUser } from '../utils/index.js';

const user = localStorage.getItem('user');

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
 <style>
  nav{
   background: var(--primary-100);
   height: 6rem;
   display: flex;
   align-items: center;
   justify-content: center;
  }

  nav .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
  }
   .nav-links p {
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
   .home-link {
    display: flex;
    align-items: flex-end;
  }
   h2 {
    font-weight: 700;
    color: var(--black);
  }
   h2 span {
    color: var(--primary-600);
  }
 @media (min-width: 776px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0;
      margin-right: 1.5rem;
    }
  }
 </style>

 <nav>
  <div class="nav-center">
   <a href="/" class="home-link">
    <img />
   </a>
   <div class="nav-links"></div>
  </div> 
 </nav>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();

    this.user = user && JSON.parse(localStorage.getItem('user')).user;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (
      (this.user && window.location.href === 'http://localhost:5000/') ||
      window.location.href === 'http://localhost:5000/edit-user'
    ) {
      const navLinks = this.shadowRoot.querySelector('.nav-links');

      navLinks.innerHTML = `
      <p>hello, ${this.user.name}</p>
      <button class="btn btn-small">
        logout
      </button>
      `;

      const btn = navLinks.querySelector('.btn');
      btn.addEventListener('click', logoutUser);
    }
  }
}

export default window.customElements.define('navbar-app', Navbar);
