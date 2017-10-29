// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import VueLocalStorage from 'vue-localstorage';
import VueStripeCheckout from 'vue-stripe-checkout';
import Vuex from 'vuex';
import App from './App';
import router from './router';

// Check the users auth status when the app starts
// auth.checkAuth()

// index.js or main.js
import('../node_modules/vuetify/dist/vuetify.min.css'); // Ensure you are using css-loader

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueLocalStorage);
Vue.use(Vuetify);

const stripeOptions = {
  key: 'pk_test_Hhpu1idXPhutYgZx8TAc2Hpt',
  image: 'https://s3.amazonaws.com/lightspeed-prod/static/android-chrome-512x512.png',
  locale: 'auto',
  currency: 'USD',
  billingAddress: false,
  panelLabel: 'Pay {{amount}}',
};

Vue.use(VueStripeCheckout, stripeOptions);

Vue.config.productionTip = false;

/* eslint-disable no-new, import/prefer-default-export */
export const store = new Vuex.Store({
  localStorage: {
    auth_token: {
      type: String,
      default: null,
    },
  },
  state: {
    auth: {
      token: null,
    },
  },
  mutations: {
    setToken(state, token) {
      /* eslint-disable no-param-reassign */
      Vue.localStorage.set('auth_token', token);
      state.auth.token = token;
    },
    unsetToken(state) {
      Vue.localStorage.remove('auth_token');
      state.auth.token = null;
    },
  },
});

const token = Vue.localStorage.get('auth_token');

if (token) {
  store.commit('setToken', token);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
