import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import { createPinia, PiniaVuePlugin } from 'pinia';

import '@/plugins/axios';

import App from './App.vue';
import router from './router';

import './assets/main.css';

Vue.use(Vuelidate);
Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
