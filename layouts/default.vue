<template>
  <div>

    <div class="flex flex-col md:flex-row flex-wrap md:mx-32">
      <!-- Navigation in desktop view -->
      <Navigation
        class="bg-white hidden md:flex sticky w-full h-48 pt-16 top-0 z-20"
      />
      <div
        :class="[navOpen ? 'fixed w-full h-full bg-white z-40' : '']"
        class="md:w-1/2"
      >
        <div class="md:fixed lg:mr-32">

          <div class="w-full px-5 md:px-0  flex justify-between items-center">
            <nuxt-link
              to="/"
              class="relative  pb-4 pt-3"
            >
              <Logo />



            </nuxt-link>
            <div class="md:hidden">
              <Icon
                v-if="navOpen"
                close
                class="w-4 h-4  mb-1 mr-1 relative"
                @clicked="navOpen = false"/>
              <Icon
                v-if="!navOpen"
                open
                class="w-5 h-5 relative z-60"
                @clicked="navOpen = true"/>
            </div>
          </div>

          <div class=" border-b md:border-b-0"/>
          <!-- Player in desktop view -->
          <Player
            class="fixed md:relative bottom-0 border-t md:border-t-0 z-40 w-full bg-white pl-5 pr-5 md:pl-0 md:pr-0"
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
      <main class="md:w-1/2 flex md:justify-end">
        <nuxt
          class="relative md:w-112" />
      </main>
    </div>
    <More
      v-if="$nuxt.$route.name == 'index'"
      class="hidden md:block fixed bottom-0 z-10 w-full"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      navOpen: false
    }
  },
  computed: {
    activeArticle() {
      return this.$store.state.activeArticle
    }
  },
  watch: {
    // Close navigation when route changes
    $route(to, from) {
      this.navOpen = false
    }
  },
  created() {
    // This uses Nuxt event bus, triggered in Navigation component
    this.$nuxt.$on('closeNav', () => {
      this.navOpen = false
    })
  }
}
</script>
