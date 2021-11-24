<template>
  <div>
    <h1 class="text-2xl">Zoeken</h1>
    <div class="flex flex-row mt-5 mb-10">
      <input
        v-model="search"
        class="border-b flex-grow"
        @input="findArticles">
      <button class="text-lg">Zoek</button>
    </div>

    <div v-if="search != ''">
      <div
        v-for="(s, k) in searchResults"
        :key="`searchResult-${k}`"
        class="mb-5"
      >
        <div class="font-bold">{{ s.artist }}</div>
        <div>{{ s.song }}</div>
      </div>
    </div>

    <div v-if="tagsOrdened.length == 0">
      Geen artikels gevonden
    </div>
    <div class="flex flex-row flex-wrap">
      <div
        v-for="letter in tagsOrdened"
        :key="`letter-${letter.group}`"
        class="w-1/3 mb-5">
        <h2 class="text-lg font-bold">{{ letter.group }}</h2>
        <div
          v-for="tag in letter.children"
          :key="`tag-${tag}`"
          class="cursor-pointer"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
    </div>
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
    ...mapActions(['getTags', 'selectTag', 'findArticles'])
  },
  async asyncData({ $content, params, error, store }) {
    store.dispatch('getTags')
  }
}
</script>
