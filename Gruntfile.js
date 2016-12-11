module.exports = function (grunt) {
	
	// Load plugins
	require('load-grunt-tasks')(grunt);
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			target: ['src/angular-moment-picker.js']
		},
		karma: {
			unit: {
				options: {
					files: [
						'node_modules/jquery/dist/jquery.js',
						'node_modules/angular/angular.js',
						'node_modules/angular-mocks/angular-mocks.js',
						'node_modules/moment/min/moment-with-locales.js',
						'src/*.js',
						'tests/utility.js',
						'tests/<%= grunt.task.current.args[0] || "*" %>.js'
					],
					frameworks: ['jasmine'],
					browsers: ['PhantomJS'],
					singleRun: true
				}
			}
		},
		bumpup: {
			file: 'package.json'
		},
		copy: {
			main: {
				files: {
					'dist/angular-moment-picker.js': ['src/angular-moment-picker.js'],
					'dist/angular-moment-picker.css': ['src/angular-moment-picker.css']
				}
			}
		},
		uglify: {
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
		header: {
			main: {
				options: {
					text: '/*! Angular Moment Picker - v<%= pkg.version %> - https://github.com/indrimuska/angular-moment-picker - (c) 2015 Indri Muska - MIT */'
				},
				files: {
					'dist/angular-moment-picker.js': 'dist/angular-moment-picker.js',
					'dist/angular-moment-picker.css': 'dist/angular-moment-picker.css',
					'dist/angular-moment-picker.min.js': 'dist/angular-moment-picker.min.js',
					'dist/angular-moment-picker.min.css': 'dist/angular-moment-picker.min.css'
				}
			}
		},
		'sync-json': {
			options: {
				include: ['name', 'version', 'description', 'homepage', 'license', 'keywords', 'dependencies']
			},
			bower: {
				files: {
					'bower.json': 'package.json'
				}
			}
		}
	});
	
	// Grunt tasks
	grunt.registerTask('test', ['karma:unit']);
	grunt.registerTask('default', ['eslint', 'test']);
	grunt.registerTask('build', ['default', 'bumpup', 'copy', 'uglify', 'cssmin', 'header', 'sync-json']);
	
};