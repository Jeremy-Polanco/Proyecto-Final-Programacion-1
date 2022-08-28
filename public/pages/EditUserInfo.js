import '../components/FormRow.js';
import {
  getInputValue,
  displayAlert,
  setUserToLocalStorage,
} from '../utils/index.js';
const template = document.createElement('template');

template.innerHTML = `
 <link rel="stylesheet" href="../index.css" />
 <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" rel="stylesheet" />
 <style>
 .section {
  max-width: 850px;
  min-width: 250px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  margin: 0 auto;
 }

 .back-link{
  position: absolute;
  left: 0;
  top: -4%;
  }

  .section-title h1 {
  margin: 0;
  font-size: 1.
  }

  .section-title span {
    font-size: 0.875rem;
  }

 .img-container{
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  align-items: center;
  justify-content: space-between;
  margin:4% 0;
 }

 .img-container span {
  margin-left: 10%;
  color: var(--grey-500);
  cursor: pointer;
 }

 .change-img{ 
  position: relative;
 }

 .fa-camera{
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
 }

 </style>
 
<main class="main page">
  <form class="section form">
    <a href="/" class="back-link">
    <i class="fa-solid fa-chevron-left"></i> 
    back
    </a >
    <div></div>
    <div class="section-title">
      <h1>Change Info</h1>
      <span>Changes will be reflected every services</span>
    </div>
    <div class="img-container">
    <div class="change-img">
      <i class="fa-solid fa-camera"></i>
      <img src="../assets/proxy.jpg" alt="" class="img" />
    </div>
      <span class="change-photo">Change photo</span>
    </div>
    <input type="file" class="image-input hide" 
    id="image"accept="image/*"/>
    <form-row name="name" type="text" class='name'></form-row>
    <form-row name="bio" type="text" class="bio"></form-row>
    <form-row name="phone" type="number" class="phone"></form-row>
    <form-row name="email" type="email" class="email"></form-row>
    <button class="btn">Save</button>
 </form>
</main>
`;

class EditUserInfo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    const imageInput = this.shadowRoot.querySelector('.image-input');
    this.shadowRoot
      .querySelector('.change-photo')
      .addEventListener('click', () => {
        imageInput.click();
      });

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const imageFile = this.shadowRoot.querySelector('.image-input').files[0];

      console.log(imageFile);

      const name = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'name',
      });

      const email = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'email',
      });

      const phone = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'phone',
      });

      const bio = getInputValue({
        shadowRoot: this.shadowRoot,
        inputName: 'bio',
      });

      this.handleSubmit({ name, email, bio, phone, imageFile });
    });
  }
  async handleSubmit({ name, email, phone, bio, imageFile }) {
    const user = { name, email, phone, bio };

    this.toggleLoading();

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      if (name || email || phone || bio) {
        const response = await fetch('api/v1/users/updateuser', {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();

        if (response.status === 200) {
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
      }
      if (imageFile) {
        const response = await fetch('api/v1/users/updateuser', {
          method: 'PATCH',
          body: formData,
        });

        const data = await response.json();

        if (response.status === 200) {
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
      }

      this.toggleLoading();
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

window.customElements.define('edit-user', EditUserInfo);
