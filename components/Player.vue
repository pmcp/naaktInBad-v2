<template>
  <div>
    <div
      v-if="article"
      class="flex justify-end"
    ><span class="relative z-10 top-2 z-10 text-mobileSize2 font-body italic">{{ article.song }}</span></div>
    <vue-plyr
      v-if="article"
      ref="plyr"
      :options="options"
      class="mt-4">
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
      controls: `<div class="plyr__controls flex ">
          <button type="button" class="plyr__control pl-1 mr-5 mb-5 rounded-none" aria-label="Play, {title}" data-plyr="play">
              <div class="relative icon--not-pressed w-5 h-5" style="top:1px">
                <svg class="absolute hover:hidden transform" style="padding:.2rem;transform: scale(1.87);" width="122" height="132" viewBox="0 0 122 132" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L121.919 65.933L0 131.879V0Z" fill="black"/></svg>
                <svg class="absolute opacity-0 md:opacity-1 hidden hover:block" style="padding:.2rem;transform: scale(1.87);" width="136" height="146" viewBox="0 0 136 146" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7L126.919 72.933L5 138.879V7Z" stroke="black" stroke-width="8.0121" stroke-miterlimit="10"/></svg>
              </div>
              <div class="relative icon--pressed w-5 h-5 pr-1" style="left:-4px">
                <svg class="absolute hover:hidden" style="transform: scale(1.1);" width="99" height="142" viewBox="0 0 99 142" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.847 0H0V141.152H32.847V0Z" fill="black"/><path d="M98.523 0H65.684V141.152H98.523V0Z" fill="black"/></svg>
                <svg class="absolute opacity-0 md:opacity-1 hidden hover:block" style="transform: scale(1.1);" width="107" height="150" viewBox="0 0 107 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.594 5H5V145.064H37.594V5Z" stroke="black" stroke-width="8.0121" stroke-miterlimit="10"/><path d="M102.763 5H70.178V145.064H102.763V5Z" stroke="black" stroke-width="8.0121" stroke-miterlimit="10"/></svg>
              </div>


          </button>
          <div class="flex-grow flex flex-col italic">
            <div class="text-right"></div>
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                  <progress class="plyr__progress__buffer" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="flex justify-end relative -top-1">
              <div class="font-body text-mobileSize2 italic plyr__time plyr__time--current" aria-label="Current time">00:00</div>
              <div class="font-body text-mobileSize2 italic plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
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
