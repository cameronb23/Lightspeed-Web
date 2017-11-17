<template>
  <div>
    <h3 class="blue--text text--lighten-1">Purchase</h3>

    <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
      <v-layout row wrap>
        <v-progress-circular v-if="loading" indeterminate color="red"></v-progress-circular>
        <v-flex
          xs4
          v-if="!loading"
          v-for="item in items"
          :key="item._id"
        >
          <v-card hover tag="p" class="productcard">
            <v-card-media contain :src="item.media[0]" height="200px" />
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item.title }}</h3>
                <div v-html="item.description" />
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn :disabled="!item.active" v-on:click="openCheckout(item)" flat color="orange">
                Purchase
                <v-icon right dark>shopping_cart</v-icon>
              </v-btn>
              <v-btn flat color="orange" v-on:click="window.open(`https://twitter.com/intent/tweet?text=Purchase%20${item.title}%20by%20Cameron%20-%20${window.location.href}`, '_blank');">
                Share
                <v-icon right dark>fa-twitter</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
  asyncComputed: {
    items: {
      get() {
        const token = this.$store.state.auth.token;

        return axios({
          url: 'https://lightspeed-api.cameronb.me/products',
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        })
        .then((response) => {
          this.loading = false;
          const body = response.data;
          return body;
        })
        .catch((err) => {
          this.loading = false;
          if (err.message.includes('401')) {
            this.response = 'Error loading products (Authentication needed)';
          } else {
            this.response = 'Error loading products';
          }
          this.snackbar = true;
        });
      },

      default: [],
    },
  },
  data() {
    return {
      window,
      loading: true,
      product: null,
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  methods: {
    openCheckout(product) {
      this.$checkout.open({
        name: product.title,
        currency: 'USD',
        amount: product.price_cents,
        token: (token) => {
          // handle the token
          console.log(token);
          axios({
            url: 'https://lightspeed-api.cameronb.me/payments/create',
            method: 'POST',
            headers: {
              'x-access-token': this.$store.state.auth.token,
            },
            data: {
              stripeToken: token.id,
              productId: product._id, // eslint-disable-line no-underscore-dangle
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

.productcard {
  margin: 25px;
}
</style>
