<template>
  <div>
    <h3>Gang</h3>
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
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  mounted() {
    const token = this.$store.state.auth.token;

    if (!token) {
      return this.$router.push('/');
    }

    return true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
