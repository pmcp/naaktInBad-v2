<template>
  <div>
    <div class="flex">
      <img
        :src="article.cover"
        class="h-24 w-auto"
        @click="playSong(article)"
      >
      <div>
        <div>{{ article.artist }}</div>
        <div>{{ article.song }}</div>
        <div>{{ article.label }} ( {{ article.release }} )</div>
        <div>
          <span
            v-for="(t, key) in article.tags"
            :key="`tag-${key}`">
            #{{ t }}
          </span>
        </div>
      </div>
    </div>

    <nuxt-content
      :document="article"
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
