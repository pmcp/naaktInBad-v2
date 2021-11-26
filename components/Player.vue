<template>
  <div>
    <div
      v-if="article"
      class="w-full flex justify-end relative top-5 z-10"
    >{{ article.song }}</div>
    <vue-plyr
      v-if="article"
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
  data() {
    return {
      controls: `<div class="plyr__controls flex">
          <button type="button" class="plyr__control mr-2 mb-6 p-2 hover:p-2 rounded-none" aria-label="Play, {title}" data-plyr="play">
              <svg role="presentation" class="icon--pressed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="141.73px" height="141.73px" viewBox="0 0 141.73 141.73" xml:space="preserve"><g><rect x="22" width="32.847" height="141.152"/><rect x="87.684" width="32.839" height="141.152"/></g></svg>
              <svg role="presentation" class="icon--not-pressed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="141.73px" height="141.73px" viewBox="0 0 141.73 141.73" xml:space="preserve"><polygon points="9.637,5.656 131.556,71.589 9.637,137.535 "/></svg>
          </button>
          <div class="flex-grow flex flex-col italic">
            <div class="text-right"></div>
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                  <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="flex justify-end relative -top-2">
              <div class="plyr__time plyr__time--current mr-2" aria-label="Current time">00:00</div>
              <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
            </div>
         </div>
      </div>`
    }
  },
  computed: {
    options() {
      return {
        controls: this.controls
      }
    },
    article() {
      return this.$store.state.activeArticle
    }
  },
  watch: {
    article(newArticle) {
      this.$nextTick().then(() => {
        this.$refs.plyr.player.source = {
          type: 'audio',
          sources: [
            {
              src: newArticle.audio,
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
