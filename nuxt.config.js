const pkg = require('./package')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'naakt in bad',
    bodyAttrs: {
      class: 'md:overflow-y-scroll'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '@/assets/logo.jpeg'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'naakt in bad is een zondagse muziekcolumn'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'naakt in bad is een zondagse muziekcolumn'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css'
      }
    ]
  },
  plugins: [{ src: '~/plugins/vue-plyr', mode: 'client' }],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxt/content'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    standalone: true
  },
  //  Added by PMCP
  //Nuxt Content options
  content: {
    // Define fields on which search is indexed
    fullTextSearchFields: ['song', 'artist', 'release', 'text'],
    // Nested properties to search in tags
    nestedProperties: ['tags.name']
  },
  target: 'static',
  components: true,
  buildModules: ['@nuxtjs/tailwindcss', '@vueuse/core/nuxt']
}
