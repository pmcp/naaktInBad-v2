<template>
  <div>
    <div class="relative mb-10 w-full">
      <button @click="toggleMore">More Columns</button>
    </div>
    <custom-transition :id="1">
      <div
        v-if="open"
        class="bg-blue-200 h-10">
        More items
      </div>
    </custom-transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    navigation() {
      return this.$store.state.navigation
    },
    open() {
      return this.$store.state.moreOpen
    }
  },
  methods: {
    ...mapActions(['toggleMore'])
  }
}
</script>
