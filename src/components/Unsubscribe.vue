<template>
  <div>
    <h3 class="blue--text text--darken-1">Unsubscribe</h3>
    <v-flex sm4 offset-sm4>
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
      submitting: false,
      response: '',
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
    };
  },
  methods: {
    submitForm() {
      this.submitting = true;
      this.$http
          .post('https://cors-anywhere.herokuapp.com/https://shielded-journey-67207.herokuapp.com/unsubscribe', {
            email: this.email,
          })
          .then((response) => {
            if (!response.ok) {
              this.response = 'Successfully registered';
              this.snackbar = true;
              return false;
            }
            this.submitting = false;
            this.response = 'Unsubscribed successfully';
            this.snackbar = true;
            return true;
          }, () => {
            // error callback
            this.submitting = false;
            this.response = 'Failed to unsubscribed';
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
