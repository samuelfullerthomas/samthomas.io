import createAtom from 'tiny-atom'
import log from 'tiny-atom/log'
import actions from './actions'
import { createBrowserHistory } from 'history'
const environment = process.env.NODE_ENV

const initialState = {
  browserHistory: createBrowserHistory(),
  greeting: ' hello welcome to my professional website hello ',
  email: 'hi at samthomas dot io',
  github: 'https://github.com/samuelfullerthomas',
  otherSite: 'https://samuelfullerthomas.com/'
}

module.exports = createAtom(initialState, actions, {
  debug: environment === 'development' ? log : false
})
