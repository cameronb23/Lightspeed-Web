<template>
  <div>
    <h3 class="blue--text text--lighten-1">Purchase</h3>
    <v-btn v-on:click="openCheckout" color="primary">Purchase Lightspeed</v-btn>

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
import axios from 'axios';

export default {
  name: 'Purchase',
  data() {
    return {
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  methods: {
    openCheckout() {
      this.$checkout.open({
        name: 'test purchase',
        currency: 'USD',
        amount: 1000,
        token: (token) => {
          // handle the token
          console.log(token);
          axios({
            url: 'https://shielded-journey-67207.herokuapp.com/payments/create',
            method: 'POST',
            data: {
              stripeToken: token.id,
            },
          })
          .then((response) => {
            const body = response.data;

            if (!body.success) {
              this.response = 'Error submitting payment.';
              this.snackbar = true;
              return;
            }

            this.response = 'Payment submitted.';
            this.snackbar = true;
          })
          .catch(() => {
            this.response = 'Error submitting payment.';
            this.snackbar = true;
          });
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
