<template>
  <div class="mt-6 mx-7 md:mx-0">
    <div class="flex flex-wrap justify-between">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        class="w-1/2 md:w-1/3 mb-12"
        centered
        fullpage
      />
      <Observer
        @intersect="intersected()"/>
    </div>
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
