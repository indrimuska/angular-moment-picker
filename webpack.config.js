'use strict';

let pkg = require('./package');
let bower = require('./bower');
let semver = require('semver');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let extractTextPlugin = require('extract-text-webpack-plugin');
let generateJsonPlugin = require('generate-json-webpack-plugin');

let isProduction = process.argv.indexOf('-p') != -1;
let filename = 'angular-moment-picker' + (isProduction ? '.min' : '');
let increase = (process.argv.filter(argv => argv.match(/^increase=.+$/))[0] || '').replace('increase=', '');

// sync bower.json with package.json
pkg.version = increase ? semver.inc(pkg.version, increase) : pkg.version;
['name', 'version', 'description', 'homepage', 'license', 'keywords', 'dependencies'].forEach(field => bower[field] = pkg[field]);

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
		new webpack.BannerPlugin('Angular Moment Picker - v' + pkg.version + ' - ' + pkg.homepage + ' - (c) 2015 Indri Muska - ' + pkg.license),
		new generateJsonPlugin('../bower.json', bower, undefined, 2),
		new generateJsonPlugin('../package.json', pkg, undefined, 2)
	],
	postcss: [
		autoprefixer({ browsers: ['> 0%'] })
	]
};