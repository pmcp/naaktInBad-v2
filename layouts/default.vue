<template>
  <div>
    <!--    Mobile Mav-->

    <div class="flex flex-col md:flex-row flex-wrap lg:px-10">
      <!-- Navigation in desktop view -->
      <Navigation class="bg-white hidden md:flex sticky w-full h-44 pt-10  top-0 z-20"/>
      <div
        :class="[navOpen ? 'fixed w-full h-full bg-white z-40' : '']"
        class="md:w-1/2"
      >
        <div class="md:fixed top-42 lg:mr-32 ">
          <div class="mx-5 ">
            <div class="container mx-auto flex justify-between items-center">
              <nuxt-link
                to="/"
                class="text-7xl py-10 md:py-0 md:text-left flex-grow ">
                naakt in bad
              </nuxt-link>
              <div class="md:hidden">
                <Icon
                  v-if="navOpen"
                  close
                  class="w-5 h-5 relative z-60"
                  @clicked="navOpen = false"/>
                <Icon
                  v-if="!navOpen"
                  open
                  class="w-6 h-6 relative z-60"
                  @open="navOpen = true"/>
              </div>
            </div>
          </div>
          <div class=" border-b md:border-b-0"/>
          <!-- Player in desktop view -->
          <Player class="hidden md:block "/>
          <div
            v-if="navOpen"
            class="w-full h-full md:hidden">
            <div class="bg-white w-full h-full mx-auto container">
              <Navigation mobile />
            </div>
          </div>
        </div>
      </div>
      <main class="md:w-1/2 ">
        <nuxt class="lg:ml-32 relative"/>
      </main>
    </div>
    <More
      v-if="$nuxt.$route.name == 'index'"
      class="hidden md:block fixed bottom-0 z-10 w-full"
    />

    <!-- Player in mobile view -->
    <Player
      v-if="activeArticle"
      class="md:hidden sticky bottom-0 border-t pt-2 bg-white px-5"/>
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
  }
}
</script>
