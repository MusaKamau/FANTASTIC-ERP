/*disable-eslint */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { navSlide } from './script';
import { forgotPassword } from './forgotPassword';
import { updateSettings } from './updateSettings';
import { postJob } from './postJob';

// Dom Elements
const loginForm = document.querySelector('.form__login');
const signupForm = document.querySelector('.form__signup');
const logOutBtn = document.querySelector('.logout__btn');
const forgotPasswordForm = document.querySelector('.form__forgotPassword');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const jobPostForm = document.querySelector('.form__postJob');
// const userPostJobForm = document.querySelector('.form__postJob');

// Delegation
navSlide();

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}

// User form data
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });
}

// User password change
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (jobPostForm) {
  jobPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--post-job').textContent = 'Posting...';

    const form = new FormData();
    form.append('category', document.getElementById('job_category').value)
    form.append('name', document.getElementById('title').value);
    form.append('description', document.getElementById('description').value);
    form.append('dateDue', document.getElementById('date_due').value);
    form.append('budget', document.getElementById('budget').value);
    form.append('document', document.getElementById('document').files[0]);
    postJob(form);
  });
}
