<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex flex-col h-full items-center w-44' : ' gap-6 flex-auto']"
      class="flex flex-wrap md:flex-nowrap">
      <!-- Cover Image -->
      <img
        v-if="article.cover[0]"
        :alt="`Cover art for ${article.song} by ${article.artist}`"
        :src="article.cover[0]"
        :class="[centered ? '' : '']"
        class="cursor-pointer w-40 h-40  md:w-24 md:h-24"
        @click="clickArticle(article)"
      >
      <!-- Text -->
      <div
        class=" h-full order-last md:order-1 w-full relative"
        style="top:-2px">
        <div
          :class="[centered ? 'text-center mt-6' : '']"
          class="h-full flex flex-col justify-start md:leading-5">
          <div :class="[centered ? '' : '']">
            <div
              class="font-display font-extrabold text-base md:leading-5"
            >{{ article.artist }}</div>
            <div
              class="font-display text-base md:leading-5"
            >{{ article.song }}</div>
            <div
              class="font-display italic mb-2 text-base md:leading-5"
            >{{ article.label }} ({{ article.release }})</div>
          </div>
          <div class="leading-4 pt-2 pb-4">
            <!-- TODO: Shouldn't do class cursor-pointer -->
            <span
              v-for="(t, key) in article.tags"
              :key="`tag-${key}`"
              class="cursor-pointer font-body italic hover:underline text-mobileSize2"
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
        class="order-2 w-10 flex flex-col flex-grow items-end">
        <Icon
          play
          class="w-10 h-10 md:w-7 md:h-7 mb-1 md:pb-8"
          style="width:1.96rem"
          @clicked="clickArticle(article)"
        />
        <a
          v-if="article.url"
          :href="article.url"
          target="_blank">
          <Icon
            link
            class="w-10 h-10 mt-1 md:w-7 md:h-7"
            style="width:1.96rem"
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
