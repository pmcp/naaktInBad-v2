<template>
  <div class="flex justify-between pb-3 md:border-b md:mb-5 ">
    <div class="font-body"><span class="hidden md:inline ">columns getagd met </span><span class="font-bold">#{{ activeTag.toLowerCase() }}</span></div>
    <button
      class="font-display font-extrabold flex hover:underline"
      @click="resetTag">
      wis filter
      <Icon
        close
        class="pl-1 mt-1 w-3 h-5 items-center relative -top-1"/>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    mobile: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
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
