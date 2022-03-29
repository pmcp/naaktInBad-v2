<template>
  <div class="relative">
    <div class="arrow-swiper arrow-swiper-prev"/>
    <div class="mx-8">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(article, i) in articles"
            :key="i"
            :class="`slide--${i}`"
            class="swiper-slide"
          >
            <Song-Card
              :article="article"
              :key="`navArticles_${i}`"
              class="slider-content"
              centered
              more
            />
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-swiper arrow-swiper-next transform rotate-180 right-0"/>
  </div>
</template>

<script>
// import Swiper JS
// add or remove unused modules
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      swiper: null
    }
  },
  computed: {
    articles() {
      return this.$store.state.navArticles
    }
  },
  mounted() {
    // configure Swiper to use modules. The modules were tested with SwiperJS v6.8.4 with NuxtJS v2.15.7
    // previously it was before export default. Moved here for performance issues. Move back in case of problems.
    // add or remove unused modules
    Swiper.use([Navigation, Pagination, Autoplay])

    // init Swiper:
    /* eslint-disable no-unused-vars */
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      // @see https://swiperjs.com/swiper-api#parameters
      direction: 'horizontal',
      loop: true,
      // remove unused modules if needed
      modules: [Navigation],

      breakpoints: {
        '640': {
          slidesPerView: 3,
          spaceBetween: 20
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 40
        },
        '1176': {
          slidesPerView: 5,
          spaceBetween: 50
        }
      },
      // Navigation arrows if needed
      navigation: {
        nextEl: '.arrow-swiper-next',
        prevEl: '.arrow-swiper-prev'
      }
      // Configure other options. Not tested
    })
  }
}
</script>
