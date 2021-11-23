<template>
  <div>
    <div
      v-for="(article, i) in articles"
      :key="`articles_${i}`"
      :id="article.slug">
      <Article :article="article" />
    </div>
    <Observer @intersect="intersected()"/>
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
      return this.$store.state.articles
    }
  },
  watch: {
    article(newArticle) {
      console.log(this.$refs)
      // this.$refs['target-element'].scrollIntoView()
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
