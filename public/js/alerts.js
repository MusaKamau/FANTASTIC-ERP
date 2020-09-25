// hide alert
export const hideAlert = () => {
  const el = document.querySelecor('.alert');
  if(el){
    el.parentElement.removeChild(el);
  }
}

// type is 'success' or 'error'
export const showAlert = (type, msg) => {
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelecor('body').insertAdjacentHTML('afterbegin', markup);
};
