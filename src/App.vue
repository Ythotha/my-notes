<template>
  <div
    id="app"
    class="app container"
  >
    <the-header />

    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import api from '@/api/user';

import { mapActions, mapState } from 'pinia';
import { userStore } from '@/stores/user';

import TheHeader from '@/components/TheHeader/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },

  computed: {
    ...mapState(userStore, ['email']),
  },

  async mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await api.getUserData();

      this.setUserEmail(response.email);
      this.setAuthorised(true);
    }
  },

  methods: {
    ...mapActions(userStore, ['setUserEmail', 'setAuthorised']),
  },
};
</script>

<style lang="postcss">
.app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}
</style>
