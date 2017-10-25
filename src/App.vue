<template>
  <div id="app">
    <v-app dark>
      <v-container fluid="fluid" class="text-xs-center">
        <img src="./assets/logo.png">
        <router-view/>
        <router-link to="/unsubscribe">
          <p class="s">Unsubscribe</p>
        </router-link>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Roboto';
  text-align: center;
}
</style>
