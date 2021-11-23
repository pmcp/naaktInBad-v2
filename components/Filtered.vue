<template>
  <div class="w-full flex justify-between pb-3 border-b mb-5">
    <div class="text-sm">columns getagd met <span class="font-bold">#{{ activeTag.toLowerCase() }}</span></div>
    <div
      class="font-bold"
      @click="resetTag">wis filter</div>
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
    ...mapActions(['getArticles', 'resetTag'])
  }
}
</script>
