<template>
  <div class="flex flex-wrap">
    <Navigation class="w-full h-44 sticky top-0 z-20"/>
    <div class="w-1/2 ">
      <div class="sticky top-44 mx-32">
        <div class="text-7xl text-center">
          Naakt In Bad
        </div>
        <Player />
      </div>
    </div>
    <main class="w-1/2">

      <nuxt class="mx-32"/>
    </main>
    <More class="fixed bottom-0 z-10"/>
  </div>
</template>
<script>
import Navigation from '../components/Navigation'
export default {
  components: { Navigation }
}
</script>
