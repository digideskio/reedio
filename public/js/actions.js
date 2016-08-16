import { fetch } from './utils/xhr'
import { ActionTypes as types } from './constants'

export function nextSong() {
	return (dispatch, getState) => {
		dispatch({ type: types.SONGS.NEXT_SONG })
		const { songs: { ytIds }, genres: { selectedGenre } } = getState()
		if (ytIds.length === 1) {
			dispatch(fetchSongs(selectedGenre))
		}
	}
}

export function changeSearchText(text) {
	return {
		type: types.GENRES.CHANGE_SEARCH_TEXT,
		data: { text },
	}
}

export function changeGenre(genre) {
	return dispatch => {
		dispatch(changedGenre(genre))
		dispatch(fetchSongs(genre))
	}
}

function changedGenre(genre) {
	return {
		type: types.GENRES.CHANGED_GENRE,
		data: { genre },
	}
}

export function loadGenres() {
	return dispatch => {
		dispatch({ type: types.GENRES.FETCH_GENRE_LIST })
		fetch('/genres').then(genres => {
			dispatch(receivedGenreList(genres))
		}).catch(err => console.error(err))
	}
}

function receivedGenreList(genres) {
	return {
		type: types.GENRES.RECEIVED_GENRE_LIST,
		data: { genres },
	}
}

export function fetchSongs(genre) {
	return (dispatch, getState) => {
		dispatch({ type: types.SONGS.FETCH_SONGS })
		fetch('/songs', { genre }).then(ytIds => {
			ytIds = ytIds.filter(ytId => !!ytId)
			dispatch(receivedSongs(ytIds))
			const { songs: { currentYtId } } = getState()
			if (!currentYtId) {
				dispatch({ type: types.SONGS.NEXT_SONG })
			}
		}).catch(err => console.error(err))
	}
}

function receivedSongs(ytIds) {
	return {
		type: types.SONGS.RECEIVED_SONGS,
		data: { ytIds },
	}
}

export function changeEqTab(selectedTab) {
	return {
		type: types.EQ.CHANGE_EQ_TAB,
		data: { selectedTab },
	}
}

export function changeConstraintValue(param, constraint) {
	return {
		type: types.EQ.CHANGE_CONSTRAINT,
		data: { param, constraint },
	}
}
