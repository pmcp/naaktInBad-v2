<template>
  <div>
    <!-- TODO: lazy load (check nuxt content) -->
    <div
      v-for="(article, i) in articles"
      :key="`articles_${i}`">
      <nuxt-content
        :document="article"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
