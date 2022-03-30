<template>
  <div class="mt-7 md:mt-0">
    <Article :article="article" />
    <Article
      v-for="(article, i) in articles"
      :key="`articles_${i}`"
      :id="article.slug"
      :article="article" />
    <Observer
      class="pb-2"
      @intersect="intersected()"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    // Get the article
    let article, articles
    // TODO: Finish this: show error page
    // if (params.slug === undefined)
    try {
      article = await $content('articles', params.article).fetch()
    } catch (e) {
      console.log(e)
    }

    // Get the rest of the articles
    try {
      articles = await $content('articles')
        .sortBy('date', 'desc')
        .where({ slug: { $ne: params.article } })
        .limit(10)
        .fetch()
    } catch (e) {
      console.log(e)
    }

    return {
      article,
      articles
    }
  },
  methods: {
    async intersected() {
      let moreArticles
      try {
        moreArticles = await this.$content('articles')
          .sortBy('date', 'desc')
          .where({ slug: { $ne: this.article.slug } })
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
