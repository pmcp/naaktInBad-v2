<template>
  <div>
    <div
      v-if="article"
      :class="[centered ? 'flex flex-col h-full items-center w-44 group' : 'gap-6 flex-auto', fullpage ? '' : 'flex-wrap']"
      class="flex md:flex-nowrap">
      <!-- Cover Image -->
      <img
        v-if="article.cover[0]"
        :alt="`Cover art for ${article.song} by ${article.artist}`"
        :src="uploadCareURL"
        :class="[centered ? '' : '']"
        class="cursor-pointer w-40 h-40  md:w-24 md:h-24"
        @click="clickArticle(article)"
      >
      <div
        class=" h-full order-last md:order-1 w-full relative"
        style="top:-2px">
        <div
          :class="[centered ? 'text-center mt-6' : '']"
          class="h-full flex flex-col justify-start leading-5">
          <div :class="[centered ? 'h-28 cursor-pointer' : '']">
            <div
              class="font-display font-extrabold text-lg leading-5 group-hover:underline"
            >{{ article.artist }}</div>
            <div
              class="font-display text-lg leading-5 group-hover:underline"
            >{{ article.song }}</div>
            <div
              class="font-display italic mb-2 text-lg leading-5"
            >{{ article.label }} ({{ article.release }})</div>
          </div>
          <div class="pt-2 pb-4">
            <!-- TODO: Shouldn't do class cursor-pointer -->
            <span
              v-for="(t, key) in article.tags"
              :key="`tag-${key}`"
              :class="[centered ? 'leading-3' : 'leading-4']"
              class="cursor-pointer font-body italic hover:underline text-lg"
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
    },
    fullpage: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    uploadCareURL() {
      return `${this.article.cover[0]}/-/resize/320x320/`
    }
  },
  methods: {
    clickArticle(article) {
      console.log(article)
      if (this.fullpage) {
        this.getArticle(article.slug)
        return
      }
      this.setActiveArticle({ article, more: this.more })
    },
    ...mapActions(['setActiveArticle', 'selectTag', 'getArticle'])
  }
}
</script>
