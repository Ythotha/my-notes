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
    <div class="field__bottom">
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="hasError"
          class="field__messages"
        >
          <span
            v-for="(err, i) in errorItems"
            :key="i"
            class="field__message"
          >
            {{ err }}
          </span>
        </div>
        <div
          v-else
          class="the-input__message"
          key="details"
        >
          {{ hint }}
        </div>
      </transition>
      <span
        v-if="maxLength"
        class="field__counter"
      >
        {{ innerValue.length }}
        /
        {{ maxLength }}
      </span>
    </div>
  </label>
</template>

<script>
// import { minLength } from 'vuelidate/dist/validators.min.js';

import IconEye from '@/components/icons/IconEye.vue';

export default {
  components: {
    IconEye,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    textarea: {
      type: Boolean,
    },
    errorMessages: {
      type: [Array, String],
    },
    maxLength: {
      type: [String, Number],
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

    errorItems() {
      if (typeof this.errorMessages === 'string') {
        return [this.errorMessages];
      }

      if (Array.isArray(this.errorMessages)) {
        return this.errorMessages;
      }

      return [];
    },

    hasError() {
      return this.errorItems.length > 0;
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

  &__label,
  &__bottom {
    padding-inline: 2.4rem;
  }

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
    border: none;
    border-radius: 3.6rem;
    padding-inline: var(--field-input-padding-x, 2.8rem);

    font-family: inherit;
    font-size: inherit;
  }

  &__input::placeholder,
  &__textarea::placeholder {
    color: var(--gray);
  }

  &__input:focus,
  &__textarea:focus {
    box-shadow: inset var(--color-green-light) 0 0 0 0.2rem;

    outline: none;
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

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.8rem;
    margin-block-start: 0.8rem;
  }

  &__messages {
    display: grid;
    gap: 0.8rem;

    color: var(--color-error);
  }

  &__counter {
    flex-shrink: 0;

    color: var(--color-gray);
  }
}
</style>
