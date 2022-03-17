<template>
  <div>
    <Filtered
      v-if="activeTag"
      class="hidden md:flex"
    />
    <div
      :class="[activeTag ? 'md:mt-10' : 'mt-5 md:mt-0']"
      class="sticky md:pt-0 top-0 bg-white z-10">
      <Filtered
        v-if="activeTag"
        mobile
        class="md:hidden pt-2 mx-7 md:mx-0"
      />
      <div
        v-if="activeTag"
        class="md:hidden w-full border-b mb-5  "/>
    </div>
    <Articles class=" md:mx-0 "/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // async fetch({ i18n, context, params, store, store: { dispatch, getters } }) {
  //   await dispatch('getPrevNext', params)
  // },
  computed: {
    activeTag() {
      return this.$store.state.activeTag
    }
  }
}
</script>
