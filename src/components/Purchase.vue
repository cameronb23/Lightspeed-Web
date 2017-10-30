<template>
  <div>
    <h3 class="blue--text text--lighten-1">Purchase</h3>
    <v-btn v-on:click="openCheckout" color="primary">Purchase Lightspeed</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Purchase',
  data() {
    return {
    };
  },
  methods: {
    openCheckout() {
      this.$checkout.open({
        name: 'test purchase',
        currency: 'USD',
        amount: 5,
        token: (token) => {
          // handle the token
          console.log(token);
        },
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
