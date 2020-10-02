
import '@babel/polyfill';
import {login, logout}from './login';
import {signup} from './signup';
import {navSlide} from './script'
import {forgotPassword} from './forgotPassword'
import {updateData} from './updateSettings'


// Dom Elements
const loginForm = document.querySelector('.form__login');
const signupForm = document.querySelector('.form__signup');
const logOutBtn = document.querySelector('.logout__btn');
const forgotPasswordForm = document.querySelector('.form__forgotPassword');
const updateDataForm = document.querySelector('.form-user-data');


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

if(updateDataForm){
  updateDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateData(name, email);
  });
}

navSlide()

if(logOutBtn){
  logOutBtn.addEventListener('click',logout);
}


if(forgotPasswordForm){
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  })
}
