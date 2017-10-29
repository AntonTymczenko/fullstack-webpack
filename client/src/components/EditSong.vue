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
    <div v-html="error" class="danger" />
    <v-btn
      dark
      class="primary"
      @click="save"
    >Save</v-btn>
  </v-flex>
</v-layout>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  async mounted () {
    const id = this.$store.state.route.params.id
    try {
      this.song = await SongsService.show(id)
    } catch (err) {
      this.error = err.response.data.error
    }
  },
  data () {
    return {
      song: {},
      required: (value) => !!value || 'Required',
      error: null
    }
  },
  methods: {
    save () {
      this.error = null

      SongsService.update(this.song._id, this.song)
        .then(() => {
          this.$router.push({
            name: 'song',
            params: this.song._id
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
