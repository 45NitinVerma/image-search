import axios from 'axios';

// We need to tell axios to send cookies with requests
axios.defaults.withCredentials = true;

// Get current user
export const getUser = async () => {
  try {
    const res = await axios.get('/auth/user');
    return res.data;
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return null;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await axios.get('/auth/logout');
  } catch (err) {
    console.error(err);
  }
};