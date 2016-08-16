import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { changeConstraintValue } from '../actions'
import ReactSlider from 'react-slider'

const EqSlider = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		param: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		minLabel: PropTypes.string.isRequired,
		maxLabel: PropTypes.string.isRequired,
		constraint: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.array,
		]),
	},

	handleChange(value) {
		this.props.dispatch(changeConstraintValue(this.props.param, value))
	},

	render() {
		const sliderClasses = classnames('eq-slider', {
			'range': !!this.props.constraint.length
		})

		return (
			<div className={sliderClasses}>
				<h4 className="slider-title">{this.props.title}</h4>
				<div className="slider-container">
					<ReactSlider
						min={0}
						max={1}
						step={0.05}
						minDistance={0.1}
						withBars={true}
						value={this.props.constraint}
						onAfterChange={this.handleChange} />
					<div className="label min-label">{this.props.minLabel}</div>
					<div className="label max-label">{this.props.maxLabel}</div>
				</div>
			</div>
		)
	}
})

export default EqSlider
