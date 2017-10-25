<template>
  <div id="app">
    <v-app dark>
      <v-container fluid="fluid" class="text-xs-center">
        <img src="./assets/logo.png">
        <router-view/>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
