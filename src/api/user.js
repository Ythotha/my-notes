import axios from 'axios';

export default {
  async register(data) {
    const response = await axios.post('reg', data);

    return response.data;
  },

  async login(authData) {
    const response = await axios.post('auth', authData);

    return response.data;
  },

  async logout() {
    const response = await axios.delete('auth');

    return response.data;
  },

  async getUserData() {
    const response = await axios.get('auth');

    return response.data;
  },
};
