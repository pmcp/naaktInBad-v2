<template>
  <div>
    <div
      v-if="fullpage"
      class="flex flex-wrap justify-between">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        class="w-1/2 md:w-1/3"
        centered
        fullpage
      />
      <Observer
        @intersect="intersected()"/>
    </div>
    <div
      v-else
      class="flex justify-between overflow-y-hidden overflow-x-auto">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        class="w-full"
        centered
        more
      />
      <Observer
        @intersect="intersected()"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    fullpage: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      articles: []
    }
  },
  async fetch({ $content }) {
    this.content = await $content('articles').fetch()
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
