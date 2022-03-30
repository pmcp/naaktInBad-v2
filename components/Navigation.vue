<template>
  <div>
    <!--     Mobile Nav-->
    <nav
      v-if="mobile"
      class="w-full bg-white mx-7 pt-5 pb-4 text-specificFont1 flex flex-col gap-5">
      <nuxt-link
        v-if="randomArticle"
        :to="`/${randomArticle.slug}`">
        <span class="font-display font-bold hover:underline text-transparent bg-clip-text text-gradient bg-gradient-to-r from-pink to-orange">een gok</span>
      </nuxt-link>
      <nuxt-link
        :class="[('over' === $nuxt.$route.name) ? 'underline' : '']"
        to="over"
        class="font-display font-bold hover:underline"
      >
        over
      </nuxt-link>
      <nuxt-link
        :class="[('tags' === $nuxt.$route.name) ? 'underline' : '']"
        to="tags"
        class="font-display font-bold hover:underline"
      >
        tags
      </nuxt-link>
      <nuxt-link
        :class="[('alles' === $nuxt.$route.name) ? 'underline' : '']"
        to="alles"
        class="font-display font-bold hover:underline"
      >
        alle columns
      </nuxt-link>
    </nav>
    <!--     Normal Nav-->
    <nav
      v-else
      class="flex justify-between w-full bg-white hidden md:flex">
      <nuxt-link
        v-if="randomArticle"
        :to="`/${randomArticle.slug}`"
      >
        <span class="font-display hover:text-transparent bg-clip-text hover:text-gradient bg-gradient-to-r from-pink to-orange">een gok</span>
      </nuxt-link>
      <nuxt-link
        :class="[('over' === $nuxt.$route.name) ? 'underline' : '']"
        to="over"
        class="font-display hover:underline"
      >
        over
      </nuxt-link>
      <nuxt-link
        :class="[('tags' === $nuxt.$route.name) ? 'underline' : '']"
        to="tags"
        class="font-display hover:underline"
      >
        tags
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    mobile: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      articles: [],
      random: null
    }
  },
  computed: {
    navigation() {
      return this.$store.state.navigation
    },
    discovery() {
      return this.$store.state.discovery
    },
    randomArticle() {
      return this.articles[this.random]
    }
  },
  watch: {
    $route(to, from) {
      this.random = Math.floor(Math.random() * this.articles.length)
    }
  },
  async created() {
    let articles
    try {
      articles = await this.$content('articles')
        .only(['slug'])
        .fetch()
    } catch (e) {
      console.log(e)
    }
    this.random = Math.floor(Math.random() * articles.length)
    this.articles = articles
  }
}
</script>
