var path = require('path')

module.exports = {
	entry: './public/js/app.js',
	devtool: 'eval',
	output: {
		path: path.resolve('./dist/js'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /vendor|node_modules/, loader: 'babel-loader' },
		],
	},
}
