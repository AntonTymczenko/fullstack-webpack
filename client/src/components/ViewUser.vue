<template>
<v-layout>
  <v-flex sm4>
    <panel title="User">
      {{user.email}}
      {{user._id}}
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  async mounted () {
    const id = this.$store.state.route.params.id
    try {
      this.user = await UsersService.getUser(id)
    } catch (err) {
      this.error = err.response.data.error
    }
  },
  data () {
    return {
      user: {},
      error: null
    }
  }
}
</script>

<style scoped lang="sass">
.album-image
  width: 70%
.song-title
  font-size: 1.3em
.song-artist
  font-size: 1.1em
  &::before
    content: 'by '
    font-size: 0.9em
.song-album
  font-size: .9em
.lyrics
  white-space: pre
  text-align: left
  width: 80%
.tab
  text-align: left
  white-space: pre
  font-family: monospace
  overflow: auto
  min-height: 300px
</style>
