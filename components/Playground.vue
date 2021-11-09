<template>
  <div>
    <div class="prose">
      <h1 class="m-5 p-4">
        PLAYGROUND
      </h1>
    </div>

    <!-- ARTICLE -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">Article</h2>
        <button
          v-if="!showArticleStyle"
          class="bg-black text-white p-2"
          @click="showArticleStyle = !showArticleStyle">Show Article Style</button>
        <button
          v-else
          class="bg-black text-white p-2"
          @click="showArticleStyle = !showArticleStyle">
          Hide Article Source
        </button>
        <button
          v-if="!showArticleSource"
          class="bg-black text-white p-2"
          @click="showArticleSource = !showArticleSource">Show Article Source</button>
        <button
          v-else
          class="bg-black text-white p-2"
          @click="showArticleSource = !showArticleSource">
          Hide Article Source
        </button>

      </div>
    </div>
    <div class="flex justify-center">
      <Article
        v-if="showArticleStyle"
        :article="article"
      />
    </div>

    <pre v-if="showArticleSource">{{ article }}</pre>

    <!-- AUDIO PLAYER -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">Audio Player</h2>
        <button
          v-if="songUrl == null"
          class="bg-black text-white p-2"
          @click="setTestMusic">Load Song</button>
        <button
          v-else
          class="bg-black text-white p-2"
          @click="removeTestMusic">
          Remove Song
        </button>
        <div>Song Url: {{ songUrl }}</div>
      </div>
    </div>
    <Player/>

    <!-- SONG CARD -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">Song Card</h2>
      </div>
    </div>
    <Song-Card
      :article="article"
      actions
    />

    <!-- SONG CARD in MORE -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">Song Card in More</h2>
      </div>
    </div>
    <div class="flex">
      <Song-Card
        v-for="index in 8"
        :key="index"
        :article="article"
        centered
      />
    </div>

    <!-- MORE Items -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">More Items</h2>
      </div>
    </div>
    <div class="flex">
      <More-Items />
    </div>


    <!-- MORE -->
    <div
      class="m-5 p-4 "
      style="background-color: antiquewhite">
      <div class="prose">
        <h2 class="">More</h2>
      </div>
    </div>
    <div class="flex">
      <More />
    </div>


  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      showArticleSource: false,
      showArticleStyle: false
    }
  },
  computed: {
    songUrl() {
      return this.$store.state.songUrl
    },
    article() {
      return this.$store.state.articles[0]
    }
  },
  mounted() {
    this.getLatestArticles()
  },
  methods: {
    ...mapMutations(['setSongUrl', 'setSongName']),
    ...mapActions(['getLatestArticles']),
    setTestMusic(url) {
      this.setSongUrl('sample.mp3')
      this.setSongName('Forest Drive West - Bleep mix #121')
    },
    removeTestMusic() {
      this.setSongUrl(null)
      this.setSongName(null)
    }
  }
}
</script>
