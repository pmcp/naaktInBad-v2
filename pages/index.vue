<template>
  <div>
    <articles :articles="articles"/>
  </div>
</template>

<script>
export default {
  // Netlify script to identify user: TODO: maybe move to an admin page?
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },

  async asyncData({ $content }) {
    const articles = await $content('articles').fetch()
    const settings = await $content('settings').fetch()
    return {
      articles,
      settings
    }
  }
}
</script>
