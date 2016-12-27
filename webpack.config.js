let pkg = require('./package');
let webpack = require('webpack');
var autoprefixer = require('autoprefixer');
let extractTextPlugin = require('extract-text-webpack-plugin');

let filename = 'angular-moment-picker' + (process.argv.indexOf('-p') != -1 ? '.min' : '');

module.exports = {
	entry: [
		'./src/index.ts',
		'./src/index.less'
	],
	output: {
		path: './dist/',
		filename: filename + '.js'
	},
	bail: true,
	externals: Object.keys(pkg.dependencies),
	resolve: {
		extensions: ['', '.ts', '.html', '.less']
	},
	module: {
		preLoaders: [
			{ test: /\.ts$/, loader: 'tslint' }
		],
		loaders: [
			{ test: /\.ts$/, loader: 'ts' },
			{ test: /\.html$/, loader: 'html?minimize=true' },
			{ test: /\.less$/, loader: extractTextPlugin.extract('style', 'css!postcss!less') }
		]
	},
	plugins: [
		new extractTextPlugin(filename + '.css'),
		new webpack.BannerPlugin('Angular Moment Picker - v' + pkg.version + ' - ' + pkg.homepage + ' - (c) 2015 Indri Muska - ' + pkg.license)
	],
	postcss: [
		autoprefixer({ browsers: ['> 0%'] })
	]
};