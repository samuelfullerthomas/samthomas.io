import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route } from 'react-router-dom'
import connect from './src/state/atomConnector'

import App from './src/views/App'
import Post from './src/views/Post'

const mapStateToProps = (state) => ({ browserHistory: state.browserHistory })

const AppRouter = connect(mapStateToProps)(({ browserHistory }) => (
  <Router history={browserHistory}>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/posts' component={Post} />
    </div>
  </Router>
))

ReactDOM.render(<AppRouter />, document.getElementById('root'))
