<template>
  <button
    @click="$emit('click', $event)"
    :style="size ? `--btn-size: ${btnSizeValue}` : ''"
    :class="{ btn_round: round, btn_dark: dark }"
    class="btn"
    :type="submit ? '' : 'button'"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    round: Boolean,
    size: [String, Number],
    disabled: Boolean,
    submit: Boolean,
    dark: Boolean,
  },

  computed: {
    btnSizeValue() {
      if (!this.size) return undefined;

      if (isNaN(this.size?.slice(-1))) {
        return this.size;
      }

      return `${this.size}px`;
    },
  },
};
</script>

<style lang="postcss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  box-sizing: border-box;
  min-width: var(--btn-size, auto);
  min-height: var(--btn-size, auto);
  border: none;
  border-radius: 3.2rem;
  padding: var(--btn-padding-block) var(--btn-padding-inline);

  color: var(--color-text);
  font-size: 2rem;
  line-height: 1.6;

  background-color: var(--color-green-light);

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-green-middle);
  }

  &:active {
    background-color: var(--color-green-dark);
  }

  &_round {
    padding-inline: var(--btn-padding-block);
  }

  &_dark {
    background-color: var(--color-dark-middle);
  }

  &[disabled] {
    background-color: var(--color-gray);

    cursor: not-allowed;
  }
}
</style>
