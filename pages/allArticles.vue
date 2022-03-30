<template>
  <div>
    <nuxt-link
      v-for="a in articles"
      :key="a.slug"
      :to="`${a.slug}`">
      {{ a.slug }}
    </nuxt-link>
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
        .only(['slug'])
        .fetch()
    } catch (e) {
      console.log(e)
    }
    return {
      articles
    }
  }
}
</script>
