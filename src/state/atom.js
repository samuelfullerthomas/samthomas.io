import createAtom from 'tiny-atom'
import log from 'tiny-atom/log'
import actions from './actions'

const initialState = { test: ' kartoffel kartoffel ' }

module.exports = createAtom(initialState, actions, { debug: log })
