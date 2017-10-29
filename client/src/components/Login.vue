<template>
<centered>
  <panel title="Login">
    <form name="login-form">
      <v-text-field
        type="email"
        label="Email"
        v-model="email"
      ></v-text-field>
      <v-text-field
        type="password"
        label="Password"
        v-model="password"
      ></v-text-field>
      <div v-html="error" class="danger"></div>
      <v-btn
        dark
        class="primary"
        @click="login">
        Login
      </v-btn>
    </form>
  </panel>
</centered>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.error = null
        this.$store.dispatch('setToken', response.headers["x-auth"])
        this.$store.dispatch('setUser', response.data)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped lang="sass">
.error
  color: red
</style>
