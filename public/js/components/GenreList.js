import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Genre from './Genre'
import { changeSearchText } from '../actions'

const GenreList = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		filter: PropTypes.shape({
			similarTo: PropTypes.string.isRequired,
			searchText: PropTypes.string.isRequired,
		}),
		genres: PropTypes.array.isRequired,
		selectedGenre: PropTypes.string.isRequired,
		loadingGenreList: PropTypes.bool.isRequired,
	},

	handleTextInput(e) {
		e.preventDefault()
		this.props.dispatch(changeSearchText(e.target.value))
	},

	handleShowAll() {
		this.props.dispatch(changeSearchText(''))
	},

	filterGenres() {
		const { genres, filter: { searchText } } = this.props

		if (!searchText) {
			return genres
		}

		return genres.filter(genre => genre.includes(searchText))
	},

	render() {

		const { loadingGenreList, selectedGenre, filter: { searchText } } = this.props
		const searchBarClasses = classnames('station-search', {
			'active': !!searchText
		})
		const loadingIconClasses = classnames('fa', {
			'fa-forward': !loadingGenreList,
			'fa-spinner': loadingGenreList,
			'fa-pulse': loadingGenreList,
		})
		const filterButtonStyles = !searchText ? { display: 'none' } : {}

		const filteredGenres = this.filterGenres()

		return (
			<div className="station-list" id="list">

				<div className={searchBarClasses}>
					<i className="fa fa-search"></i>
					<input type="text"
						onChange={this.handleTextInput}
						placeholder={'Search genres'}
						value={searchText} />
					<div className="filter-button"
						onClick={this.handleShowAll}
						style={filterButtonStyles}>
						{'show all genres'}
					</div>
				</div>

				<i className={loadingIconClasses}></i>

				{
					filteredGenres.map(genre => {
						return (
							<Genre
								{...this.props}
								key={genre}
								genre={genre}
								isSelected={selectedGenre === genre} />
						)
					})
				}

			</div>
		)
	}
})

export default GenreList
