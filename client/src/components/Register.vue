<template>
<centered>
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
      <div v-html="error" class="danger"></div>
      <v-btn
        dark
        class="primary"
        @click="register">
        Register
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
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.error = null
        this.$store.dispatch('setToken', response.headers["x-auth"])
        this.$store.dispatch('setUser', response.data)
        this.$router.push({name: 'songs'})
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
