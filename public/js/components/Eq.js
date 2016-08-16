import React, { PropTypes } from 'react'
import EqHeader from './EqHeader'
import EqSlider from './EqSlider'
import { changeEqTab } from '../actions'

const Eq = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		selectedTab: PropTypes.string.isRequired,
		valence: PropTypes.array.isRequired,
		energy: PropTypes.array.isRequired,
		variety: PropTypes.number.isRequired,
		adventurousness: PropTypes.number.isRequired,
	},

	handleEqTabSelect(e) {
		this.props.dispatch(changeEqTab(e.target.title))
	},

	renderFilterSliders() {
		return (
			<div>
				<EqSlider
					{...this.props}
					constraint={this.props.energy}
					param="energy"
					title="energy"
					minLabel="calm"
					maxLabel="energetic"></EqSlider>
				<EqSlider
					{...this.props}
					constraint={this.props.valence}
					param="valence"
					title="mood"
					minLabel="sad"
					maxLabel="happy"></EqSlider>
			</div>
		)
	},

	renderStationSliders() {
		return (
			<div>
				<EqSlider
					{...this.props}
					constraint={this.props.adventurousness}
					param="adventurousness"
					title="types of songs"
					minLabel="well-known"
					maxLabel="unknown"></EqSlider>
				<EqSlider
					{...this.props}
					constraint={this.props.variety}
					param="variety"
					title="variety of artists"
					minLabel="little"
					maxLabel="lots"></EqSlider>
			</div>
		)
	},

	render() {
		const { selectedTab } = this.props
		return (
			<div className="eq-paper">
				<EqHeader selectedTab={selectedTab} handleSelect={this.handleEqTabSelect}/>
				<div className="eq-body">
					{selectedTab === 'filter' && this.renderFilterSliders()}
					{selectedTab === 'station' && this.renderStationSliders()}
				</div>
			</div>
		)
	}
})

export default Eq
