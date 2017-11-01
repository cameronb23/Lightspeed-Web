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
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="formData.price_cents"
              required
            ></v-text-field>
            <v-btn
              @click="submitForm"
              :disabled="!valid"
            >
              Submit
              <i class="material-icons right">check</i>
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
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
    };
  },
  methods: {
    save() {
      this.submitting = true;

      const url = 'http://shielded-journey-67207.herokuapp.com/products';

      if(this.$route.params.productId) {
        url += this.$route.params.productId;
      }

      return axios({
        url
        method: (this.$route.params.productId ? 'PUT' : 'POST'),
        headers: {
          'x-access-token': token,
        },
      })
      .then((response) => {
        this.loading = false;
        if(response.success) {

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
          this.response = 'Error loading product';
          this.$router.push('/admin/products');
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
      url: `http://shielded-journey-67207.herokuapp.com/products/${productId}`,
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      this.loading = false;
      that.formData = response.data;
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
