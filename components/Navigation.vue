<template>
  <nav
    class="flex justify-between w-full bg-white ">
    <div
      v-for="(navItem, i) in navigation"
      :key="`navigation_${i}`">
      <nuxt-link :to="navItem.path">
        {{ navItem.title }}
      </nuxt-link>
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
