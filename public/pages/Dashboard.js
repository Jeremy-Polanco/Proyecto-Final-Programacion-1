import '../utils/protectedRoute.js';
import '../components/ProfileRow.js';

const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="../index.css" />
 <style>
 p span {
   background: var(--primary-500);
   padding: 0.15rem 0.25rem;
   color: var(--white);
   border-radius: var(--borderRadius);
   letter-spacing: var(--letterSpacing);
 }
 h2 {
  font-size: 1.25rem;
 }

 .section {
  max-width: 850px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  margin: 0 auto;
 }

 .section-header{ 
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  padding: 2% 5%;
 }

 .profile {
  font-size: 1.5rem;
  text-transform: capitalize;
 }

 .profile span {
  display: block;
  font-size: 0.85rem;
  color: var(--grey-500);
 }

  @media (max-width: 776px){
  .profile span { 
    font-size: 13px;
    width: 80%;
  }
  .section {
    border: none;
  }
  .section-header{ 
    width: 100%;
  }
 }

 </style>
 <div></div>
 <div class="page">
  <h1 class='title'>personal info</h1>
  <h2 class='title'>basic info, like your name and photo</h2>
  <section class="section profile-section">
 
  </section>
 </div>
`;

class Home extends HTMLElement {
  constructor() {
    super();

    this.isLoading = false;

    this.user = JSON.parse(localStorage.getItem('user')).user;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.showUser();
  }

  async showUser() {
    this.toggleLoading();

    const userPhoto = this.shadowRoot.querySelector('.user-photo');
    const userName = this.shadowRoot.querySelector('.user-name');
    const userBio = this.shadowRoot.querySelector('.user-bio');
    const userEmail = this.shadowRoot.querySelector('.user-email');
    const userPhone = this.shadowRoot.querySelector('.user-phone');

    const profileSection = this.shadowRoot.querySelector('.profile-section');

    try {
      const response = await fetch('api/v1/users/showMe');
      const data = await response.json();

      const { image, name, bio, email, phone } = await data.user[0];

      profileSection.innerHTML = `
      <div class="section-header">
        <div class='profile'>profile 
          <span>
          Some info may be visible to other people
          </span>
        </div>
          <a class="btn" href="/edit-user">Edit</a>
        </div>

        <profile-row type="img" value=${image} label="photo" class='user-photo'></profile-row>

        <profile-row type='text' label='name' value=${name} class="user-name"></profile-row>

        <profile-row type='text' label='bio' value='${bio}' class='user-bio'></profile-row>

        <profile-row type='text' label='phone' value=${phone} class='user-phone'></profile-row>

        <profile-row type='text' label='email' value=${email} class="user-email"></profile-row>

        <profile-row type='password' label='password' value='secret'></profile-row>      
      `;
    } catch (error) {
      console.log(error);
    }
    this.toggleLoading();
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    const page = this.shadowRoot.querySelector('.page');
    const loadingAnimation = this.shadowRoot.querySelector('div');
    if (this.isLoading) {
      page.classList.add('hide');
      loadingAnimation.classList.add('loading');
    } else {
      page.classList.remove('hide');
      loadingAnimation.classList.remove('loading');
    }
  }
}

window.customElements.define('home-page', Home);
