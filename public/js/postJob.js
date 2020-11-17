import axios from 'axios';
import { showAlert } from './alerts';

export const postJob = async (info) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/jobs/create',
      data: {
        info
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Job Posted successfully');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
