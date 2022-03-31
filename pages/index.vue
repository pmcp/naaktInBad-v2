<template>
  <div class="mt-7 md:mt-0">
    <div
      v-for="(article, i) in articles"
      :key="`articles_${i}`"
      :id="article.slug"
    >
      <Article
        :article="article"
        :last="i ===Object.keys(articles).length - 1"
      />
    </div>
    <Observer
      class="pb-2"
      @intersect="intersected()"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    // Get the article
    let articles
    // Get the articles
    try {
      articles = await $content('articles')
        .sortBy('date', 'desc')
        .limit(10)
        .fetch()
    } catch (e) {
      console.log(e)
    }
    return {
      articles
    }
  },
  methods: {
    async intersected() {
      let moreArticles
      try {
        moreArticles = await this.$content('articles')
          .sortBy('date', 'desc')
          .limit(10)
          .skip(this.articles.length)
          .fetch()
      } catch (e) {
        console.log(e)
      }
      return (this.articles = [...this.articles, ...moreArticles])
    }
  }
}
</script>
