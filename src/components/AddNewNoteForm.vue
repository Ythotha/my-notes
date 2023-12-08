<template>
  <div class="new-note">
    <span class="title title_second new-note__title"> Добавление заметки </span>
    <form
      @submit="onSubmit"
      class="new-note__form"
    >
      <the-field
        v-model="name"
        :error-messages="nameErrors"
        @input="$v.name.$touch()"
        :max-length="nameMaxLength"
        label="Название заметки"
        placeholder="Введите название"
        class="new-note__field"
      ></the-field>
      <the-field
        v-model="text"
        :error-messages="textErrors"
        @input="$v.text.$touch()"
        :max-length="textMaxLength"
        label="Текст заметки"
        placeholder="Введите текст"
        textarea
        class="new-note__field"
      ></the-field>
      <div class="new-note__bottom">
        <the-button
          submit
          class="new-note__submit"
          :disabled="$v.$invalid"
        >
          Добавить
        </the-button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/dist/validators.min.js';

import api from '@/api/notes';

import TheField from '@/components/TheField.vue';
import TheButton from '@/components/TheButton.vue';

export default {
  components: {
    TheField,
    TheButton,
  },

  data() {
    return {
      name: '',
      nameMaxLength: 100,
      text: '',
      textMaxLength: 255,
    };
  },

  validations() {
    return {
      name: {
        required,
        maxLength: maxLength(this.nameMaxLength),
      },
      text: {
        required,
        maxLength: maxLength(this.textMaxLength),
      },
    };
  },

  computed: {
    nameErrors() {
      let errors = [];

      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Обязательное поле');
      !this.$v.name.maxLength &&
        errors.push(`Максимум ${this.nameMaxLength} символов`);

      return errors;
    },

    textErrors() {
      let errors = [];

      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.required && errors.push('Обязательное поле');
      !this.$v.text.maxLength &&
        errors.push(`Максимум ${this.textMaxLength} символов`);

      return errors;
    },
  },

  methods: {
    async onSubmit(event) {
      event.preventDefault();

      try {
        const response = await api.addNewNote({
          title: this.name,
          content: this.text,
        });

        this.$emit('success', response);
      } catch (error) {
        console.log('New note addition error');
        console.log(error);
      }
    },
  },
};
</script>

<style lang="postcss">
.new-note {
  &__form,
  &__bottom {
    margin-block-start: var(--form-indent);
  }
}
</style>
