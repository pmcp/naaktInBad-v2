<template>
  <div>
    <Filtered
      v-if="activeTag"
      class="hidden md:flex"
    />
    <div class="sticky pt-10 md:pt-0 top-0 bg-white">
      <Filtered
        v-if="activeTag"
        mobile
        class="md:hidden mx-5 md:mx-0"
      />
      <div
        v-if="activeTag"
        class="md:hidden w-full border-b mb-5  "/>
    </div>
    <Articles class="mx-5 md:mx-0 "/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    activeTag() {
      return this.$store.state.activeTag
    }
  }
}
</script>
