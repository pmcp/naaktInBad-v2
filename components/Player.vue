<template>
  <div>
    <div v-if="songUrl != null">
      <div>
        <vue-plyr
          ref="plyr"
          :options="options">
          <audio>
            <source
              :src="songUrl"
              type="audio/mp3">
          </audio>
        </vue-plyr>
      </div>
    </div>
    <div v-else>
      No song selected
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    options() {
      return this.$store.getters.plyrDesign
    },
    songUrl() {
      return this.$store.state.songUrl
    }
  },
  watch: {
    songUrl(newUrl) {
      console.log(newUrl)
      if (newUrl == null) return
      this.$nextTick().then(() => {
        console.log(this.$refs.plyr)

        this.$refs.plyr.player.play()
      })
    }
  }
}
</script>
