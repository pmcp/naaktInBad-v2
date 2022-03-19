<template>
  <div class="mx-7 md:mx-0 mb-20">
    <!--    <h1 class="hidden md:block font-display text-xl font-bold pt-10 md:pt-0">zoeken</h1>-->
    <div class="flex flex-row mb-14 relative top-5 md:-top-1">
      <input
        v-model="search"
        placeholder="geef een zoekterm in"
        class="border-b flex-grow font-body text-mobileSize1 rounded-none "
        @input="findArticles">
      <button
        class="text-mobileSize1 font-display font-bold relative ml-2 top-2"
        value="Zoek"
      >zoek</button>
    </div>

    <div v-if="search != ''">
      <div
        v-for="(s, k) in searchResults"
        :key="`searchResult-${k}`"
        class="mb-5 cursor-pointer hover:underline"
        @click="getArticle({ id: s.slug })"
      >
        <div class="font-bold font-display text-xl">{{ s.artist }}</div>
        <div class="font-display text-xl">{{ s.song }}</div>
      </div>
    </div>
    <div
      v-if="searchResults.length == 0 && search != ''"
      class="font-body text-mobileSize1"
    >
      Geen artikels gevonden
    </div>
    <div
      v-if="search == ''"
      class="grid gap-2 grid-cols-3">
      <div
        v-for="letter in tagsOrdened"
        :key="`letter-${letter.group}`"
        class="mb-12">
        <h2 class="text-xl font-display font-bold">{{ letter.group }}</h2>
        <div
          v-for="tag in letter.children"
          :key="`tag-${tag}`"
          class="cursor-pointer font-body hover:underline text-xl md:text-body leading-5"
          style="text-indent: -0.4rem;padding-left:0.4rem;line-height: 1.4rem"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
    </div>
    <!--    <div-->
    <!--      v-if="tagsOrdened.length == 0"-->
    <!--      class="font-body text-mobileSize1"-->
    <!--    >-->
    <!--      Geen tags gevonden-->
    <!--    </div>-->
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults
    },
    tags() {
      const tags = this.$store.state.tags
      if (this.search === '') return tags
      return tags.filter(t =>
        t.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    tagsOrdened() {
      const ordenedTags = this.tags.reduce((r, e) => {
        // get first letter of name of current element
        let group = e[0]
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] }
        // if there is push current element to children array for that letter
        else r[group].children.push(e)
        // return accumulator
        return r
      }, {})

      // To get array of values we use Object.values method
      const result = Object.values(ordenedTags)
      return result
    }
  },
  methods: {
    // clickArticle(article) {
    //   this.setActiveArticle({ article, more: true })
    // },
    ...mapActions([
      // 'getTags',
      'selectTag',
      'findArticles',
      'setActiveArticle',
      'getArticle'
    ])
  }
  // async asyncData({ $content, params, error, store }) {
  //   store.dispatch('getTags')
  // }
}
</script>
