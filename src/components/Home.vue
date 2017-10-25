<template>
  <div>
    <h1 class="blue--text text--lighten-1">Lightspeed</h1>
    <h3 class="blue--text text--darken-1">Current status: {{status}}</h3>
    <v-btn v-on:click="toggleForm" color="primary">Register for updates</v-btn>
    <v-flex sm4 offset-sm4 v-if="formVisible">
      <v-form v-model="valid" ref="form" lazy-validation>
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      status: 'In development',
      formVisible: false,
      submitting: false,
      response: '',
    };
  },
  methods: {
    toggleForm() {
      this.formVisible = !(this.formVisible);
    },
    submitForm() {
      this.submitting = true;
      this.$http
          .post('http://jsonplaceholder.typicode.com/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1,
          })
          .then(async (response) => {
            this.response = await response.json();
            this.submitting = false;
            this.$Materialize.toast('Registered', 4000);
          }, async (response) => {
            // error callback
            const res = await response.json();
            console.log(res);
            this.submitting = false;
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
