import { ActionTypes as types } from '../constants'

const initialState = {
	selectedTab: 'filter',
	valence: [ 0.1, 0.9 ],
	energy: [ 0.1, 0.9 ],
	adventurousness: 0.2,
	variety: 0.5,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.EQ.CHANGE_EQ_TAB:
			return { ...state, selectedTab: action.data.selectedTab }

		case types.EQ.CHANGE_CONSTRAINT:
			return { ...state, [action.data.param]: action.data.constraint }

		default:
			return state
	}
}
