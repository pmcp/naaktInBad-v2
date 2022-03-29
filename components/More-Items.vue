<template>
  <div>
    <div
      v-if="fullpage"
      class="flex gap-3 flex-wrap justify-between gap-3">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        centered
        fullpage
      />
    </div>
    <div
      v-else
      class="flex justify-between overflow-y-hidden overflow-x-auto">
      <Song-Card
        v-for="(article, i) in articles"
        :article="article"
        :key="`navArticles_${i}`"
        class="w-1/4"
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
      console.log('triggered from observer')
      this.getArticles({ id: null, intersected: 'bottom' })
    },
    ...mapActions(['getArticles'])
  }
}
</script>
