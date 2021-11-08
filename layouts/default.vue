<template>
  <div>
    <div class="flex flex-wrap container mx-auto">
      <Navigation class="w-full h-44 sticky top-0 z-20"/>
      <div class="w-1/2 ">
        <div class="sticky top-44 mr-32">
          <div class="text-7xl text-center">
            Naakt In Bad
          </div>
          <Player />
        </div>
      </div>
      <main class="w-1/2">
        <nuxt class="ml-32"/>
      </main>
    </div>
    <More class="fixed bottom-0 z-10 w-full"/>
  </div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
  components: { Navigation }
}
</script>
