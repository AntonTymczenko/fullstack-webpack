<template>
<panel title="Songs">
  <div v-for="song in songs"
    :key="_id">
    {{ song.title}} -
    {{ song.artist}} -
    {{ song.album}}
  </div>
</panel>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components:  {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped lang="sass">
</style>
