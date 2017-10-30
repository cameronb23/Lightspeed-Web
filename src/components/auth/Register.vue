<template>
  <div>
    <h3 class="blue--text text--lighten-1">Registration</h3>
    <v-flex sm4 offset-sm4>
      <v-progress-circular v-if="submitting" indeterminate color="red"></v-progress-circular>
      <v-form v-if="!submitting" v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="First name"
          v-model="first_name"
          required
        ></v-text-field>
        <v-text-field
          label="Last name"
          v-model="last_name"
          required
        ></v-text-field>
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
        <v-text-field
          label="Access code"
          v-model="access_key"
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
      first_name: '',
      last_name: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      access_key: '',
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
      auth.register({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        access_key: this.access_key,
      }, '/')
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
