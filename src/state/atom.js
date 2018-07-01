import createAtom from 'tiny-atom'
import log from 'tiny-atom/log'
import actions from './actions'
import { createBrowserHistory } from 'history'

const initialState = { test: ' kartoffel kartoffel ', browserHistory: createBrowserHistory(), images: {} }

module.exports = createAtom(initialState, actions, { debug: log })
