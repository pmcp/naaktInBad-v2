<template>
  <div>
    {{ article.artist }}
    <nuxt-content
      :document="article"
    />
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
