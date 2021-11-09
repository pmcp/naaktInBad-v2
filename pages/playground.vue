<template>
  <div>
    <Playground/>
  </div>
</template>

<script>
export default {
  layout: 'playground',
  head() {
    return {
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
