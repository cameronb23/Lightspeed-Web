<template>
  <v-container fluid="fluid">
    <h3>Keys</h3>
    <v-layout row>
      <v-flex sm6>
        <v-card class="form-card">
          <v-progress-circular v-if="loading" indeterminate color="red"></v-progress-circular>
          <v-form v-if="!loading" ref="form">
            <v-btn
              @click="create"
            >
              Create Key
              <i class="material-icons right">check</i>
            </v-btn>
          </v-form>
          <v-text-field
            v-model="code"
            label="Code"
            disabled
            single-line
          ></v-text-field>
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
  name: 'Keys',
  data() {
    return {
      // form props
      loading: false,
      code: '',
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
    create() {
      this.loading = true;

      const token = this.$store.state.auth.token;
      const url = 'https://lightspeed-api.cameronb.me/keys';

      return axios({
        url,
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
      })
      .then((response) => {
        this.loading = false;
        if (response.data.success) {
          this.code = response.data.code;
          console.log(this.code);
          return;
        }

        this.snackbar = true;
        this.response = response.data.message;
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
        this.response = 'Error making request';
        this.snackbar = true;
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

.form-card {
  padding: 15px;
}
</style>
