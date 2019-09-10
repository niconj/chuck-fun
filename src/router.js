import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import JokePage from './views/JokePage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/joke/:id',
      name: 'joke',
      component: JokePage,
      beforeEnter(to, from, next) {
        const isValidId = to.params.id !== null;
        next(isValidId);
      },
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
