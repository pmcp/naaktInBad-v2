const pkg = require('./package')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    bodyAttrs: {
      class: 'md:overflow-y-scroll'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  buildModules: ['@nuxtjs/tailwindcss', '@vueuse/core/nuxt'],
  // generate: {
  //   routes: function() {
  //     const { $content } = require('@nuxt/content')
  //     const contentPaths = ['articles']
  //     const files = []
  //     contentPaths.forEach(async path => {
  //       const file = await $content(path).fetch()
  //       files.push(file)
  //     })
  //     console.log({ files })
  //     const generated = files.map(file => {
  //       return {
  //         route: file.path === '/index' ? '/' : file.path,
  //         payload: fs.readFileSync(
  //           `./content/${file.path}${file.extension}`,
  //           'utf-8'
  //         )
  //       }
  //     })
  //
  //     return generated
  //   }
  // }
}
