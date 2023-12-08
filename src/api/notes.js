import axios from 'axios';

export default {
  async getNotes() {
    const response = await axios.get('notes');

    return response.data;
  },

  async addNewNote(data) {
    const response = await axios.post('notes', data);

    return response.data;
  },

  async removeNote(id) {
    const response = await axios.delete(`notes/${id}`);

    return response.data;
  },
};
