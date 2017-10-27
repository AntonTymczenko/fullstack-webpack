<template>
<v-layout>
  <v-flex sm4>
    <panel title="Song Metadata">
      <v-text-field
        required
        :rules="[required]"
        label="Title"
        v-model="song.title"
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="Artist"
        v-model="song.artist"
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="Genre"
        v-model="song.genre"
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="Album"
        v-model="song.album"
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="Album Image Url"
        v-model="song.albumImage"
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="YouTube ID"
        v-model="song.youtubeId"
      ></v-text-field>
    </panel>
  </v-flex>
  <v-flex sm8>
    <panel title="Song Structure" class="ml-2">
      <v-text-field
        required
        :rules="[required]"
        label="Tab"
        class="tab-textfield"
        v-model="song.tab"
        multi-line
      ></v-text-field>
      <v-text-field
        required
        :rules="[required]"
        label="Lyrics"
        v-model="song.lyrics"
        multi-line
      ></v-text-field>
    </panel>
    <div class="danger"
      v-if="error"
    >{{ error }}</div>
    <v-btn
      dark
      class="primary"
      @click="create"
    >Create Song</v-btn>
  </v-flex>
</v-layout>
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
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    create() {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        return this.error = 'Please fill in all the required fields.'
      }

      SongsService.create(this.song)
        .then(() => {
          this.$router.push({
            name: 'songs'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="sass">
</style>
