import { defineStore } from 'pinia';

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    authorised: !!localStorage.getItem('token'),
    email: '',
  }),
  actions: {
    setAuthorised(value) {
      this.authorised = value;
    },

    setUserEmail(email) {
      this.email = email;
    },
  },
});
