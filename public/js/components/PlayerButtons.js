import React, { PropTypes } from 'react'
import classnames from 'classnames'
// import actions from '../actions'

const PlayerButtons = React.createClass({
	propTypes: {
		loadingSong: PropTypes.bool.isRequired,
		handleNext: PropTypes.func.isRequired,
	},

	// loadSimilar() {
	// 	return actions.getSimilar()
	// },

	render() {
		const { loadingSong, handleNext } = this.props
		const nextButtonClasses = classnames('next-button', {
			'button-disabled': loadingSong
		})
		const iconClasses = classnames('fa', {
			'fa-forward': !this.props.loadingSong,
			'fa-spinner': this.props.loadingSong,
			'fa-pulse': this.props.loadingSong,
		})
		const similarButtonClasses = classnames('similar-button', {
			'button-disabled': loadingSong
		})

		return (
			<div className="player-buttons">
				<div className={nextButtonClasses} onClick={handleNext}>
					<i className={iconClasses}></i>
				</div>
				<div className={similarButtonClasses} onClick={this.loadSimilar}>
					<a href="#list">{'SIMILAR GENRES'}</a>
				</div>
			</div>
		)
	}
})

export default PlayerButtons
