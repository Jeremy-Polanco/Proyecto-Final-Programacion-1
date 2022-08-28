export const displayAlert = ({ shadowRoot, alertText, alertType }) => {
  const alert = shadowRoot.querySelector('div');
  alert.classList.add('alert', `alert-${alertType}`);
  alert.innerHTML = alertText;

  setTimeout(() => {
    alert.classList.remove('alert', `alert-${alertType}`);
    alert.innerHTML = '';
  }, 3000);

  return alert;
};
