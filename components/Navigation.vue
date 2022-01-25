<template>
  <div>
    <!-- Mobile Nav -->
    <nav
      v-if="mobile"
      class="w-full bg-white mx-10 pt-5">
      <div
        v-for="(navItem, i) in navigation"
        :key="`navigation_${i}`"
        class="pb-4 text-2xl">
        <button
          v-if="navItem.path == 'ontdek'"
          :class="[(navItem.path == $nuxt.$route.name) ? 'underline' : '']"
          @click="closeAndGo()">
          <span class="font-display hover:underline text-transparent bg-clip-text text-gradient bg-gradient-to-r from-pink to-orange">{{ navItem.title }}</span>
        </button>
        <nuxt-link
          v-else
          :to="navItem.path"
          class="font-display hover:underline pb-4">
          {{ navItem.title }}
        </nuxt-link>
      </div>
      <nuxt-link
        to="alles"
        class="font-display hover:underline text-2xl">
        alle Columns
      </nuxt-link>
    </nav>
    <!-- Normal Nav -->
    <nav
      v-else
      class="flex justify-between w-full bg-white ">
      <div
        v-for="(navItem, i) in navigation"
        :key="`navigation_${i}`">
        <button
          v-if="navItem.path == 'ontdek'"
          :class="[(navItem.path == $nuxt.$route.name) ? 'underline' : '']"
          @click="getArticle"
        >
          <span class="font-display font-extrabold hover:underline hover:text-transparent bg-clip-text hover:text-gradient bg-gradient-to-r from-pink to-orange">{{ navItem.title }}</span>
        </button>
        <nuxt-link
          v-else
          :to="navItem.path"
          :class="[(navItem.path == $nuxt.$route.name) ? 'underline' : '']"
          class="font-display font-extrabold hover:underline"
        >
          {{ navItem.title }}
        </nuxt-link>
      </div>
    </nav>
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
    navigation() {
      return this.$store.state.navigation
    }
  },
  methods: {
    closeAndGo() {
      this.$nuxt.$emit('closeNav')
      this.getArticle()
    },
    ...mapActions(['getArticle'])
  }
}
</script>
