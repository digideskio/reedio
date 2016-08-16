import SpotifyWebApi from 'spotify-web-api-node'
import ytnode from 'youtube-node'
import promisify from 'es6-promisify'

let youtube = new ytnode()
const key = process.env.REEDIO_YOUTUBE_KEY
youtube.setKey(key)

const search = promisify(youtube.search)
const getById = promisify(youtube.getById)

let spotifyApi = new SpotifyWebApi({
	clientId: process.env.REEDIO_SPOTIFY_CLIENT_ID,
	clientSecret: process.env.REEDIO_SPOTIFY_CLIENT_SECRET,
})

async function getNewAccessToken() {
	const { body: { access_token } } = await spotifyApi.clientCredentialsGrant()
	spotifyApi.setAccessToken(access_token)
}

export async function getNextSongs(req, res) {
	await getNewAccessToken()
	const { genre } = req.query
	const opts = {
		seed_genres: genre,
		limit: 8,
	}
	const { body: { tracks = [] } } = await spotifyApi.getRecommendations(opts)
	const ytIds = await Promise.all(tracks.map(track => getYoutubeMatch(track)))
	res.json(ytIds)
}

async function getYoutubeMatch(track) {
	const { id, name, artists } = track
	const [ artist ] = artists
	const { name: artistName } = artist
	const query = `${name} ${artistName}`

	const { body: { duration_ms: spotifyDuration } } = await spotifyApi.getTrack(id)

	const ytIds = await searchYoutube(query)

	let matches = await Promise.all(ytIds.map(ytId => getYoutubeDurationAndCompare(ytId, spotifyDuration)))
	matches = matches.filter(match => match)
	return matches[0]
}

async function getYoutubeDurationAndCompare(ytId, spotifyDuration) {
	let ytDuration = await getDuration(ytId)
	ytDuration = convertYoutubeDurationToMs(ytDuration)
	return isDurationMatch(ytDuration, spotifyDuration) && ytId
}

async function searchYoutube(query) {
	const { items = [] } = await search(query, 3)
	return items.map(item => {
		const { id: { kind, videoId } } = item
		return kind === 'youtube#video' && videoId
	}).filter(item => item)
}

async function getDuration(ytId) {
	const { items = [] } = await getById(ytId)
	const [ item ] = items
	const { contentDetails: { duration } } = item
	return duration
}

function convertYoutubeDurationToMs(youtubeDuration) {
	let fromHours, fromMinutes, fromSeconds

	if (youtubeDuration.match(/(\d+)H/)) {
		fromHours = Number(youtubeDuration.match(/(\d+)H/)[1]) * 60 * 60
	} else {
		fromHours = 0
	}

	if (youtubeDuration.match(/(\d+)M/)) {
		fromMinutes = Number(youtubeDuration.match(/(\d+)M/)[1]) * 60
	} else {
		fromMinutes = 0
	}

	if (youtubeDuration.match(/(\d+)S/)) {
		fromSeconds = Number(youtubeDuration.match(/(\d+)S/)[1])
	} else {
		fromSeconds = 0
	}

	return (fromHours + fromMinutes + fromSeconds) * 1000
}

function isDurationMatch(vidDuration, songDuration) {
	return (Math.abs(vidDuration - songDuration) / songDuration) < 0.05
}

export async function getGenreList(req, res) {
	await getNewAccessToken()
	const response = await spotifyApi.getAvailableGenreSeeds()
	const { body: { genres } } = response
	res.json(genres)
}

// module.exports = {
//
// 	findNextSong: function(req, res) {
//
// 		var attempts = 0
//
// 		var tryNext = function() {
//
// 			if (attempts > 4) {
// 				res.sendStatus(500)
// 				return
// 			}
//
// 			var handleEchonestSong = function(err, song) {
// 				if (err) {
// 					handleError(err)
// 				} else {
// 					youtube.searchYoutube(song, handleYoutubeResults)
// 				}
// 			}
//
// 			var handleYoutubeResults = function(err, song) {
// 				if (err) {
// 					handleError(err)
// 				} else {
// 					youtube.checkDurations(song, handleCheckDurations)
// 				}
// 			}
//
// 			var handleCheckDurations = function(err, song) {
// 				if (err) {
// 					handleError(err)
// 				} else {
// 					res.send({ song: {
// 						ytid: song.ytid
// 					} })
// 				}
// 			}
//
// 			var handleError = function(err) {
// 				console.log(err)
// 				attempts++
// 				tryNext()
// 			}
//
// 			echonest.getNextSong(req.query.sessionId, handleEchonestSong)
// 		}
//
// 		tryNext()
// 	}
// }
