<template>
  <div
    ref="userInfo"
    class="user-info"
    v-click-outside="{ method: closeDropdown }"
  >
    <div class="user-info__inner">
      <span
        class="user-info__email"
        :title="email"
      >
        {{ email }}
      </span>
      <the-button
        @click="openDropdown"
        dark
        round
        class="user-info__btn"
      >
        <icon-person class="user-info__btn-icon" />
      </the-button>
    </div>
    <the-dropdown
      v-model="contextMenuVivible"
      class="user-info__dropdown"
    >
      <button
        class="link"
        type="button"
        @click="logout"
      >
        Выйти
      </button>
    </the-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { userStore } from '@/stores/user';

import api from '@/api/user';

import ClickOutside from '@/directives/v-click-outside.js';

import IconPerson from '@/components/icons/IconPerson.vue';

import TheButton from '@/components/TheButton.vue';
import TheDropdown from '@/components/TheDropdown.vue';

export default {
  components: {
    IconPerson,

    TheButton,
    TheDropdown,
  },

  directives: {
    ClickOutside,
  },

  props: {},

  data() {
    return {
      contextMenuVivible: false,
    };
  },

  computed: {
    ...mapState(userStore, ['email']),
  },

  methods: {
    ...mapActions(userStore, ['$reset']),

    openDropdown() {
      this.contextMenuVivible = true;
    },

    closeDropdown() {
      this.contextMenuVivible = false;
    },

    async logout() {
      try {
        await api.logout();
        localStorage.setItem('token', '');
        this.$reset();
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="postcss">
@import '@/assets/media.css';

.user-info {
  &__inner {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    min-width: 0;
  }

  &__email {
    min-width: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__btn {
    @media (--to-tablet) {
      --btn-size: 3.6rem;
    }

    @media (--from-tablet) {
      --btn-size: 5.6rem;
    }
  }

  &__btn-icon {
    @media (--to-tablet) {
      width: 1.4rem;
      height: 1.8rem;
    }
  }
}
</style>
