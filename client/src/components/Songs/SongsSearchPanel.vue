<template>
  <panel title="Search">
    <v-text-field
      label="Search by song title, artist, album or genre"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      search: ''
    }
  }}
</script>

<style scoped lang="sass">
</style>
