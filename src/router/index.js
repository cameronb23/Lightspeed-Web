import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Unsubscribe from '@/components/Unsubscribe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/unsubscribe',
      name: 'Unsubscribe',
      component: Unsubscribe,
    },
  ],
});
