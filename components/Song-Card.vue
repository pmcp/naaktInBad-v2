<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex-wrap w-24  h-full' : ' gap-6 flex-auto']"
      class="flex">
      <!-- C over Image -->
      <img
        v-if="article.cover[0]"
        :src="article.cover[0]"
        :class="[centered ? 'p-5' : '']"
        class="w-24 w-24 object-contain cursor-pointer"
        @click="clickArticle(article)"
      >
      <!-- Text -->
      <div
        class="order-last h-full md:order-1 w-full relative"
        style="top:-2px">
        <div
          :class="[centered ? 'text-center' : 'leading-5']"
          class="h-full flex flex-col justify-start">
          <div
            :class="[centered ? 'text-sm' : 'leading-5']"
            class="font-display font-extrabold"
          >{{ article.artist }}</div>
          <div
            :class="[centered ? 'text-sm' : 'leading-5']"
            class="font-display"
          >{{ article.song }}</div>
          <div
            :class="[centered ? 'text-sm' : 'leading-5']"
            class="font-display italic mb-2"
          >{{ article.label }} ({{ article.release }})</div>
          <div>
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
