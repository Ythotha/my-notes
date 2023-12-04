<template>
  <label class="field">
    <span
      v-if="label"
      class="field__label"
    >
      {{ label }}
    </span>
    <div class="field__inner">
      <input
        v-if="!textarea"
        v-model="innerValue"
        :type="currentFieldType"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
        class="field__input"
      />
      <button
        v-if="type === 'password'"
        @click="togglePassword"
        type="button"
        class="field__password-toggle"
      >
        <icon-eye :crossed="passwordVisible ? true : false" />
      </button>
      <textarea
        v-if="textarea"
        v-model="innerValue"
        :placeholder="placeholder"
        class="field__textarea"
      ></textarea>
    </div>
  </label>
</template>

<script>
// import { minLength } from 'vuelidate/lib/validators';
import { minLength } from 'vuelidate/dist/validators.min.js';

import IconEye from '@/components/icons/IconEye.vue';

export default {
  components: {
    IconEye,
  },

  props: {
    value: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    textarea: {
      type: Boolean,
    },
  },

  data() {
    return {
      passwordVisible: false,
      innerValue: this.value,
    };
  },

  computed: {
    currentFieldType() {
      if (this.type !== 'password') {
        return this.type;
      }

      if (this.passwordVisible) {
        return 'text';
      }

      return 'password';
    },
  },

  methods: {
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style lang="postcss">
@import '@/assets/media.css';

.field {
  display: block;

  font-size: 1.8rem;

  &__label {
    color: var(--color-gray);
  }

  &__inner {
    position: relative;
    margin-block-start: 0.8rem;
  }

  &__input,
  &__textarea {
    box-sizing: border-box;
    width: 100%;
    border-radius: 3.6rem;
    padding-inline: var(--field-input-padding-x, 2.8rem);

    font-family: inherit;
    font-size: inherit;
  }

  &__input {
    padding-block: 2.25rem;
  }

  &__input_password {
    padding-inline: var(--field-input-padding-x, 2.8rem) 5.8rem;
  }

  &__password-toggle {
    position: absolute;
    top: 50%;
    right: var(--field-input-padding-x, 2.8rem);
    border: none;
    padding: 0;

    transform: translateY(-50%);

    background-color: transparent;

    cursor: pointer;

    isolation: isolate;
  }

  &__password-toggle::before {
    content: '';
    position: absolute;
    inset: -1rem;

    z-index: -1;
  }

  &__textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: var(--textarea-min-height);
    padding-block: 1.6rem;
  }
}
</style>
