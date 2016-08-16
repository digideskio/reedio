import { ActionTypes as types } from '../constants'

const initialState = {
	ytIds: [],
	currentYtId: '',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SONGS.RECEIVED_SONGS:
			const [ next ] = state.ytIds
			if (state.currentYtId && next) {
				return { ...state, ytIds: [ next, ...action.data.ytIds ] }
			} else {
				const [ first, ...restYtIds ] = action.data.ytIds
				return { ...state, currentYtId: first, ytIds: [ ...restYtIds ] }
			}

		case types.SONGS.NEXT_SONG:
			const [ nextYtId, ...rest ] = state.ytIds
			return { ...state, currentYtId: nextYtId, ytIds: [ ...rest ] }

		default:
			return state
	}
}
