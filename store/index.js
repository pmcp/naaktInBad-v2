export const state = () => ({
  articles: [],
  animationStyles: [
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
  navigation: [{ title: 'About' }, { title: 'Tags' }, { title: 'Discovery' }],
  moreOpen: false,
  titleAudio: 'test',
  activeArticle: 0,
  songUrl: null,
  songName: null
})

export const mutations = {
  setMore(state, val) {
    state.moreOpen = val
  },
  setActiveArticle(state, val) {
    state.activeArticle = val
  },
  addArticles(state, newArticles) {
    state.articles = [...state.articles, ...newArticles]
  },
  setSongUrl(state, songUrl) {
    console.log('setting song url', songUrl)
    state.songUrl = songUrl
  },
  setSongName(state, songName) {
    state.songName = songName
  }
}

export const actions = {
  async getLatestArticles({ state, commit }, id) {
    const article = await this.$content('articles')
      .sortBy('date', 'asc')
      // .limit(1)
      .fetch()
    commit('addArticles', article)
  },
  async getNextArticle({ state, commit }, slug) {
    const [prev, next] = await this.$content('articles')
      .sortBy('date', 'asc')
      .surround(slug)
      .fetch()
    // TODO: feedback when last article
    console.log(slug, prev, next)
    if (next === null) return
    commit('addArticles', [next])
  },
  toggleMore({ state, commit }) {
    commit('setMore', !state.moreOpen)
  },
  playSong({ state, commit }, article) {
    console.log(article)

    this.$router.push(article.slug)
    commit('setSongName', `${article.artist} - ${article.song}`)
    commit('setSongUrl', article.audio)
  }
}

export const getters = {
  articles: state => {
    return state.articles
  }
}
