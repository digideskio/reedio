import { getNextSongs, getGenreList } from '../controllers/song'

const wrapper = fn => (req, res) => fn(req, res).catch(err => console.error(err))

module.exports = function(app) {
	app.route('/songs').get(wrapper(getNextSongs))
	app.route('/genres').get(wrapper(getGenreList))
}
