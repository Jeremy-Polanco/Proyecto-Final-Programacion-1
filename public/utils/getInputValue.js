export const getInputValue = ({ shadowRoot, inputName }) => {
  return shadowRoot
    .querySelector(`.${inputName}`)
    .shadowRoot.querySelector('input').value;
};
