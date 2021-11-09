<template>
  <div>
    <div class="flex flex-col md:flex-row flex-wrap container mx-auto lg:px-10">
      <!-- Navigation in desktop view -->
      <Navigation class="hidden md:flex w-full h-44  top-0 z-20"/>
      <div class="md:w-1/2 ">
        <div class="sticky top-44 sm:mr-20 lg:mr-32  ">
          <div class="text-7xl text-center border-b py-10 md:py-0 md:border-b-0 text-center md:text-left">
            naakt in bad
          </div>
          <!-- Player in desktop view -->
          <Player class="hidden md:block"/>
        </div>
      </div>
      <main class="md:w-1/2 pt-10 md:pt-0">
        <nuxt class="mx-5 sm:ml-20 lg:ml-32"/>
      </main>
    </div>
    <More class="hidden md:block fixed bottom-0 z-10 w-full"/>
    <!-- Player in mobile view -->
    <Player class="md:hidden sticky bottom-0 border-t pt-2 bg-white px-5"/>

  </div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
  components: { Navigation }
}
</script>
