<template>
<v-app id="app">
  <page-header/>
  <main>
    <v-container fluid>
      <router-view/>
    </v-container>
  </main>
</v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style lang="stylus">
@require './main'
</style>
<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
.application--light a
  text-decoration: none
  color: inherit
.tab-textfield textarea
  font-family: monospace
.danger
  color: red
</style>
