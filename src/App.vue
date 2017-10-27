<template>
  <div id="app">
    <v-app dark>
      <v-container fluid="fluid" class="text-xs-center">
        <v-layout row wrap>
          <v-flex sm1>
            <!-- Left data -->
            <p>Current version: {{version}}</p>
          </v-flex>
          <v-flex>
            <router-link to="/">
              <img src="https://s3.amazonaws.com/lightspeed-prod/static/android-chrome-512x512.png">
            </router-link>
          </v-flex>
          <v-flex sm1>
            <router-link v-if="!signedIn" to="/signIn" tag="p">
              <v-btn color="primary">Sign In</v-btn>
            </router-link>
            <router-link v-if="signedIn" to="/dashboard" tag="p">
              <v-btn color="primary">Dashboard</v-btn>
            </router-link>
          </v-flex>
        </v-layout>
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      signedIn: false,
      version: '0.0.1',
    };
  },
};
</script>

<style>
#app {
  font-family: 'Roboto';
  text-align: center;
}
</style>
