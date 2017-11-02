<template>
<v-layout>
  <v-flex sm4>
    <panel title="Song Metadata">
      <v-btn
        v-if="user"
        slot="action"
        :title="bookmarkTitle"
        @click="toggleBookmark"
        fab medium absolute right bottom class="accent">
          <v-icon v-if="bookmarked"> bookmark </v-icon>
          <v-icon v-else> bookmark_border </v-icon>
      </v-btn>
      <v-layout>
        <v-flex xs6>
          <div class="song-title"> {{ song.title}} </div>
          <div class="song-artist"> {{ song.artist}} </div>
          <div class="song-album"> {{ song.genre}} </div>
          <router-link
            v-if="user && user._id == song._creator"
            :to="{ name: 'edit-song'}">
            <v-btn fab small dark class="accent" title="Edit">
                <v-icon> edit </v-icon>
            </v-btn>
          </router-link>
        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImage" alt="" class="album-image">
          <div>{{ song.album}}</div>
        </v-flex>
      </v-layout>
    </panel>
    <panel title="Lyrics" class="mt-2">
      <div class="lyrics">{{song.lyrics}}</div>
    </panel>
  </v-flex>
  <v-flex sm8 class="ml-2">
    <panel title="YouTube Video">
      <youtube :video-id="song.youtubeId"></youtube>
    </panel>
    <panel title="Tabs" class="mt-2">
      <div class="tab">{{song.tab}}</div>
    </panel>
    <div v-html="error" class="danger"></div>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import UsersService from '@/services/UsersService'
import {mapState} from 'vuex'

export default {
  async mounted () {
    const id = this.$store.state.route.params.id
    try {
      this.song = await SongsService.show(id)
      if (this.user && this.user._id && this.song && this.song._id) {
        this.bookmarked = (await UsersService.isBookmarked(this.user._id, this.song._id)).isBookmarked
      }
    } catch (err) {
      console.log(err)
      this.error = err.response.data.error
    }
  },
  data () {
    return {
      song: {},
      bookmarked: false,
      error: null
    }
  },
  methods: {
    async toggleBookmark (){
      try {
        this.bookmarked = (await UsersService.toggleBookmark(this.user._id, this.song._id)).isBookmarked
      } catch (err) {
        console.log(err)
        this.error = err.response.data.error
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    bookmarkTitle () {
      return `${this.bookmarked == true ? 'Unb' : 'B'}ookmark`
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
