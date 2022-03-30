export const state = () => ({
  articles: [],
  navArticles: [],
  tags: [],
  activeTag: null,
  activeArticle: null,
  searchResults: [],
  animationStyles: [
    {
      description: 'no animation',
      enterActiveClass: '',
      enterClass: '',
      enterToClass: '',
      leaveActiveClass: '',
      leaveClass: '',
      leaveToClass: ''
    },
    {
      description: 'simple fade',
      enterActiveClass: 'duration-200 ease-out',
      enterClass: '-translate-x-full opacity-0',
      enterToClass: 'translate-x-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: 'translate-x-0 opacity-100',
      leaveToClass: '-translate-x-full opacity-0'
    },
    {
      description: 'slide up',
      enterClass: 'transform translate-y-full opacity-0',
      enterActiveClass: 'duration-200 ease-out',
      enterToClass: 'translate-y-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: ' translate-y-0 opacity-100',
      leaveToClass: 'transform translate-y-full opacity-0'
    },
    {
      description: 'slide down',
      enterClass: 'transform -translate-y-full opacity-0',
      enterActiveClass: 'duration-200 ease-out',
      enterToClass: 'translate-y-0 opacity-100',
      leaveActiveClass: 'duration-200 ease-in',
      leaveClass: ' translate-y-0 opacity-100',
      leaveToClass: 'transform -translate-y-full opacity-0'
    }
  ],
  navigation: [
    { title: 'een gok', path: 'ontdek' },
    { title: 'over', path: 'over' },
    { title: 'index.vue', path: 'index.vue' }
  ],
  moreOpen: false,
  discovery: false
})

export const mutations = {
  setMore(state, val) {
    state.moreOpen = val
  },
  setActiveArticle(state, val) {
    state.activeArticle = val
  },
  setTags(state, val) {
    state.tags = val.sort()
  },
  setActiveTag(state, val) {
    state.activeTag = val
  },
  // addArticles(state, newArticles) {
  //   state.articles = [...state.articles, ...newArticles]
  // },
  setArticles(state, articles) {
    state.articles = [...articles]
  },
  setSearchResults(state, articles) {
    state.searchResults = [...articles]
  },
  setNavArticles(state, val) {
    state.navArticles = val
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const navArticles = await this.$content('articles')
      .sortBy('date', 'desc')
      .only([
        'cover',
        'index.vue',
        'label',
        'song',
        'release',
        'slug',
        'label',
        'artist'
      ])
      .fetch()
      .catch(err => {
        console.log(err)
      })
    commit('setNavArticles', navArticles)

    // Getting 10 first articles for content
    const allArticles = await this.$content('articles')
      .sortBy('date', 'desc')
      .limit(10)
      .fetch()
      .catch(err => {
        console.log(err)
      })
    commit('setArticles', allArticles)

    // Get all tags
    const articles = await this.$content('articles')
      .only(['index.vue'])
      .fetch()

    const tags = articles.reduce((acc, article) => {
      if (article.index) {
        article.index.forEach(tag => {
          if (!acc.includes(tag)) {
            acc.push(tag)
          }
        })
      }
      return acc
    }, [])
    commit('setTags', tags)
  },
  async getArticles({ state, commit }, { id, intersected }) {
    const loadedArticles = state.articles.length
    let articles = []

    if (intersected === 'bottom') {
      let allSurround = []
      const lastArticle = state.articles.at(-1)
      const lastArticleId = lastArticle.slug

      // If there is a tag selected, only get articles with this tag
      if (state.activeTag) {
        allSurround = await this.$content('articles')
          .sortBy('date', 'desc')
          .where({ tags: { $contains: state.activeTag } })
          .surround(lastArticleId, { before: 0, after: 10 })
          .fetch()
          .catch(err => {
            console.log(err)
          })
      } else {
        //If id is set, this means we loaded a specific article. In that case, we want to add the first ten articles, without the one that is already loaded
        if (id) {
          const allSurroundUnfiltered = await this.$content('articles')
            .sortBy('date', 'desc')
            .limit(10)
            .fetch()
            .catch(err => {
              console.log(err)
            })
          allSurround = allSurroundUnfiltered.filter(
            article => article.slug !== id
          )
        } else {
          allSurround = await this.$content('articles')
            .sortBy('date', 'desc')
            .surround(lastArticleId, { before: 0, after: 10 })
            .fetch()
            .catch(err => {
              console.log(err)
            })
        }
      }
      articles = [...allSurround.filter(a => a != null)]
    } else {
      if (id == null) {
        if (state.activeTag) {
          articles = await this.$content('articles')
            .sortBy('date', 'desc')
            .where({ tags: { $contains: state.activeTag } })
            .skip(loadedArticles)
            .limit(10)
            .fetch()
            .catch(err => {
              console.log(err)
            })
        } else {
          articles = await this.$content('articles')
            .sortBy('date', 'desc')
            .skip(loadedArticles)
            .limit(10)
            .fetch()
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        // There is an Id, so we need to get the article based on id, and the next ten articles
        // Article based on id:
        const article = await this.$content('articles', id).fetch()
        const allSurround = await this.$content('articles')
          .sortBy('date', 'asc')
          .surround(id, { before: 0, after: 10 })
          .fetch()
          .catch(err => {
            console.log(err)
          })
        articles = [article, ...allSurround.filter(a => a != null)]
      }
    }

    const allArticles = [...state.articles, ...articles]
    commit('setArticles', allArticles)
  },

  async findArticles({ state, commit }, el) {
    const searchString = el.target.value
    const results = await this.$content('articles')
      .search(searchString)
      .fetch()
    // Going to get all instances where this shows up)
    commit('setSearchResults', results)
  },

  toggleMore({ state, commit }) {
    commit('setMore', !state.moreOpen)
  },

  selectTag({ state, commit, dispatch }, tag) {
    commit('setActiveTag', tag)
    commit('setArticles', [])
    dispatch('getArticles', { id: null, intersected: null })
    this.$router.push('/')
  },

  resetTag({ commit }) {
    commit('setArticles', [])
    commit('setActiveTag', null)
  },

  goHome({ commit, dispatch }) {
    commit('setArticles', [])
    commit('setActiveTag', null)
    dispatch('getArticles', { id: null, intersected: null })
    this.$router.push('/')
    // Moved the scroll to top to nuxt router settings (app/router.scrollBehavior.js)
    // document.scrollingElement.scrollTop
    // window.scrollTo({
    //   top: 0
    // })
  },

  setActiveArticle({ state, commit, dispatch }, { article, more = false }) {
    // Scroll to article
    if (more) {
      const element = document.getElementById(article.slug)
      const offset = 220
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition
      })
    } else {
      commit('setActiveArticle', article)
    }
  },

  async getArticle({ state, commit, dispatch }, id) {
    // Reset active tag if it is set
    dispatch('resetTag')
    if (id == null) {
      // User is in discovery mode, so set discovery to true
      // commit('setDiscovery', true)

      //  No id, so get random song
      // Get length of articles
      // TODO: Get this out of here, calculate length on generate
      const articles = state.navArticles
      const random = Math.floor(Math.random() * articles.length)
      dispatch('getArticles', { id: articles[random].slug, intersected: null })
    } else {
      dispatch('getArticles', { id: id, intersected: null })
    }
    // Go to homepage
    await this.$router.push('/')
  }
}
