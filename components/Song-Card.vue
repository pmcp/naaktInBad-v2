<template>
  <div>
    <div
      v-if="article"
      :class="classes"
      class="flex">
      <!-- Cover Image -->
      <nuxt-link
        :to="article.slug"
        :class="[fullpage ? 'w-36 h-36' : 'w-40 h-40  md:w-24 md:h-24']"
        class=" flex-shrink-0">
        <img
          v-if="article.cover"
          :alt="`Cover art for ${article.song} by ${article.artist}`"
          :src="uploadCareURL"
          class="cursor-pointer "
        >
      </nuxt-link>

      <div
        class=" h-full order-last md:order-1 w-full relative"
        style="top:-2px">
        <div
          :class="[centered ? 'text-center mt-6' : '', fullpage ? '' : 'pt-2']"
          class="h-full flex flex-col justify-start md:leading-5 md:pt-0">
          <nuxt-link
            :class="classes2"
            :to="article.slug">
            <div
              :class="[fullpage ? 'text-specificFont2 leading-2' : 'text-mobileSize3 md:text-lg md:leading-5']"
              class="font-display font-extrabold truncate group-hover:underline"
            >{{ article.artist }}</div>
            <div
              :class="[fullpage ? 'text-specificFont2 leading-2' : 'text-mobileSize3 md:text-lg md:leading-5']"
              class="font-display md:text-lg group-hover:underline"
            >{{ article.song }}</div>
            <div
              :class="[fullpage ? 'text-specificFont2 leading-2' : 'text-mobileSize3 md:text-lg md:leading-5']"
              class="font-display italic mb-2"
            >{{ article.label }} ({{ article.release }})</div>
          </nuxt-link>
          <div class="pt-2 pb-4">
            <span
              v-for="(t, key) in article.tags"
              :class="[centered? 'block h-specific4 md:h-6' : '']"
              :key="`tag-${key}`">
              <span class="text-sm">#</span><tag
                :id="t"
                :centered="centered"
                :fullpage="fullpage"
                class="italic"
              />
            </span>
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div
        v-if="actions"
        class="order-1 w-10 flex flex-col flex-grow items-end ">
        <Icon
          play
          class="w-10 h-10 md:w-7 md:h-7 mb-1 md:pb-8"
          style="width:1.96rem"
          @clicked="setActiveArticle(article)"
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
    classes() {
      // [centered ? 'flex flex-col h-full items-center w-44 group' : 'gap-6 flex-auto', fullpage ? '' : 'flex-wrap']"
      if (this.centered && this.fullpage)
        return 'flex flex-col h-full items-center group flex-nowrap'
      if (this.centered && !this.fullpage)
        return 'flex flex-col h-full items-center w-44 group flex-nowrap '
      return 'gap-4 flex-auto flex-wrap md:flex-nowrap'
    },
    classes2() {
      // [centered ? 'h-28 cursor-pointer' : '', fullpage ? 'h-20' : '']
      if (this.centered && this.fullpage) return 'cursor-pointer h-28'
      if (this.centered && !this.fullpage) return 'h-28 cursor-pointer'
    },
    uploadCareURL() {
      return `${this.article.cover[0]}/-/resize/320x320/`
    }
  },
  methods: {
    ...mapActions(['setActiveArticle'])
  }
}
</script>
