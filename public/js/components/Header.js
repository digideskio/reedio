import React from 'react'

const Header = (props) => {
	return (
		<div className="header">
			<span className="title">
				<span className="title-text">{props.title}</span>
			</span>
		</div>
	)
}

export default Header
