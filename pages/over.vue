<template>
  <div class="mx-7 md:mx-0 pt-10 md:pt-0">
    <nuxt-content
      :document="page"
      class="prose font-body text-mobileSize1 md:text-body "
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
