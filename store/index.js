export const state = () => ({
  articles: [],
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
    { title: 'over', path: 'over' },
    { title: 'tags', path: 'tags' },
    { title: 'ontdek', path: 'ontdek' }
  ],
  moreOpen: false
})

export const mutations = {
  setMore(state, val) {
    state.moreOpen = val
  },
  setActiveArticle(state, val) {
    state.activeArticle = val
  },
  setTags(state, val) {
    state.tags = val
  },
  setActiveTag(state, val) {
    state.activeTag = val
  },
  addArticles(state, newArticles) {
    state.articles = [...state.articles, ...filteredArticles]
  },
  setArticles(state, articles) {
    state.articles = [...articles]
    console.log('set articles', state.articles)
  },
  setSearchResults(state, articles) {
    state.searchResults = [...articles]
  }
}

export const actions = {
  async getArticles({ state, commit }, id) {
    // Scenarios
    // 1. Initial:
    //    - 10 articles (or less if less)
    //    - ascending by date

    // 2. Scrolling in page:
    //    - Get 5 more articles

    // 3. Click on article in More Nav:
    //    - Scroll to article

    // 4. Click a tag
    //    - Remove all articles
    //    - Get 10 articles with tag
    //    - ascending by date

    // 5. Scrolling in page with tag active
    //    - Get 5 more articles
    const loadedArticles = state.articles.length
    let articles = []
    console.log(
      `Getting articles, skip = ${state.articles.length}, tag = ${
        state.activeTag
      }, id = ${id}`
    )
    console.log(id == undefined)
    if (id == undefined) {
      if (state.activeTag) {
        articles = await this.$content('articles')
          .sortBy('date', 'asc')
          .where({ tags: { $contains: state.activeTag } })
          .skip(loadedArticles)
          .limit(10)
          .fetch()
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('no tag', state.activeTag)
        articles = await this.$content('articles')
          .sortBy('date', 'asc')
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
      console.log('got article', article)
      const allSurround = await this.$content('articles')
        .sortBy('date', 'asc')
        .surround(id, { before: 0, after: 10 })
        .fetch()
        .catch(err => {
          console.log(err)
        })
      console.log(allSurround, state.articles)

      articles = [article, ...allSurround.filter(a => a != null)]
      console.log(articles)
    }

    const allArticles = [...state.articles, ...articles]
    console.log(allArticles)
    commit('setArticles', allArticles)
  },
  async getTags({ state, commit }) {
    const articles = await this.$content('articles')
      .only(['tags'])
      .fetch()

    const tags = articles.reduce((acc, article) => {
      article.tags.forEach(tag => {
        if (!acc.includes(tag)) {
          acc.push(tag)
        }
      })
      return acc
    }, [])

    commit('setTags', tags)
  },

  async findArticles({ state, commit }, el) {
    const searchString = el.target.value
    console.log(`Searching for ${searchString}`)
    const results = await this.$content('articles')
      .search(searchString)
      .fetch()
    console.log(`Got search results`, results)
    commit('setSearchResults', results)
  },

  toggleMore({ state, commit }) {
    commit('setMore', !state.moreOpen)
  },

  selectTag({ state, commit, dispatch }, tag) {
    commit('setActiveTag', tag)
    commit('setArticles', [])
    this.$router.push('/')
  },

  resetTag({ state, commit, dispatch }) {
    commit('setArticles', [])
    commit('setActiveTag', null)
  },

  setActiveArticle({ state, commit, dispatch }, { article, more = false }) {
    // if (state.activeArticle) {
    //   if (state.activeArticle.slug === article.slug) return
    // }
    // Scroll to article
    if (more) {
      const element = document.getElementById(article.slug)
      const offset = 180
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

  async getArticle({ state, commit, dispatch }, { id = null }) {
    // Reset active tag if it is set
    dispatch('resetTag')

    if (id == null) {
      //  No id, so get random song
      // Get length of articles
      // TODO: Get this out of here, calculate length on generate

      const articles = await this.$content('articles')
        .only(['slug'])
        .fetch()
        .catch(err => {
          console.log(err)
        })
      const random = Math.floor(Math.random() * articles.length)
      console.log('LLLL', random, articles[random].slug)
      dispatch('getArticles', articles[random].slug)
      // get song based on id
    } else {
      dispatch('getArticles', id)
      // Get song based on id
    }
    // Go to homepage
    await this.$router.push('/')
  }
}
