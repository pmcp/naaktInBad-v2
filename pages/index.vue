<template>
  <div>
    <articles/>
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
  }

  // TODO: Move this to store
  // async asyncData({ $content }) {
  //   const articles = await $content('articles')
  //     .limit(2)
  //     .fetch()
  //   const settings = await $content('settings').fetch()
  //   return {
  //     articles,
  //     settings
  //   }
  // }
}
</script>
