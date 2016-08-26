module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/style.css' : 'sass/main.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin']
			}
		},
		cssmin: {
		  	options: {
		    	shorthandCompacting: false,
		    	roundingPrecision: -1
		  	},
		  	target: {
		    	files: {
		      		'css/style.min.css': 'css/style.css'
		    	}
		  	}
		},
	  	uglify: {
		    js: {
				files: {
	        		'js/scripts.min.js': 'js/src/*.js'
		      	}
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['sass', 'cssmin', 'uglify', 'watch']);
}