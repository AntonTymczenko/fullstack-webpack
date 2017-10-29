<template>
  <panel title="Search">
    <v-text-field
      label="Search by song title, artist, album or genre"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
import _ from 'lodash'
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(function (value) {
      const route = {
        name: 'songs'
      }
      if (value !== '') {
        route.query = {
          s: value
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.s': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style scoped lang="sass">
</style>
