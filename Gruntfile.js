module.exports = function(grunt) {
	// Config
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		copy : {
			main : {
				expand : true,
				src : ['**','!**/node_modules/**'],
				dest : 'production/'
			}
		},
		uglify : {
			dynamic_mappings : {
				files : [{
					expand : true,
					src : ['**/*.js','!**/*.min.js','!node_modules/**/*.js','!production/**/*.js'],
					dest : 'production/',
					ext : '.js',
					extDot : 'first'
				}]
			}
		},
		minjson : {
			config : {
				files : [{
					expand : true,
					src : ['**/*.json','!node_modules/**/*.json','!production/**/*.json'],
					dest : 'production/',
					ext : '.json',
					extDot : 'first'
				}]
			}
		},
		cssmin : {
			target : {
				files : [{
					expand : true,
					cwd : './',
					src : ['**/*.css', '!**/*.min.css','!**/node_modules/**','!production/**/*.css'],
					dest : 'production/',
					ext : '.css'
				}]
			}
		},
		watch : {
			files : ['Gruntfile.js','**/*.js','**/*.json','*.js'],
			tasks : ['copy','uglify','cssmin','minjson']
		}
	})

	// load module uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-minjson');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// default task(s)
	grunt.registerTask('default', ['watch'])
	grunt.registerTask('production', ['copy','uglify','cssmin','minjson'])
}