import React, { Component } from 'react'
import connect from '../../state/atomConnector'
import Loading from '../../components/Loading'
import renderIf from 'render-if'
import format from 'date-fns/format'

import './Post.css'

const mapStateToProps = (state) => {
  return {
    images: state.images,
    selectedPost: state.selectedPost
  }
}

const mapActions = [
  'fetchPost',
  'returnToFeed'
]

class Post extends Component {
  componentWillMount () {
    console.log(this.props.match)
    if (!this.props.selectedPost) {
      const postId = this.props.location.search.match(/postId=(\d*)/)[1]
      this.props.fetchPost({ tag: 'kartoffel', postId })
    }
  }

  render () {
    const { selectedPost, images } = this.props
    if (!selectedPost) {
      return (
        <Loading size='large' />
      )
    }
    const {
      author_id: authorId,
      author,
      description,
      link,
      media: {
        m: photoSource
      },
      published,
      title
    } = selectedPost
    const descriptionRegex = /<p>([^<>]*?)<\/p>/
    const authorUsername = author.match(/\("(.*)"\)/)[1]
    const extractedDescription = description.match(descriptionRegex)
      ? description.match(descriptionRegex)[1]
      : 'No description yet...'

    return (
      <div className='Post'>
        <div className='Post-topBar'>
          <div className='Post-topBar--top'>
            <div className='Post-title'><a target='_blank' href={link}>{title}</a></div>
            <div className='Post-backButton' onClick={this.props.returnToFeed}>Back</div>
          </div>
          <div className='Post-topBar--bottom'>
            <div className='Post-author'>
              <a target='_blank' href={`https://www.flickr.com/people/${authorId}/`}>
                {authorUsername}
              </a>
            </div>
            <div className='Post-date'>{format(published, 'Do MMM YYYY [at] HH:mm')}</div>
          </div>
        </div>
        <div className='Post-information'>
          <div className='Post-image'>
            {renderIf(images[photoSource] !== 'loaded')(<Loading size='small' />)}
            {renderIf(images[photoSource] === 'loaded')(<img src={photoSource} />)}
          </div>
          <div className='Post-description' >{extractedDescription}</div>
        </div>
        <div className='Post-tags'>
          Tags: {this.renderTags()}
        </div>
      </div>
    )
  }

  renderTags () {
    const { selectedPost: { tags } } = this.props
    return tags.split(' ').map((tag, index) => {
      return (
        <div className='Post-tag' key={index}>
          <a target='_blank' href={`https://www.flickr.com/photos/tags/${tag}/`}>{tag}</a>
        </div>
      )
    })
  }
}

export default connect(mapStateToProps, mapActions)(Post)
