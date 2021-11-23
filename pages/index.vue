<template>
  <div>
    <Filtered v-if="activeTag"/>
    <Articles/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    activeTag() {
      return this.$store.state.activeTag
    }
  },
  methods: {
    ...mapActions(['getArticles'])
  }
  // async asyncData({ $content, params, error, store }) {
  //   console.log('ASYNC')
  //   // store.dispatch('getArticles')
  // }
}
</script>
