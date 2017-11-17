<template>
  <div>
    <h3>Products</h3>

    <v-container fluid="fluid">
      <v-layout row>
        <v-flex sm14 order-md1>
          <v-data-table
            dark
            v-model="selected"
            v-bind:headers="headers"
            v-bind:items="items"
            select-all
            v-bind:pagination.sync="pagination"
            item-key="name"
            :loading="loading"
            class="elevation-1"
          >
            <template slot="headers" scope="props">
              <tr>
                <th>
                  <v-checkbox
                    primary
                    hide-details
                    @click.native="toggleAll"
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                  ></v-checkbox>
                </th>
                <th v-for="header in props.headers" :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" scope="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    :input-value="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.title }}</td>
                <td>{{ ((props.item.price_cents)/100).toFixed(2) }} {{ props.item.price_currency }}</td>
                <td>{{ props.item.active ? "Yes" : "No" }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex sm2 order-md2>
          <v-card raised class="padded-card">
            <router-link to="/admin/products/null" tag="div">
              <v-btn color="blue lighten-3">New Product</v-btn>
            </router-link>
            <v-btn v-on:click="deleteItems" color="red darken-4">Delete Product(s)</v-btn>
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
  name: 'Products',
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
      loading: true,
      // snackbar props
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
      // datatable props
      pagination: {
        sortBy: 'name',
      },
      selected: [],
      headers: [
        {
          text: 'Product Name',
          align: 'left',
          value: 'title',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Available',
          value: 'active',
        },
      ],
    };
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    submitForm() {
      this.submitting = true;
    },
    deleteItems() {
      const token = this.$store.state.auth.token;
      const array = [];

      this.selected.forEach((item) => {
        array.push(item._id); // eslint-disable-line no-underscore-dangle
      });

      if (array.length === 0) {
        this.response = 'No items selected!';
        this.snackbar = true;
        return;
      }

      this.loading = true;

      console.log(array);

      axios({
        url: 'https://lightspeed-api.cameronb.me/products',
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
        data: {
          ids: array,
        },
      })
      .then((response) => {
        this.loading = false;
        const body = response.data;

        if (!body.success) {
          this.response = `Error deleting products: ${body.message}`;
          this.snackbar = true;
        }

        this.$router.go(this.$router.currentRoute);
        return body;
      })
      .catch(() => {
        this.loading = false;
        this.response = 'Error deleting products';
        this.snackbar = true;
      });
    },
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


.padded-card {
  margin-left: 15px;
  padding: 15px;
}
</style>
