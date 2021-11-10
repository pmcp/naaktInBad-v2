<template>
  <div>

    <nuxt-link
      v-if="prev"
      :to="prev.slug">PREV</nuxt-link>
    <div v-else>No Prev</div>

    <nuxt-link
      v-if="next"
      :to="next.slug">NEXT</nuxt-link>
    <div v-else>No Next</div>

    <Article :article="article"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let article, surround
    try {
      article = await $content('articles', params.page).fetch()
    } catch (e) {
      error({ message: 'Article not found' })
    }

    try {
      surround = await $content('articles')
        .surround(params.page)
        .fetch()
    } catch (e) {
      error({ message: 'Surrounding articles not found' })
    }

    const prev = surround[0]
    const next = surround[1]

    return {
      article,
      prev,
      next
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'
        }
      ]
    }
  },
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
</script>
<style>
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
</style>
