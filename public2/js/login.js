const login = (email, password) => {
  alert(email, password);
}
document.querySelector('.form').addEventListener('submmit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password)
})
