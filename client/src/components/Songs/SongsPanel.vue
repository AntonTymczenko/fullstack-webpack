<template>
  <panel title="Songs">
    <router-link
      v-if="this.$store.state.user"
      slot="action"
      :to="{name: 'create-song'}">
      <v-btn
        fab
        medium
        absolute
        right
        bottom
        class="accent">
          <v-icon>
            add
          </v-icon>
      </v-btn>
    </router-link>
    <div v-for="song in songs"
      :key="song._id">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{ song.title}}
          </div>
          <div class="song-artist">
            {{ song.artist}}
          </div>
          <div class="song-album">
            {{ song.album}}
          </div>
          <router-link :to="{ name: 'song', params: {id: song._id} }">
          <v-btn
            dark
            class="primary"
            >View</v-btn>
          </router-link>
        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImage" alt="" class="album-image">
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: []
    }
  },
  async mounted () {
    this.songs = await SongsService.index()
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
</style>
