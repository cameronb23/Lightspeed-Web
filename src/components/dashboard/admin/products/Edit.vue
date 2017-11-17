<template>
  <v-container fluid="fluid">
    <h3>{{ this.$route.params.productId ? "Edit" : "New" }} Product</h3>
    <v-layout row>
      <v-flex sm6>
        <v-card class="form-card">
          <v-progress-circular v-if="loading" indeterminate color="red"></v-progress-circular>
          <v-form v-if="!loading" v-model="valid" ref="form">
            <v-text-field
              label="Product Title"
              v-model="formData.title"
              :rules="rules.titleRules"
              required
            />
            <v-text-field
              label="Price"
              v-model="formData.price_cents"
              prefix="$"
              :suffix="formData.price_currency"
              required
            />
            <v-text-field
              label="Description"
              v-model="formData.description"
              multi-line
            />
            <v-text-field
              label="Media Links (separate by newline)"
              v-model="formData.media"
              multi-line
            />
            <v-checkbox
              label="Available for Purchase"
              v-model="formData.active"
              required
            />
            <v-btn
              @click="save"
              :disabled="!valid"
            >
              Save
              <i class="material-icons right">check</i>
            </v-btn>
          </v-form>
        </v-card>
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'Edit_Product',
  data() {
    return {
      // form props
      loading: true,
      submitting: false,
      valid: false,
      formData: {
        title: '',
        description: '',
        price_cents: '',
      },
      rules: {
        titleRules: [
          v => !!v || 'Name is required',
          v => (v && v.length > 3) || 'Name must be at least 4 characters',
        ],
      },
      // snackbar props
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  methods: {
    formatPrice() { // add @keyup="formatPrice" to component
      this.formData.price_cents = parseInt(this.formData.price_cents, 10).toFixed(2);
    },
    save() {
      this.submitting = true;

      const token = this.$store.state.auth.token;
      let url = 'https://lightspeed-api.cameronb.me/products/';
      // let url = 'http://localhost:3000/products/';

      if (this.$route.params.productId) {
        url += this.$route.params.productId;
      }

      const data = Object.assign({}, this.formData);

      // TODO: currently requires trailing decimal and two zeros
      data.price_cents *= 100;

      return axios({
        url,
        method: (this.$route.params.productId ? 'PUT' : 'POST'),
        headers: {
          'x-access-token': token,
        },
        data,
      })
      .then((response) => {
        this.loading = false;
        if (response.data.success) {
          this.response = response.data.message;
          this.snackbar = true;
          this.$router.push('/admin/products');
          return;
        }

        this.snackbar = true;
        this.response = response.data.message;
      })
      .catch((err) => {
        this.loading = false;
        if (err.message.includes('401')) {
          this.response = 'Error loading product (Authentication needed)';
          this.$router.push('/');
        } else {
          this.response = 'Error saving product';
        }
        this.snackbar = true;
      });
    },
  },
  mounted() {
    const that = this;
    const token = this.$store.state.auth.token;

    if (!token || !this.$store.state.auth.admin) {
      return this.$router.push('/');
    }

    const productId = this.$route.params.productId;

    if (productId === 'null') {
      this.loading = false;
      return {};
    }

    return axios({
      // url: `https://shielded-journey-67207.herokuapp.com/products/${productId}`,
      url: `https://lightspeed-api.cameronb.me/products/${productId}`,
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      this.loading = false;
      const data = response.data;
      let price = data.price_cents; // this represents $16.29
      price /= 100; // cent to dollar
      price = price.toFixed(2);
      data.price_cents = price;
      that.formData = data;
    })
    .catch((err) => {
      this.loading = false;
      if (err.message.includes('401')) {
        this.response = 'Error loading product (Authentication needed)';
        this.$router.push('/');
      } else {
        this.response = 'Error loading product';
        this.$router.push('/admin/products');
      }
      this.snackbar = true;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.form-card {
  padding: 15px;
}
</style>
