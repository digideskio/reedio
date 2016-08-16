import keymirror from 'keymirror'

export const ActionTypes = {
	SONGS: keymirror({
		FETCH_SONGS: null,
		RECEIVED_SONGS: null,
		NEXT_SONG: null,
	}),

	GENRES: keymirror({
		CHANGE_SEARCH_TEXT: null,
		CHANGED_GENRE: null,
		FETCH_GENRE_LIST: null,
		RECEIVED_GENRE_LIST: null,
	}),

	EQ: keymirror({
		CHANGE_EQ_TAB: null,
		CHANGE_CONSTRAINT: null,
	})
}
