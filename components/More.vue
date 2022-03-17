<template>
  <div>
    <div class="relative mb-10 w-full">
      <button
        v-if="!open"
        value="Toon alle columns"
        class="font-display font-bold ml-32 hover:underline"
        @click="toggleMore"
      >alle columns</button>
    </div>
    <custom-transition :id="0">
      <div
        v-if="open"
        class="bg-white h-96 border-t">
        <div class="md:mx-32">
          <div class="w-full flex justify-end mt-3">
            <Icon
              close
              class="w-5 h-5"
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
