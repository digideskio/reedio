import { combineReducers } from 'redux'
import loading from './loading'
import songs from './songs'
import genres from './genres'
import eq from './eq'

let rootReducer = combineReducers({
	loading,
	songs,
	genres,
	eq,
})

export default rootReducer
