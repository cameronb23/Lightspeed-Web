import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Unsubscribe from '@/components/Unsubscribe';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

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
    {
      path: '/signIn',
      name: 'Sign In',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
});
