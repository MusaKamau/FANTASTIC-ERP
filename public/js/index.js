
import '@babel/polyfill';
import {login} from './login';
import {signup} from './signup';
import {navSlide} from './script'


// Dom Elements
const loginForm = document.querySelector('.form__login');
const signupForm = document.querySelector('.form__signup');


// Delegation
if (loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
  })
}

if(signupForm){
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  })
}


navSlide()
