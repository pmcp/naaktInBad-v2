<template>
  <div>
    <div
      v-if="!open"
      class="relative md:my-5 xl:my-0 xl:mb-10 w-full md:text-center xl:text-left">
      <button
        value="Toon alle columns"
        class="font-display xl:ml-32 hover:underline"
        @click="toggleMore"
      >alle columns</button>
    </div>
    <custom-transition :id="0">
      <div
        v-if="open"
        class="bg-white h-96 border-t flex md:justify-center xl:justify-start">
        <div class="xl:px-32 md:px-48 w-full">
          <div class="w-full flex justify-end mt-2">
            <Icon
              close
              class="w-5 h-5 relative z-50"
              style="top:19px;left:6px"
              @clicked="toggleMore"/>
          </div>
          <nib-swiper />


        </div>
      </div>
    </custom-transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    navigation() {
      return this.$store.state.navigation
    },
    open() {
      return this.$store.state.moreOpen
    }
  },
  methods: {
    ...mapActions(['toggleMore'])
  }
}
</script>
