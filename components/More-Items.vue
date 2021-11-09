<template>
  <div class="flex gap-3 overflow-x-auto">
    <Song-Card
      v-for="(article, i) in articles"
      :article="article"
      :key="`articles_${i}`"
      centered
    />
    <Song-Card
      v-for="(article, i) in articles"
      :article="article"
      :key="`articles_${i}`"
      centered
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    articles() {
      return this.$store.getters.articles
    }
  }
}
</script>
