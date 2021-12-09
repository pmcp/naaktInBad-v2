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
        <button
          v-if="navItem.path == 'ontdek'"
          :class="[(navItem.path == $nuxt.$route.name) ? 'underline' : '']"
          class="font-display font-extrabold hover:underline text-transparent bg-clip-text text-gradient bg-gradient-to-r from-pink to-orange"
          @click="closeAndGo()">
          {{ navItem.title }}
        </button>
        <nuxt-link
          v-else
          :to="navItem.path"
          :class="[(navItem.path == 'ontdek') ? 'text-transparent bg-clip-text text-gradient bg-gradient-to-r from-pink to-orange': '']"
          class="font-display font-extrabold hover:underline">
          {{ navItem.title }}
        </nuxt-link>
      </div>
      <nuxt-link
        to="alles"
        class="font-display font-extrabold hover:underline ">
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
          class="font-display font-extrabold hover:underline hover:text-transparent bg-clip-text hover:text-gradient bg-gradient-to-r from-pink to-orange"
          @click="getArticle(null)"
        >
          {{ navItem.title }}
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
      this.getArticle(null)
    },
    ...mapActions(['getArticle'])
  }
}
</script>
