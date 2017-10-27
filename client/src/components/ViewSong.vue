<template>
<v-layout>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components:  {
    Panel
  },
  async mounted () {
    const id = this.$store.state.route.params.id
    const song = await SongsService.show(id)
  },
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null,
        _creator: this.$store.state.user? this.$store.state.user._id : null
      },
      error: null
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="sass">
</style>
