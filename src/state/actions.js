import { fetchJSONFlickerFeed } from '../api'

export default {
  fetchFeed: async function ({ get, set, dispatch }, options) {
    fetchJSONFlickerFeed({ tag: options.tag }).then((feed) => {
      set({ feed })
      dispatch('loadImages')
    })
  },
  loadImages: function ({ get, set }) {
    const { images, feed } = get()
    feed.items.forEach(({ media: { m: photoSource } }) => {
      if (images[photoSource] === undefined) {
        const image = new Image()
        image.onload = () => set({ images: { [photoSource]: 'loaded' } })
        image.src = photoSource
        set({ images: { [photoSource]: 'loading' } })
      }
    })
  },
  fetchPost: async function ({ get, set, dispatch }, options) {
    fetchJSONFlickerFeed({ tag: options.tag }).then((feed) => {
      try {
        const [ selectedPost ] = feed.items.filter(post => post.link.match(/\/(\d*)\/$/)[1] === options.postId)
        set({ feed, selectedPost })
        dispatch('loadImages')
      } catch (e) {
        set({ feed, selectedPost: 'None' })
      }
    })
  },
  returnToFeed: function ({ get, set }) {
    set({ selectedPost: 'None' })
    const { browserHistory } = get()
    browserHistory.push({ pathname: '/', state: { fromDashboard: true } })
  },
  selectPost: function ({ get, set }, { selectedPost }) {
    set({ selectedPost })
    const { browserHistory } = get()
    const postId = selectedPost.link.match(/\/(\d*)\/$/)[1]
    browserHistory.push({
      pathname: '/posts',
      search: `?postId=${postId}`,
      state: { fromDashboard: true }
    })
  }
}
