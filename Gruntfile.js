module.exports = function(grunt) {
	
	// Load plugins
	require('load-grunt-tasks')(grunt);
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: {
					'dist/angular-moment-picker.js': ['src/angular-moment-picker.js'],
					'dist/angular-moment-picker.css': ['src/angular-moment-picker.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! Angular Moment Picker - v<%= pkg.version %> - https://github.com/indrimuska/angular-moment-picker - (c) 2015 Indri Muska - MIT */\n'
			},
			main: {
				files: {
					'dist/angular-moment-picker.min.js': ['dist/angular-moment-picker.js']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'dist/angular-moment-picker.min.css': ['dist/angular-moment-picker.css']
				}
			}
		},
		'sync-json': {
			options: {
				include: ['name', 'description', 'version']
			},
			bower: {
				files: {
					"bower.json": "package.json"
				}
			}
		}
	});
	
	// Default tasks.
	grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'sync-json']);
	
};