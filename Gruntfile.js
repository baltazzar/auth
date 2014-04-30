module.exports = function (grunt) {
	require('jit-grunt')(grunt);

	var path = require('path');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: [
			'/**\n',
			' * Baltazzar Auth\n',
			' * Versão: <%= pkg.version %>\n',
			' * <%= pkg.description %>\n',
			' * Autor: BaltazZar Team\n',
			' */\n'
		].join(''),
		livereloadPort : 4000,
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 3000,
					livereload: '<%= livereloadPort %>',
					open: 'http://localhost:3000/test/index.html'
				}
			}
		},
		jshint: {
			options: {
				'-W030': true,
				'-W061': true,
				'-W116': true,
				'-W041': true,
				'-W069': true
			},
			files: ['src/**/*.js']
		},
		watch: {
			files: {
				files: ['test/**/*'],
				options: {
					livereload: '<%= livereloadPort %>'
				}
			},
			dev: {
				files: ['src/**/*.js', '!src/libs/**/*.js'],
				tasks: ['browserify:dev']
			}
		},
		browserify: {
			dev: {
				src: ['src/<%= pkg.name %>.js'],
				dest: '<%= pkg.name %>.js',
				options: {
					alias: ['libs/jquery.js:jquery', 'libs/underscore.js:underscore', 'libs/backbone.js:backbone'],
					bundleOptions: {
						standalone: 'baltazzar.<%= pkg.name %>'
					}
				}
			},
			dist: {
				src: ['src/<%= pkg.name %>.js'],
				dest: '<%= pkg.name %>.js',
				options: {
					external: ['jquery', 'underscore', 'backbone'],
					bundleOptions: {
						standalone: 'baltazzar.<%= pkg.name %>'
					}
				}
			}
		},
		uglify: {
			'<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
		}
	});

	grunt.registerTask('default', ['dev']);
	grunt.registerTask('build', ['jshint', 'browserify:dist', 'uglify']);
	grunt.registerTask('dev', ['browserify:dev', 'connect', 'watch']);
	grunt.registerTask('banner', function() {
		var banner = grunt.config.get('banner'),
			fileContent = grunt.file.read('auth.js'),
			minFileContent = grunt.file.read('auth.min.js');

		grunt.file.write('auth.js', banner + fileContent);
		grunt.file.write('auth.min.js', banner + minFileContent);
	});
};