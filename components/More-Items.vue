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
      class="flex gap-10 overflow-x-auto overflow-y-hidden">
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
      console.log('triggered from observer')
      this.getArticles({ id: null, intersected: 'bottom' })
    },
    ...mapActions(['getArticles'])
  }
}
</script>
