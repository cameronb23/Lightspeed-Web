<template>
  <div>
    <h3 class="blue--text text--lighten-1">Sign in</h3>
    <v-flex sm4 offset-sm4>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :append-icon="passwordShown ? 'visibility_off' : 'visibility'"
          :append-icon-cb="() => (passwordShown = !passwordShown)"
          :type="passwordShown ? 'text' : 'password'"
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
import auth from '../../auth';

export default {
  name: 'Sign-In',
  data() {
    return {
      valid: false,
      passwordShown: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      password: '',
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
      auth.login({ email: this.email, password: this.password }, '/')
      .then((response) => {
        this.submitting = false;
        this.response = response.message;
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
</style>
