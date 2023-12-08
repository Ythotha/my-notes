<template>
  <div class="notes">
    <h1 class="v-hidden">Мои заметки</h1>
    <the-button
      @click="addNewNote"
      round
      size="var(--cross-btn-size)"
      class="notes__add"
      aria-label="Добавить новую заметку"
    >
      <icon-plus />
    </the-button>
    <main class="notes__grid">
      <note-item
        v-for="item in items"
        :key="item.id"
        :note-info="item"
        @delete="deleteNote"
        class="notes__item"
      >
      </note-item>
    </main>

    <the-modal v-model="addNewNoteModalVisible">
      <add-new-note-form @success="onNoteCreated"></add-new-note-form>
    </the-modal>
  </div>
</template>

<script>
import api from '@/api/notes';

import IconPlus from '@/components/icons/IconPlus.vue';

import TheButton from '@/components/TheButton.vue';
import TheModal from '@/components/TheModal.vue';
import AddNewNoteForm from '@/components/AddNewNoteForm.vue';
import NoteItem from '@/components/NoteItem.vue';

export default {
  components: {
    IconPlus,

    TheButton,
    TheModal,
    AddNewNoteForm,
    NoteItem,
  },

  data() {
    return {
      addNewNoteModalVisible: false,
      items: [],
    };
  },

  mounted() {
    this.getNotes();
  },

  methods: {
    addNewNote() {
      this.addNewNoteModalVisible = true;
    },

    onNoteCreated(newNote) {
      this.addNewNoteModalVisible = false;
      this.items.push(newNote);
    },

    async getNotes() {
      try {
        const response = await api.getNotes();

        this.items = response;
      } catch (error) {
        console.log('could not get notes');
        console.log(error);
      }
    },

    async deleteNote(noteId) {
      try {
        await api.removeNote(noteId);

        const response = await api.getNotes();

        this.items = response;
      } catch (error) {
        console.log('could not delete note');
        console.log(error);
      }
    },
  },
};
</script>

<style lang="postcss">
.notes {
  &__add {
    position: fixed;
    bottom: var(--add-btn-indent-bottom);
    right: var(--add-btn-indent-right);

    box-shadow: var(--shadow-1);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(38.9rem, 100%), 1fr));
    align-items: start;
    gap: 2rem;
  }
}
</style>
