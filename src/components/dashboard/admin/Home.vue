<template>
  <div>
    <h3>admin</h3>
  </div>
</template>

<script>
export default {
  name: 'Admin Home',
  data() {
  },
  methods: {
  },
  mounted() {
    const token = this.$store.state.auth.token;

    if (!token || !this.$store.state.auth.admin) {
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
