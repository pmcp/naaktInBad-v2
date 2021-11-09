<template>
  <div>
    <div class="relative mb-10 w-full container mx-auto">
      <button @click="toggleMore">More Columns</button>
    </div>
    <custom-transition :id="1">
      <div
        v-if="open"
        class="bg-white h-80 border-t-2">
        <div class="container mx-auto">
          <More-Items />
        </div>
      </div>
    </custom-transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
