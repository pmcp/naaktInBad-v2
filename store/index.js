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
      .limit(1)
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
    commit('setSongName', `${article.artist} - ${article.song}`)
    commit('setSongUrl', article.audio)
  }
}

export const getters = {
  articles: state => {
    return state.articles
  },
  plyrDesign: state => {
    return {
      controls: `
        <div class="plyr__controls flex">
          <button type="button" class="plyr__control mr-2" aria-label="Play, {title}" data-plyr="play">
              <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
              <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
              <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
              <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
          </button>
          <div class="flex-grow flex flex-col italic">
            <div class="text-right">${state.songName}</div>
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="flex justify-end">
              <div class="plyr__time plyr__time--current mr-2" aria-label="Current time">00:00</div>
              <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
            </div>
         </div>
      </div>`
    }
  }
}
