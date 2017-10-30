import Vue from 'vue';

import { store } from './main';


import router from './router/index';

// URL and endpoint constants
// const API_URL = 'https://cors-anywhere.herokuapp.com/https://shielded-journey-67207.herokuapp.com';
const API_URL = 'https://shielded-journey-67207.herokuapp.com';
const LOGIN_URL = `${API_URL}/authenticate`;
const SIGNUP_URL = `${API_URL}/register`;

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
  },

  // Send a request to the login URL and save the returned JWT
  login(creds, redirect) {
    return new Promise((resolve) => {
      Vue.http
        .post(LOGIN_URL, creds)
        .then((response) => {
          if (!response.body.success) {
            return resolve(response.body);
          }

          store.commit('setToken', response.body.token);

          this.user.authenticated = true;

          // Redirect to a specified route
          if (redirect) {
            router.go(redirect);
          }

          return resolve(response.body);
        }, () => resolve({
          success: false,
          message: 'Sign in failed. Check your internet connection.',
        }));
    });
  },

  register(creds, redirect) {
    return new Promise((resolve) => {
      Vue.http
        .post(SIGNUP_URL, creds)
        .then((response) => {
          if (!response.body.success) {
            return resolve(response.body);
          }

          store.commit('setToken', response.body);

          this.user.authenticated = true;

          // Redirect to a specified route
          if (redirect) {
            router.go(redirect);
          }

          return resolve(response.body);
        }, (response) => {
          if (response.body.message != null) {
            return resolve({
              success: false,
              message: `Registration failed: ${response.body.message}`,
            });
          }
          return resolve({
            success: false,
            message: 'Registration failed. Check your internet connection.',
          });
        });
    });
  },

  // To log out, we just need to remove the token
  logout() {
    return new Promise((resolve) => {
      store.commit('unsetToken');
      this.user.authenticated = false;
      return resolve();
    });
  },

  setAuth(authenticated) {
    this.user.authenticated = authenticated;
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader(token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  },
};
