<template>
  <article class="note">
    <header class="note__header">
      <h2 class="title title_fourth note__title">
        {{ noteInfo.title }}
      </h2>
    </header>
    <div class="note__content">
      <span class="note__text">
        {{ noteInfo.content }}
      </span>
      <div class="note__controls">
        <button
          @click="deleteNote"
          class="note__delete"
          type="button"
        >
          <icon-cross />
          Удалить
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import IconCross from '@/components/icons/IconCross.vue';

export default {
  components: {
    IconCross,
  },

  props: {
    noteInfo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deleteNote() {
      this.$emit('delete', this.noteInfo.id);
    },
  },
};
</script>

<style lang="postcss">
.note {
  border-radius: var(--note-border-radius);

  background-color: var(--color-green-light);

  box-shadow: var(--note-shadow);

  &__header,
  &__content {
    padding-block: var(--note-padding-block);
  }

  &__header {
    position: relative;
    border-bottom: var(--note-header-border);
    padding-inline: var(--note-padding-inline) var(--note-fold-size);
  }

  &__header::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;

    border-style: solid;
    border-width: 0 var(--note-fold-size) var(--note-fold-size) 0;
    border-color: var(--color-green) var(--color-dark);
    border-bottom-left-radius: var(--note-border-radius);
  }

  &__content {
    padding-inline: var(--note-padding-inline);
  }

  &__controls {
    margin-block-start: 4.8rem;
    display: flex;
  }

  &__delete {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-inline-start: auto;
    border: none;

    color: inherit;
    font-size: 2rem;

    background-color: transparent;

    cursor: pointer;
  }
}
</style>
