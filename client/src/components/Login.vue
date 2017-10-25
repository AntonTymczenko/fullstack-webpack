<template>
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
    <div v-html="error" class="error"></div>
    <v-btn
      dark
      class="cyan"
      @click="login">
      Login
    </v-btn>
  </form>
</panel>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  components:  {
    Panel
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
