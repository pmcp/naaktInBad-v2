<template>
  <div class="mx-5 md:mx-0">
    <h1 class="text-2xl pt-10 md:pt-0">Over</h1>
    <nuxt-content
      :document="page"
      class="prose mt-10"
    />
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    let page
    try {
      page = await $content('pages', 'over').fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Page "over" not found' })
    }

    return {
      page
    }
  }
}
</script>
