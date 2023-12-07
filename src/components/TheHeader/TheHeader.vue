<template>
  <header class="header">
    <img
      src="@/assets/img/logo.svg"
      alt=""
      class="header__logo"
    />
    <img
      src="@/assets/img/logo-mobile.svg"
      alt=""
      class="header__logo-mobile"
    />
    <template v-if="authorised">
      <user-info />
    </template>
    <template v-else>
      <the-button @click="showLoginModal()">
        <icon-login />
        Вход
      </the-button>
      <the-modal v-model="loginModalVisible">
        <login-form @success="loginModalVisible = false"></login-form>
      </the-modal>
    </template>
  </header>
</template>

<script>
import { mapState } from 'pinia';
import { userStore } from '@/stores/user';

import IconLogin from '@/components/icons/IconLogin.vue';

import TheButton from '@/components/TheButton.vue';
import TheModal from '@/components/TheModal.vue';
import LoginForm from '@/components/LoginForm.vue';
import UserInfo from './components/UserInfo.vue';

export default {
  components: {
    IconLogin,

    TheButton,

    TheModal,
    LoginForm,
    UserInfo,
  },

  data() {
    return {
      loginModalVisible: false,
    };
  },

  computed: {
    ...mapState(userStore, ['authorised']),
  },

  methods: {
    showLoginModal() {
      this.loginModalVisible = true;
    },
  },
};
</script>

<style lang="postcss">
@import '@/assets/media.css';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding-block: var(--header-padding-block);

  &__logo {
    @media (--to-tablet) {
      display: none;
    }
  }

  &__logo-mobile {
    @media (--from-tablet) {
      display: none;
    }
  }
}
</style>
