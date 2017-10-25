<template>
<panel title="Songs">

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
    this.songs = await SongsService.index()
  }
}
</script>

<style scoped lang="sass">
</style>
