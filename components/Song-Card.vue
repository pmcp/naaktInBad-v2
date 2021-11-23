<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex-wrap w-40' : 'flex-wrap gap-5 md:flex-nowrap']"
      class="flex ">
      <!-- Cover Image -->
      <div
        :class="[centered ? 'w-full' : 'w-1/2 md:w-48']"
        class="order-0  h-auto  "
      >
        <img
          v-if="article.cover[0]"
          :src="article.cover[0]"
          :class="[centered ? 'p-5' : '']"
          class="object-contain"
          @click="clickArticle(article)"
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
          <div class="font-bold">{{ article.artist }}</div>
          <div>{{ article.song }}</div>
          <div>{{ article.label }} ( {{ article.release }} )</div>
          <div>
            <!-- TODO: Shouldn't do class cursor-pointer -->
            <span
              v-for="(t, key) in article.tags"
              :key="`tag-${key}`"
              class="cursor-pointer"
              @click="selectTag(t)"
            >
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
    },
    more: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    clickArticle(article) {
      this.setActiveArticle({ article, more: this.more })
    },
    ...mapActions(['setActiveArticle', 'selectTag'])
  }
}
</script>
