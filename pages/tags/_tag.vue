<template>
  <div>
    <Filtered
      v-if="tag"
      :tag="tag"
      class="hidden md:flex"
    />
    <div
      :class="[tag ? 'md:mt-10' : 'mt-5 md:mt-0']"
      class="sticky md:pt-0 top-0 bg-white z-10">
      <Filtered
        v-if="tag"
        :tag="tag"
        mobile
        class="md:hidden pt-2 mx-7 md:mx-0"
      />
      <div
        v-if="tag"
        class="md:hidden w-full border-b mb-5  "/>
    </div>

    <div
      v-if="articles.length === 0"
      class="font-body text-mobileSize1">
      Geen artikels gevonden
    </div>
    <div v-else>
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
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let tag
    // Get the tag name based on slug
    try {
      tag = await $content('tags', params.tag).fetch()
    } catch (e) {
      console.log(e)
    }
    // Get the articles based on the tag
    let articles
    try {
      articles = await $content('articles')
        .sortBy('date', 'desc')
        .where({ tags: { $contains: tag.name } })
        .limit(10)
        .fetch()
    } catch (e) {
      console.log(e)
    }
    return { tag, articles }
  },
  methods: {
    async intersected() {
      let moreArticles
      try {
        moreArticles = await this.$content('articles')
          .sortBy('date', 'desc')
          .where({ tags: { $contains: this.tag.name } })
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
