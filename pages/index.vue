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
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'
        }
      ]
    }
  }
}
</script>
