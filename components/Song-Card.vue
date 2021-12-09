<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex flex-col h-full items-center w-44' : ' gap-6 flex-auto']"
      class="flex">
      <!-- C over Image -->
      <img
        v-if="article.cover[0]"
        :src="article.cover[0]"
        :class="[centered ? 'p-1' : '']"
        class="cursor-pointer w-24 h-24"
        @click="clickArticle(article)"
      >
      <!-- Text -->
      <div
        class=" h-full md:order-1 w-full relative"
        style="top:-2px">
        <div
          :class="[centered ? 'text-center leading-5' : 'leading-5']"
          class="h-full flex flex-col justify-start">
          <div :class="[centered ? 'h-28' : '']">
            <div
              :class="[centered ? 'leading-5' : 'leading-5']"
              class="font-display font-extrabold"
            >{{ article.artist }}</div>
            <div
              :class="[centered ? 'leading-5' : 'leading-5']"
              class="font-display"
            >{{ article.song }}</div>
            <div
              :class="[centered ? 'leading-5' : 'leading-5']"
              class="font-display italic mb-2"
            >{{ article.label }} ({{ article.release }})</div>
          </div>
          <div class="leading-4">
            <!-- TODO: Shouldn't do class cursor-pointer -->
            <span
              v-for="(t, key) in article.tags"
              :key="`tag-${key}`"
              class="cursor-pointer font-body italic hover:underline"
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
        <Icon
          play
          class="w-7 h-7 mb-1"
          @clicked="clickArticle(article)"
        />
        <a
          v-if="article.url"
          :href="article.url"
          target="_blank">
          <Icon
            link
            class="w-7 h-7"
          />
        </a>
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
