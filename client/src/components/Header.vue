<template lang="html">
<v-toolbar fixed class="primary" dark>
  <v-toolbar-title class="mr-4">
    <router-link :to="{name: 'songs'}">
      TabTracker
    </router-link>
  </v-toolbar-title>
  <v-toolbar-items>
    <v-btn flat dark
      :to="{name: 'songs'}"
      >Browse</v-btn>
  </v-toolbar-items>
  <v-spacer></v-spacer>
  <v-toolbar-items
    v-if="!$store.state.user">
    <v-btn flat dark
      :to="{name: 'register'}">
      Sign Up</v-btn>
    <v-btn flat dark
      :to="{name: 'login'}">
      Login</v-btn>
  </v-toolbar-items>
  <v-toolbar-items
    v-else>
    <v-btn flat dark
      @click="logout">
      Log out</v-btn>
  </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
