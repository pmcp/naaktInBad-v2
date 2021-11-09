<template>
  <div>
    <Song-Card
      :article="article"
      actions
    />
    <nuxt-content
      :document="article"
      class="prose"
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
