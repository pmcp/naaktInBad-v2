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
  async asyncData({ $content }) {
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
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://naaktinbad.com/logo.jpeg'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'naakt in bad is een zondagse muziekcolumn'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'naakt in bad is een zondagse muziekcolumn'
        }
      ]
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
