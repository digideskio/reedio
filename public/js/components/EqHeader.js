import React, { PropTypes } from 'react'
import classnames from 'classnames'

const EqHeader = React.createClass({
	propTypes: {
		selectedTab: PropTypes.string.isRequired,
		handleSelect: PropTypes.func.isRequired,
	},

	render () {
		const { selectedTab, handleSelect } = this.props
		const filterTabClasses = classnames('eq-tab', {
			'eq-tab-selected': selectedTab === 'filter'
		})
		const customizeStationTabClasses = classnames('eq-tab', {
			'eq-tab-selected': selectedTab === 'station'
		})

		return (
			<div className="eq-header">
				<div className={filterTabClasses} title="filter" onClick={handleSelect}>
					{'FILTER SONGS'}
				</div>
				<div className={customizeStationTabClasses} title="station" onClick={handleSelect}>
					{'CUSTOMIZE STATION'}
				</div>
			</div>
		)
	}
})

export default EqHeader
