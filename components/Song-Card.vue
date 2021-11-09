<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex-wrap w-40' : 'flex-wrap md:flex-nowrap']"
      class="flex ">
      <!-- Cover Image -->
      {{ center }}
      <div
        :class="[centered ? 'w-full' : 'w-1/2 max-w-xs md:h-24 md:w-24']"
        class="order-0  h-auto  "
      >
        <img
          v-if="article.cover[0]"
          :src="article.cover[0]"
          :class="[centered ? 'p-5' : '']"
          class="object-contain"
          @click="playSong(article)"
        >
        <div
          v-else
          class="bg-black object-contain"
        />
      </div>
      <!-- Text -->
      <div class="order-last md:order-1 w-full">
        <div
          :class="[centered ? 'text-center' : '']"
          class="prose">
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
      <!-- Action Buttons -->
      <div
        v-if="actions"
        class="order-2 flex flex-col flex-grow items-end">
        <div class="w-10 h-10 bg-black mb-2"/>
        <div class="w-10 h-10 bg-black"/>
      </div>
    </div>
    <div v-else>
      No Article
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      default() {
        return false
      }
    },
    centered: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['playSong'])
  }
}
</script>
