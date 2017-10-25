<template>
  <v-layout column>
    <v-flex sm6 offset-sm3>
      <div class="white elevation-2" id="register-form">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            autocomplete="off">
            <v-text-field
              type="email"
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
            <div v-html="error" class="error"></div>
            <v-btn
              dark
              class="cyan"
              @click="register">
              Register
            </v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
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
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.error = null
        this.$store.dispatch('setToken', response.headers["x-auth"])
        this.$store.dispatch('setUser', response.data)
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
#register-form
  max-width: 400px
  width: 100%
  margin: 0 auto
</style>
