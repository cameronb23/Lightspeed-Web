<template>
  <div id="app">
    <v-app dark>
      <v-container fluid="fluid" class="text-sm-center">
        <v-layout row justify-space-between>
          <v-flex class="text-sm-left">
            <!-- Left data -->
            <p>Current version: {{version}}</p>
          </v-flex>
          <v-flex sm8>
            <router-link to="/">
              <img src="https://s3.amazonaws.com/lightspeed-prod/static/android-chrome-512x512.png">
            </router-link>
          </v-flex>
          <v-flex class="text-sm-right">
            <div v-if="!loggedIn">
              <router-link to="/signIn" tag="p">
                <v-btn color="primary">Sign In</v-btn>
              </router-link>
              <router-link to="/register" tag="p">
                <v-btn color="primary">Register</v-btn>
              </router-link>
            </div>
            <div v-if="loggedIn">
              <router-link v-if="loggedIn" to="/dashboard" tag="p">
                <v-btn color="primary">Dashboard</v-btn>
              </router-link>
              <v-btn class="text-sm-right" v-if="loggedIn" v-on:click="signOut" color="primary">Sign out</v-btn>
            </div>
          </v-flex>
        </v-layout>
        <router-view/>

        <v-snackbar
          :timeout="timeout"
          :top="y === 'top'"
          :bottom="y === 'bottom'"
          :right="x === 'right'"
          :left="x === 'left'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
          {{ response }}
          <v-btn flat color="pink" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import auth from './auth';

export default {
  name: 'app',
  computed: {
    loggedIn() {
      return this.$store.state.auth.token !== null;
    },
  },
  data() {
    return {
      version: '0.0.1',
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  methods: {
    signOut() {
      auth.logout()
      .then(() => {
        this.response = 'Successfully signed out';
        this.snackbar = true;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Roboto';
  text-align: center;
}
</style>
