<template>
  <div id="app">
    <v-app dark>
      <v-container fluid="fluid" class="text-sm-center">
        <v-layout row wrap>

          <v-flex order-md1 class="text-xs-left">
            <!-- Left data -->
            <v-btn flat icon v-if="loggedIn" v-on:click="drawer = !drawer">
              <v-icon>menu</v-icon>
            </v-btn>
          </v-flex>

          <!-- Dashboard drawer -->
          <v-navigation-drawer temporary dark v-if="loggedIn" v-model="drawer">
            <v-toolbar flat class="transparent">
              <v-list class="pa-0">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img src="https://s3.amazonaws.com/lightspeed-prod/static/android-chrome-512x512.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Lightspeed Dashboard</v-list-tile-title>
                    <v-list-tile-sub-title>Version {{version}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-group v-for="item in items" v-if="!item.admin || (item.admin && admin)":value="item.active" v-bind:key="item.title">
                  <v-list-tile slot="item" v-on:click="navigate(item.route)">
                    <v-list-tile-action>
                      <v-icon>{{ item.action }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="item.items">
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile v-if="item.items" v-for="subItem in item.items" v-bind:key="subItem.title" v-on:click="navigate(subItem.route)">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>{{ subItem.action }}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-toolbar>
          </v-navigation-drawer>

          <v-flex xs10 order-md2>
            <router-view/>
          </v-flex>

          <v-flex order-md3>
            <div class="text-xs-right" v-if="!loggedIn">
              <router-link to="/signIn" tag="div">
                <v-btn color="primary">Sign In</v-btn>
              </router-link>
              <router-link to="/register" tag="div">
                <v-btn color="primary">Register</v-btn>
              </router-link>
            </div>
            <div class="text-xs-right" v-if="loggedIn">
              <v-btn class="text-sm-right" v-on:click="signOut" color="primary" dark>Sign out</v-btn>
            </div>
          </v-flex>
        </v-layout>

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
    tok() {
      return this.$store.state.token;
    },
    admin() {
      return this.$store.state.auth.admin || true;
    },
    loggedIn() {
      return this.$store.state.auth !== null;
    },
  },
  data() {
    return {
      drawer: false,
      version: '0.0.1',
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
      items: [
        {
          action: 'dashboard',
          title: 'Dashboard',
          route: '/dashboard',
        },
        {
          action: 'check_circle',
          title: 'Captcha Solver',
          route: '/solver',
        },
        {
          action: 'shopping_cart',
          title: 'Products',
          route: '/purchase',
        },
        {
          action: 'account_balance',
          title: 'Admin',
          admin: true,
          items: [
            { title: 'Products', action: 'book', route: '/admin/products' },
            { title: 'Keys', action: 'vpn_key', route: '/admin/keys' },
            { title: 'Users', action: 'person' },
            { title: 'Payments', action: 'payment' },
          ],
        },
      ],
    };
  },
  methods: {
    navigate(route) {
      if (!route) {
        return;
      }

      this.$router.push(route);
    },
    signOut() {
      auth.logout()
      .then(() => {
        this.response = 'Successfully signed out';
        this.snackbar = true;
        this.$router.push('/');
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

.center-image {
  width: 100%;
  max-width: 512px;
}
</style>
