<template>
  <div>
    <div
      v-for="(article, i) in articles"
      :key="`articles_${i}`">
      <Observer @intersect="intersected(article.slug)"/>
      <Article :article="article" />
      {{ article.artist }}
      <br><br><br><br><br><br>



    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      observer: null
    }
  },
  computed: {
    articles() {
      return this.$store.getters.articles
    }
  },
  mounted() {
    this.getLatestArticles()
  },
  methods: {
    async intersected(slug) {
      this.getNextArticle(slug)
    },
    ...mapActions(['getLatestArticles', 'getNextArticle'])
  }
}
</script>
