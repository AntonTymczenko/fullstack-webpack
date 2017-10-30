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
          <div
            class="song-album">
            submitted by
            <router-link :to="{ name: 'user', params: {id: song._creator} }">
              <span
                v-if="song._creatorEmail">
                {{song._creatorEmail}}
              </span>
            </router-link>
          </div>
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
import UsersService from '@/services/UsersService'
export default {
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route.query.s': {
      immediate: true,
      async handler (value) {
        const fetchedSongs = await SongsService.index(value)
        await Promise.all(fetchedSongs.map(async function(song) {
          song._creatorEmail = (await UsersService.getUser(song._creator)).email
        }))
        this.songs = fetchedSongs
      }
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
</style>
