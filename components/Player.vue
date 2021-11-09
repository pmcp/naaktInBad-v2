<template>
  <div>
    <vue-plyr
      v-if="songUrl"
      ref="plyr"
      :options="options">
      <audio>
        <source
          src=""
          type="audio/mp3">
      </audio>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  computed: {
    options() {
      return {
        controls: `<div class="plyr__controls flex">
          <button type="button" class="plyr__control mr-2" aria-label="Play, {title}" data-plyr="play">
              <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
              <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
              <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
              <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
          </button>
          <div class="flex-grow flex flex-col italic">
            <div class="text-right">${this.songName}</div>
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                  <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="flex justify-end">
              <div class="plyr__time plyr__time--current mr-2" aria-label="Current time">00:00</div>
              <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
            </div>
         </div>
      </div>`
      }
    },
    songUrl() {
      return this.$store.state.songUrl
    },
    songName() {
      return this.$store.state.songName
    }
  },
  watch: {
    songUrl(newUrl) {
      this.$nextTick().then(() => {
        this.$refs.plyr.player.source = {
          type: 'audio',
          sources: [
            {
              src: newUrl,
              type: 'audio/mp3'
            }
          ]
        }
        this.$refs.plyr.player.play()
      })
    }
  }
}
</script>
