<template>
  <div>
    <form action="?" method="POST">
      <div class="g-recaptcha" data-sitekey="6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF"></div>
      <br/>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Captcha',
  created() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
