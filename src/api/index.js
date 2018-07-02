import jsonp from 'jsonp'

const apiBase = `https://api.flickr.com/`

export async function fetchJSONFlickerFeed ({ tag, tagmode = 'all', format = 'json' }) {
  const feedPath = `services/feeds/photos_public.gne?tags=${tag}&tagmode=${tagmode}&format=${format}`
  return new Promise((resolve, reject) => {
    jsonp(apiBase + feedPath, {
      name: 'jsonFlickrFeed'
    }, function jsonFlickrFeed (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
