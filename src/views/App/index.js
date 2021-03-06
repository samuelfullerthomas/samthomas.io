import React, { Component } from 'react'
import connect from '../../state/atomConnector'

import './App.css'

const mapStateToProps = (state) => {
  return {
    greeting: state.greeting,
    email: state.email,
    github: state.github,
    otherSite: state.otherSite
  }
}

const mapActions = [
  'double'
]

class App extends Component {
  render () {
    const { greeting, email, github, otherSite, double } = this.props
    return (
      <div className='AppThing' >
        <h1 className='TitleThing' onClick={() => double('greeting')}>{greeting}</h1>
        <div className='InformationThing'>
          <div className='TextThing'>email: {email}</div>
          <a href={github} target='_blank' rel='noopener' className='LinkThing'>github: {github}</a>
          <a href={otherSite} target='_blank' rel='noopener' className='LinkThing' >personal site: {otherSite}</a>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActions)(App)
