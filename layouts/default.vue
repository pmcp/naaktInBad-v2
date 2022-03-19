<template>
  <div>
    <dev/>
    <div class="flex flex-col xl:flex-row flex-wrap md:items-center xl:items-start xl:mx-32">

      <!-- Navigation in desktop view -->
      <Navigation
        class="bg-white hidden md:flex sticky w-full h-32 xl:h-48 pt-16 md:pt-12 top-0 z-20 md:w-112 xl:w-full"
      />
      <div
        :class="navClasses"
        class="w-full md:w-112 xl:w-1/2 md:mb-7">
        <div class="xl:fixed w-full xl:w-112">
          <div class="w-full px-7 md:px-0  flex h-16 mb-4">
            <button
              class="relative md:pb-10 md:-mt-4 w-full"
              @click="goHome"
            >
              <Logo />
            </button>
            <div class="md:hidden mt-7">
              <Icon
                v-if="navOpen"
                close
                class=" relative"
                style="padding-top:0.4rem;left:0.42rem;width:1.4rem;height:auto;"
                @clicked="navOpen = false"/>
              <Icon
                v-if="!navOpen"
                open
                class="w-5 h-5 relative z-60"
                style="top: .2rem;"
                @clicked="navOpen = true"/>
            </div>
          </div>

          <div class=" border-b md:border-b-0"/>
          <Player
            class="fixed bottom-0 md:relative bottom-0 border-t md:border-t-0 z-40 bg-white px-7 md:px-0 md:mt-8 md:mb-5 xl:mt-5"
            style="width:inherit"
          />
          <div
            v-if="navOpen"
            class="w-full h-full md:hidden">
            <div class="bg-white w-full h-full mx-auto container">
              <!-- Mobile nav -->
              <Navigation mobile />
            </div>
          </div>
        </div>
      </div>
      <main class="md:w-112 xl:w-1/2 flex md:justify-end">
        <nuxt
          class="relative md:w-112" />
      </main>
    </div>
    <More
      v-if="$nuxt.$route.name === 'index'"
      class="hidden md:block fixed bottom-0 z-10 w-full md:bg-white"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      navOpen: false,
      scrollOffset: 0,
      lastScrollPosition: 0,
      showHeader: true
    }
  },
  computed: {
    activeArticle() {
      return this.$store.state.activeArticle
    },
    navClasses() {
      if (this.navOpen) return 'fixed w-full h-full bg-white z-40 '
      if (this.showHeader) {
        return 'sticky z-40 md:z-0 bg-white top-0 '
      } else {
        return 'sticky z-40 md:z-0 bg-white -top-24 '
      }
    }
  },
  watch: {
    // Close navigation when route changes
    $route() {
      this.navOpen = false
    }
  },
  created() {
    // This uses Nuxt event bus, triggered in Navigation component
    this.$nuxt.$on('closeNav', () => {
      this.navOpen = false
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
    this.getArticles({ id: null, intersected: null })
  },
  methods: {
    onScroll() {
      if (
        Math.abs(window.pageYOffset - this.lastScrollPosition) <
        this.scrollOffset
      ) {
        return
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    },
    ...mapActions(['getArticles', 'goHome'])
  }
}
</script>
