<template>
  <nav
    class="flex justify-between w-full">
    <div
      v-for="(navItem, i) in navigation"
      :key="`navigation_${i}`">
      <!-- TODO: Change into nuxt links -->
      {{ navItem.title }}
    </div>


  </nav>
</template>

<script>
export default {
  computed: {
    navigation() {
      return this.$store.state.navigation
    }
  }
}
</script>
