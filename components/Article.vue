<template>
  <div class="border-b pb-20 mb-20">
    <Song-Card
      :article="article"
      actions
    />
    <nuxt-content
      :document="article"
      class="prose mt-10"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['playSong'])
  }
}
</script>
