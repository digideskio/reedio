import { ActionTypes as types } from '../constants'

const initialState = {
	loadingSong: false,
	loadingGenreList: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SONGS.FETCH_SONGS:
			return { ...state, loadingSong: true }

		case types.SONGS.RECEIVED_SONGS:
			return { ...state, loadingSong: false }

		case types.SONGS.FETCH_GENRE_LIST:
			return { ...state, loadingGenreList: true }

		case types.SONGS.RECEIVED_GENRE_LIST:
			return { ...state, loadingGenreList: false }

		default:
			return state
	}
}
