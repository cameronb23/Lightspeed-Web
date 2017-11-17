<template>
  <div>
    <h1 class="blue--text text--lighten-1">Lightspeed</h1>
    <h3 class="blue--text text--darken-1">Current status: {{status}}</h3>
    <v-btn v-on:click="toggleForm" color="primary">Register for updates</v-btn>
    <v-flex sm4 offset-sm4 v-if="formVisible">
      <v-progress-circular v-if="submitting" indeterminate color="red"></v-progress-circular>
      <v-form v-if="!submitting" v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Full Name"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-btn
          @click="submitForm"
          :disabled="!valid"
        >
          Submit
          <i class="material-icons right">send</i>
        </v-btn>
      </v-form>
    </v-flex>
    <router-link to="/unsubscribe">
      <p class="s">Unsubscribe</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      status: 'In development',
      formVisible: false,
      submitting: false,
    };
  },
  methods: {
    toggleForm() {
      this.formVisible = !(this.formVisible);
    },
    submitForm() {
      this.submitting = true;
      this.$http
          .post('https://lightspeed-api.cameronb.me/subscribe', {
            email: this.email,
            name: this.name,
          })
          .then((response) => {
            if (!response.ok) {
              this.response = 'Failed to submit registration';
              this.snackbar = true;
              return false;
            }
            this.submitting = false;
            this.response = 'Successfully registered';
            this.snackbar = true;
            return true;
          }, () => {
            // error callback
            this.submitting = false;
            this.response = 'Registration failed';
            this.snackbar = true;
            return false;
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
