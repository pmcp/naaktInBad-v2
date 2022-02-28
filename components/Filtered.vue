<template>
  <div class="flex justify-between pb-1 md:border-b md:mb-5">
    <div class="font-body"><span class="hidden md:inline text-mobileSize1 md:text-body">columns getagd met </span><span class="font-bold text-mobileSize1 md:text-body">#{{ activeTag.toLowerCase() }}</span></div>
    <button
      class="font-display font-extrabold items-center flex hover:underline"
      @click="removeFilter">
      wis filter
      <Icon
        close
        class="ml-1 w-4 h-4 items-center relative"
        style="top:.1rem"/>
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
    removeFilter() {
      this.resetTag()
      this.getArticles({ id: null, intersected: null })
    },
    ...mapActions(['getArticles', 'resetTag'])
  }
}
</script>
