<template>
  <transition name="fade">
    <div
      v-if="value"
      class="modal"
    >
      <div
        v-click-outside
        class="modal__content"
      >
        <slot />
        <the-button
          @click="closeModal"
          round
          size="56"
          class="modal__close"
        >
          <icon-cross />
        </the-button>
      </div>
    </div>
  </transition>
</template>

<script>
import ClickOutside from '@/directives/v-click-outside.js';

import IconCross from '@/components/icons/IconCross.vue';

import TheButton from '@/components/TheButton.vue';

export default {
  components: {
    IconCross,

    TheButton,
  },

  directives: {
    ClickOutside,
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="postcss">
.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 0.4rem;

  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    inset: inherit;

    background-color: var(--color-dark);
    opacity: 0.7;
  }

  &__content {
    position: relative;
    box-sizing: border-box;
    width: min(var(--modal-width, auto), calc(100% - 0.8rem));
    max-height: 100%;
    border-radius: 3.2rem;
    padding: var(--modal-content-padding);

    background-color: var(--color-dark-middle);

    overflow: auto;
  }

  &__close {
    position: absolute;
    top: var(--close-btn-indent, 1.2rem);
    right: var(--close-btn-indent, 1.2rem);
  }
}
</style>
