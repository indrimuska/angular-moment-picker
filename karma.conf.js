module.exports = function(config) {
	
	config.set({
		// root path location
		basePath: './',
		// list of files/patterns to load in the browser
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/moment/min/moment.js',
			'node_modules/moment/min/moment-with-locales.js',
			'src/*.js',
			'tests/utility.js',
			'tests/*.js'
		],
		// test frameworks
		frameworks: ['jasmine'],
		// full web stack hidden browser
		browsers: ['PhantomJS'],
		// run tests and then exit
		singleRun: true
	});
	
};