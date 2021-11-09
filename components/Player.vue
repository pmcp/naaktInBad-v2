<template>
  <vue-plyr
    ref="plyr"
    :options="options">
    <audio>
      <source
        :src="src"
        type="audio/mp3">
    </audio>
  </vue-plyr>
</template>

<script>
export default {
  data() {
    return {
      src: null,
      player: null
    }
  },
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
      if (this.player === null) {
        this.player = this.$refs.plyr.player
      }

      console.log(this.player)
      console.log('watching songUrl', newUrl)
      if (newUrl == null) return

      console.log('gonna set source', newUrl)

      // this.player.source = {
      //   type: 'audio',
      //   title: 'Example title',
      //   sources: [
      //     {
      //       src: newUrl,
      //       type: 'audio/mp3'
      //     }
      //   ]
      // }
      this.player.play()
      // this.$nextTick().then(() => {
      //   this.player.stop()
      // })
    }
  }
}
</script>
