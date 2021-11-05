<template>
  <div>
    <vue-plyr
      :options="options">
      <audio>
        <source
          src="/audio/sample.mp3"
          type="audio/mp3">
      </audio>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  computed: {
    options() {
      return this.$store.getters.plyrDesign
    }
  }
}
</script>
