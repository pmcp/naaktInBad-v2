<template>
  <div>
    <div
      v-if="fullpage"
      class="flex gap-3 flex-wrap">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        class="flex-grow"
        centered
        more
      />
      <Observer
        @intersect="intersected()"/>
    </div>

    <div
      v-else
      class="flex gap-3 overflow-x-auto">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        centered
        more
      />
      <Observer
        @intersect="intersected()"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    fullpage: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    articles() {
      return this.$store.state.articles
    }
  },
  methods: {
    async intersected() {
      this.getArticles()
    },
    ...mapActions(['getArticles'])
  }
}
</script>
