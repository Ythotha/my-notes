import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

import { userStore } from '@/stores/user';

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/notes',
      name: 'notes',
      meta: {
        requireAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotesView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = userStore();

  if (to.matched.some((route) => route.meta?.requireAuth)) {
    if (store.authorised) {
      next();
    } else {
      next('/');
    }
  } else if (to.name === 'home' && store.authorised) {
    next('/notes');
  } else {
    next();
  }
});

export default router;
