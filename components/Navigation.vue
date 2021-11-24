<template>
  <div>
    <!-- Mobile Nav -->
    <nav
      v-if="mobile"
      class="w-full bg-white mx-5 pt-10">
      <div
        v-for="(navItem, i) in navigation"
        :key="`navigation_${i}`"
        class="pb-5">
        <nuxt-link
          :to="navItem.path"
          :class="[(navItem.path == 'ontdek') ? 'text-transparent bg-clip-text text-gradient bg-gradient-to-r from-pink to-orange': '']"
          class="text-2xl">
          {{ navItem.title }}
        </nuxt-link>
      </div>
      <nuxt-link
        to="alles"
        class="text-2xl">
        Alle Columns
      </nuxt-link>
    </nav>
    <!-- Normal Nav -->
    <nav
      v-else
      class="flex justify-between w-full bg-white ">
      <div
        v-for="(navItem, i) in navigation"
        :key="`navigation_${i}`">
        <nuxt-link
          :to="navItem.path"
          :class="[(navItem.path == $nuxt.$route.name) ? 'underline' : '']">
          {{ navItem.title }}
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
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
    navigation() {
      return this.$store.state.navigation
    }
  }
}
</script>
