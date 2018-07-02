import React, { Component } from 'react'
import format from 'date-fns/format'
import renderIf from 'render-if'
import connect from '../../state/atomConnector'
import Loading from '../../components/Loading'

import './Feed.css'

const mapStateToProps = (state) => ({ feed: state.feed, images: state.images })

const mapActions = [
  'fetchFeed',
  'selectPost'
]

class Feed extends Component {
  componentWillMount () {
    this.props.fetchFeed({ tag: 'kartoffel' })
  }

  render () {
    const { feed } = this.props
    if (!feed) {
      return (
        <Loading size='large' />
      )
    }

    return (
      <div className='Feed' >
        {this.renderFeed()}
      </div>
    )
  }

  renderFeed () {
    const { feed } = this.props
    return (
      <div className='Feed'>
        {feed.items.map(this.renderFeedItem.bind(this))}
      </div>
    )
  }

  renderFeedItem (post, index) {
    const {
      author_id: authorId,
      author,
      link,
      media: {
        m: photoSource
      },
      published,
      title
    } = post
    const { images } = this.props
    const authorUsername = author.match(/\("(.*)"\)/)[1]

    return (
      <div
        className='FeedPost'
        key={index}
      >
        <div
          className='FeedPost-imageSection'
          onClick={() => this.props.selectPost({selectedPost: post})}
        >
          {renderIf(images[photoSource] !== 'loaded')(<Loading size='small' />)}
          {renderIf(images[photoSource] === 'loaded')(<img className='FeedPost-image' src={photoSource} />)}
        </div>
        <div className='FeedPost-textSection'>
          <div
            className='FeedPost-title'
            onClick={() => this.props.selectPost({selectedPost: post})}
          >
            {title}
          </div>
          <div className='FeedPost-photoInformation'>
            <div className='FeedPost-author'>
              <a target='_blank' href={`https://www.flickr.com/people/${authorId}/`}>
                {authorUsername}
              </a>
            </div>
            <div className='FeedPost-date'>Published: {format(published, 'Do MMM YYYY [at] HH:mm')}</div>
            <div className='FeedPost-flickrLink'><a target='_blank' href={link}>View on Flickr</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActions)(Feed)
