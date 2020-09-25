import axios from 'axios'

export const signup = async(name, email, password, passwordConfirm) => {
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if(res.data.status === 'success') {
      alert('Account created successfully');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}
