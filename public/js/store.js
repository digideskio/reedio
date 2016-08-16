import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk' // needed for async actions
import reducer from './reducers'

// Redux middleware for console.logging actions, only in development env
const logger = createLogger({
	level: 'info',
	collapsed: true,
	predicate: () => process.env.NODE_ENV !== 'production'
})

// create a store, and apply middleware
const store = compose(
	applyMiddleware(thunk, logger)
)(createStore)(reducer)

export default store
