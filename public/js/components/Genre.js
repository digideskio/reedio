import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { changeGenre } from '../actions'

const Genre = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		isSelected: PropTypes.bool.isRequired,
		genre: PropTypes.string.isRequired,
	},

	handleSelect() {
		if (!this.props.isSelected) {
			this.props.dispatch(changeGenre(this.props.genre))
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0
	},

	render() {
		const classes = classnames('station', {
			'station-selected': this.props.isSelected
		})
		return <div className={classes} onClick={this.handleSelect}>{this.props.genre}</div>
	}
})

export default Genre
