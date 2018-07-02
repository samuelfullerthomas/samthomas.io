import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route } from 'react-router-dom'
import connect from './src/state/atomConnector'

import Feed from './src/views/Feed'
import Post from './src/views/Post'

const mapStateToProps = (state) => ({ browserHistory: state.browserHistory })

const AppRouter = connect(mapStateToProps)(({ browserHistory }) => (
  <Router history={browserHistory}>
    <div>
      <Route exact path='/' component={Feed} />
      <Route path='/posts/:id/' component={Post} />
    </div>
  </Router>
))

ReactDOM.render(<AppRouter />, document.getElementById('root'))
