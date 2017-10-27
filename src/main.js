// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App';
import router from './router';

// index.js or main.js
import('../node_modules/vuetify/dist/vuetify.min.css'); // Ensure you are using css-loader

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vuex.Store({
  state: {
    auth: {
      token: null,
    },
  },
  mutations: {
    setToken(state, token) {
      /* eslint-disable no-param-reassign */
      state.auth.token = token;
    },
  },
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
