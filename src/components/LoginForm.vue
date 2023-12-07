<template>
  <div class="login-form">
    <span class="title title_second login-form__title">
      <template v-if="displayingLoginForm"> Вход в ваш аккаунт </template>
      <template v-else> Регистрация </template>
    </span>
    <form
      @submit="onSubmit"
      action=""
      class="login-form__form"
    >
      <the-field
        v-model="email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        label="Email"
        placeholder="Введите Email"
        class="login-form__field"
      ></the-field>
      <the-field
        v-model="password"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        class="login-form__field"
      ></the-field>
      <the-field
        v-if="!displayingLoginForm"
        v-model="passwordRepeat"
        :error-messages="passwordRepeatErrors"
        @blur="$v.passwordRepeat.$touch()"
        label="Пароль ещё раз"
        placeholder="Введите пароль"
        type="password"
        class="login-form__field"
      ></the-field>
      <div class="login-form__bottom">
        <the-button
          submit
          class="login-form__submit"
          :disabled="$v.$invalid"
        >
          <template v-if="displayingLoginForm"> Войти </template>
          <template v-else> Зарегистрироваться </template>
        </the-button>
        <span class="login-form__text">
          <template v-if="displayingLoginForm"> У вас нет аккаунта? </template>
          <template v-else> У вас есть аккаунт? </template>
          <button
            @click="toggleFormType"
            class="link"
            type="button"
          >
            <template v-if="displayingLoginForm"> Зарегистрируйтесь </template>
            <template v-else> Войдите </template>
          </button>
        </span>
      </div>
    </form>
    <template v-if="formErrorMessages.length > 0">
      <span
        v-for="(item, index) in formErrorMessages"
        :key="index"
        class="login-form__message"
      >
        {{ item }}
      </span>
    </template>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  minLength,
} from 'vuelidate/dist/validators.min.js';

import axios from 'axios';

import api from '@/api/user';

import { mapActions } from 'pinia';
import { userStore } from '@/stores/user';

import TheField from '@/components/TheField.vue';
import TheButton from '@/components/TheButton.vue';

const passwordMinLength = 4;

export default {
  components: {
    TheField,
    TheButton,
  },

  data() {
    return {
      displayingLoginForm: true,
      email: null,
      password: null,
      passwordRepeat: null,
      message: 'null',
      formErrorMessages: [],
    };
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(passwordMinLength),
    },
    passwordRepeat: {
      required: requiredIf((component) => {
        return !component.displayingLoginForm;
      }),
      sameAsPassword: function (value) {
        if (!this.displayingLoginForm) {
          return this.password === value;
        }

        return true;
      },
    },
  },

  computed: {
    emailErrors() {
      let errors = [];

      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Обязательное поле');
      !this.$v.email.email &&
        errors.push('Некорректный адрес электронной почты');

      return errors;
    },

    passwordErrors() {
      let errors = [];

      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Обязательное поле');
      !this.$v.password.minLength &&
        errors.push(`Пароль должен быть длиннее ${passwordMinLength} символов`);

      return errors;
    },

    passwordRepeatErrors() {
      let errors = [];

      if (!this.$v.passwordRepeat.$dirty) return errors;
      !this.$v.passwordRepeat.required && errors.push('Обязательное поле');
      !this.$v.passwordRepeat.sameAsPassword &&
        errors.push('Не соответствует полю "Пароль"');

      return errors;
    },
  },

  methods: {
    ...mapActions(userStore, ['setAuthorised', 'setUserEmail']),

    toggleFormType() {
      this.displayingLoginForm = !this.displayingLoginForm;
    },

    onSubmit(event) {
      event.preventDefault();

      if (this.displayingLoginForm) {
        this.login();
      } else {
        this.register();
      }
    },

    async register() {
      try {
        await api.register({
          email: this.email,
          password: this.password,
          confirm_password: this.passwordRepeat,
        });
        this.login();
      } catch (error) {
        console.log('register error');
        console.log(error);

        if (typeof error.response.data.message === 'string') {
          this.formErrorMessages = [error.response.data.message];
        }

        if (Array.isArray(error.response.data.message)) {
          this.formErrorMessages = error.response.data.message;
        }
      }
    },

    async login() {
      try {
        const response = await api.login({
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
        this.setUserEmail(this.email);
        this.setAuthorised(true);
        this.$emit('success');
        this.$router.push({ name: 'notes' });
      } catch (error) {
        let responseErrors;

        if (typeof error.response.data.message === 'string') {
          responseErrors = [error.response.data.message];
        }

        if (Array.isArray(error.response.data.message)) {
          responseErrors = error.response.data.message;
        }

        console.log('login error');
        console.log(error);
        this.formErrorMessages = responseErrors;
      }
    },
  },
};
</script>

<style lang="postcss">
@import '@/assets/media.css';

.login-form {
  &__title {
    display: block;

    @media (--to-tablet) {
      padding-top: 1.8rem;
      padding-right: var(--cross-btn-size);
    }
  }

  &__form,
  &__bottom {
    margin-block-start: var(--form-indent);
  }

  &__field:not(:first-child) {
    margin-block-start: var(--form-field-indent);
  }

  &__bottom {
    gap: 2rem;

    @media (--to-tablet) {
      display: grid;
      text-align: center;
    }

    @media (--from-tablet) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__submit {
    @media (--to-tablet) {
      width: 100%;
    }

    @media (--from-tablet) {
      order: 1;
    }
  }

  &__text {
    display: block;

    color: var(--color-gray);
    font-size: var(--form-text-font-size);
  }

  &__message {
    display: block;
    margin-block-start: 2rem;
    border-radius: 2.4rem;
    padding: 0.8rem 2rem;

    color: var(--color-error);
    font-size: var(--form-text-font-size);

    background-color: var(--color-error-bg);
  }
}
</style>
