<template>
  <div class="flex gap-3 overflow-x-auto">
    <Song-Card
      v-for="(article, i) in articles"
      :article="article"
      :key="`navArticles_${i}`"
      centered
      more
    />
    <Observer
      @intersect="intersected()"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    articles() {
      return this.$store.state.articles
    }
  },
  methods: {
    async intersected() {
      this.getArticles()
    },
    ...mapActions(['getArticles'])
  }
}
</script>
