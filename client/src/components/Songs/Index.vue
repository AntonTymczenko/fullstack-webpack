<template>
<centered>
  <songs-search-panel></songs-search-panel>
  <songs-panel class="mt-2"></songs-panel>
</centered>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
export default {
  components:  {
    SongsPanel,
    SongsSearchPanel
  },
  data () {
    return {
      songs: []
    }
  }
}
</script>

<style scoped lang="sass">
</style>
