import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Player from './Player'
import Eq from './Eq'
import GenreList from './GenreList'
import Footer from './Footer'
import { loadGenres, fetchSongs } from '../actions'

const App = React.createClass({
	propTypes: {
		dispatch: PropTypes.func.isRequired,
		selectedGenre: PropTypes.string.isRequired,
	},

	componentDidMount() {
		this.props.dispatch(loadGenres())
		this.props.dispatch(fetchSongs(this.props.selectedGenre))
	},

	render() {
		return (
			<div>
				<div className="wrapper">
					<Header title={`${this.props.selectedGenre}.fm`} />
					<div className="row">
						<div className="col-6">
							<Player {...this.props}/>
						</div>
						<div className="col-6">
							<Eq {...this.props} />
						</div>
					</div>
					<GenreList {...this.props} />
				</div>
				<Footer />
			</div>
		)
	}
})

export default connect(({ loading, genres, songs, eq }) => ({
	loadingSong: loading.loadingSong,
	loadingGenreList: loading.loadingGenreList,
	genres: genres.genres,
	selectedGenre: genres.selectedGenre,
	filter: genres.filter,
	ytIds: songs.ytIds,
	currentYtId: songs.currentYtId,
	selectedTab: eq.selectedTab,
	valence: eq.valence,
	energy: eq.energy,
	adventurousness: eq.adventurousness,
	variety: eq.variety,
}))(App)
