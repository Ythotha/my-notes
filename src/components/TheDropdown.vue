<template>
  <transition name="fade">
    <div
      v-if="value"
      class="dropdown"
    >
      <div class="dropdown__content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import ClickOutside from '@/directives/v-click-outside.js';

export default {
  directives: {
    ClickOutside,
  },

  props: {
    value: {
      type: Boolean,
    },
  },
};
</script>

<style lang="postcss">
.dropdown {
  position: relative;

  &__content {
    position: absolute;
    top: 2.1rem;
    right: 0;
    padding: 4rem;
    border-radius: 1.2rem;

    background-color: var(--color-dark-middle);
  }

  &__content::before {
    --size: 1.3rem;

    content: '';
    position: absolute;
    bottom: 100%;
    right: 2rem;
    border-right: 0.9rem solid transparent;
    border-bottom: 0.9rem solid var(--color-dark-middle);
    border-left: 0.9rem solid transparent;
  }
}
</style>
