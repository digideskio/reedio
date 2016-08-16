import { ActionTypes as types } from '../constants'

const initialState = {
	genres: ['blues', 'rock', 'indie rock'],
	selectedGenre: 'blues',
	filter: {
		similarTo: '',
		searchText: '',
	},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.GENRES.CHANGE_SEARCH_TEXT:
			return { ...state, filter: { ...state.filter, searchText: action.data.text } }

		case types.GENRES.CHANGED_GENRE:
			return { ...state, selectedGenre: action.data.genre }

		case types.GENRES.RECEIVED_GENRE_LIST:
			return { ...state, genres: action.data.genres }

		default:
			return state
	}
}
