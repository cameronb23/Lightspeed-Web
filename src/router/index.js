import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Unsubscribe from '@/components/Unsubscribe';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Purchase from '@/components/Purchase';

import Admin from '@/components/dashboard/admin';
import AdminHome from '@/components/dashboard/admin/Home';
import AdminProducts from '@/components/dashboard/admin/products/Index';
import EditProduct from '@/components/dashboard/admin/products/Edit';

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
    {
      path: '/purchase',
      name: 'Purchase',
      component: Purchase,
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          component: AdminHome,
        }, {
          path: 'products',
          component: Admin,
          children: [{ path: '', component: AdminProducts }, { path: ':productId', component: EditProduct }],
        },
      ],
    },
  ],
});
