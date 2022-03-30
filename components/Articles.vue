<template>
  <div>
    <Article
      v-for="(article, i) in articles"
      :key="`articles_${i}`"
      :id="article.slug"
      :article="article" />
    <Observer @intersect="intersected()"/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      observer: null
    }
  },
  // computed: {
  //   articles() {
  //     return this.$store.state.articles
  //   }
  // },
  methods: {
    async intersected(val) {
      if (this.articles.length === 0) return
      //When intersect, pass the id (slug) of the last article
      this.getArticles({ id: null, intersected: 'bottom' })
    },
    ...mapActions(['getArticles'])
  }
}
</script>
