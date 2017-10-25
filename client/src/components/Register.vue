<template>
<panel title="Register">
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
</style>
