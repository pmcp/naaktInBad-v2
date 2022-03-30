<template>
  <div class="mx-7 md:mx-0 mb-20">
    <!--    <h1 class="hidden md:block font-display text-xl font-bold pt-10 md:pt-0">zoeken</h1>-->
    <div class="flex flex-row mb-14 relative top-5 md:-top-1">
      <input
        v-model="search"
        placeholder="geef een zoekterm in"
        class="border-b flex-grow font-body text-mobileSize1 rounded-none">
      <button
        class="text-mobileSize1 font-display font-bold relative ml-2 top-2"
        value="Zoek"
      >zoek</button>
    </div>

    <div v-if="search != ''">
      <nuxt-link
        v-for="(s, k) in articles"
        :key="`searchResult-${k}`"
        :to="s.slug"
        class="mb-5 cursor-pointer hover:underline"
      >
        <div class="font-bold font-display text-xl">{{ s.artist }}</div>
        <div class="font-display text-xl">{{ s.song }}</div>
      </nuxt-link>
    </div>
    <div
      v-if="articles.length == 0 && search != ''"
      class="font-body text-mobileSize1"
    >
      Geen artikels gevonden
    </div>
    <div
      v-if="search == ''"
      class="grid gap-2 grid-cols-3">
      <div
        v-for="letter in tags"
        :key="`letter-${letter.group}`"
        class="mb-12">
        <h2 class="text-xl font-display font-bold">{{ letter.group }}</h2>
        <nuxt-link
          v-for="tag in letter.children"
          :key="`tag-${tag.slug}`"
          :to="`tags/${tag.slug}`"
          class="cursor-pointer font-body hover:underline text-xl md:text-body leading-5"
          style="text-indent: -0.4rem;padding-left:0.4rem;line-height: 1.4rem"
        >
          {{ tag.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    // Get all tags
    let unordenedTags, ordenedTags, tags
    try {
      unordenedTags = await $content('tags').fetch()
    } catch (e) {
      console.log(e)
    }
    console.log(unordenedTags)

    // Orden tags
    ordenedTags = unordenedTags.reduce((r, e) => {
      // get first letter of name of current element
      let group = e.name.charAt(0).toUpperCase()
      // if there is no property in accumulator with this letter create it
      if (!r[group]) r[group] = { group, children: [e.name] }
      // if there is push current element to children array for that letter
      else r[group].children.push({ name: e.name, slug: e.slug })
      // return accumulator
      return r
    }, {})

    // To get array of values we use Object.values method
    tags = Object.values(ordenedTags)
    return {
      tags
    }
  },
  data() {
    return {
      search: '',
      articles: []
    }
  },
  watch: {
    async search(query) {
      if (!query) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .search(query)
        .fetch()
    }
  }
}
</script>
