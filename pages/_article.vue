<template>
  <div class="mt-7 md:mt-0">
    <Article :article="article" />
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
        .surround(article.slug, { before: 0, after: 10 })
        // .where({ slug: { $ne: params.article } })
        .fetch()
    } catch (e) {
      console.log(e)
    }

    // Filter out null
    articles = articles.filter(article => article !== null)
    return {
      article,
      articles
    }
  },
  head() {
    return {
      title: `● naakt in bad |  ${this.article.artist} - ${this.article.song}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `een zondagse muziekcolumn`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `● naakt in bad |  ${this.article.artist} - ${
            this.article.song
          }`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.cover
        }
        // // Twitter Card
        // {
        //   hid: 'twitter:title',
        //   name: 'twitter:title',
        //   content: this.article.title
        // },
        // {
        //   hid: 'twitter:description',
        //   name: 'twitter:description',
        //   content: this.article.description
        // }
      ]
    }
  },
  methods: {
    async intersected(article) {
      const last = this.articles[this.articles.length - 1]
      let moreArticles
      try {
        moreArticles = await this.$content('articles')
          .sortBy('date', 'desc')
          .surround(last.slug, { before: 0, after: 10 })
          .fetch()
      } catch (e) {
        console.log(e)
      }

      const allArticles = [
        ...this.articles,
        ...moreArticles.filter(article => article !== null)
      ]
      this.articles = allArticles
    }
  }
}
</script>
