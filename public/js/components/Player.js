import React, { PropTypes } from 'react'
import * as actions from '../actions'
import PlayerButtons from './PlayerButtons'
import ReactYoutube from 'react-youtube'

const Player = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		currentYtId: PropTypes.string.isRequired,
		loadingSong: PropTypes.bool.isRequired,
	},

	handleNext() {
		if (this.props.loadingSong) {
			return
		}
		this.props.dispatch(actions.nextSong())
	},

	render() {
		const { currentYtId } = this.props
		const ytIframeOpts = {
			width: '100%',
			height: '100%',
			playerVars: { autoplay: 1 }
		}

		return (
			<div className="player-component">
				<div className="player-paper">
					<ReactYoutube
						videoId={currentYtId}
						opts={ytIframeOpts}
						onEnd={this.handleNext} />
				</div>
				<PlayerButtons {...this.props} handleNext={this.handleNext} />
			</div>
		)
	}
})

export default Player
