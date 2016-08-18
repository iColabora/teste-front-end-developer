module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
    
        cssmin: {
            combine: {
                files: {
                    'dist/css/vendor.min.css': ['src/css/vendor/*.css', '!dist/css/vendor/*.min.css'],
                    'dist/css/styles.min.css': 'src/css/styles.css'
                }
            }
        },

        sass: {
            dist: {
              files: {
                'src/css/styles.css': 'src/css/styles.scss'
              }
            }
        },

        copy: {
          main: {
            expand: true,
            cwd: 'src/fonts', 
            src: '*',
            dest: 'dist/fonts',
          },
        },

        imagemin: {                      
            dynamic: {                        
              files: [{
                expand: true,                  
                cwd: 'src/img',                 
                src: ['**/*.{png,jpg,gif}'],   
                dest: 'dist/img'                 
              }]
            }
        },
 
        uglify: {
            bundle: {
                files: {
                    'dist/js/jquery.min.js': 'src/js/vendor/jquery/jquery.js',
                    'dist/js/vendor.min.js': ['src/js/boostrap/boostrap.min.js', 'src/js/vendor/*.js'],
                    'dist/js/scripts.min.js': 'src/js/*.js'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    grunt.registerTask('default', ['cssmin:target', 'sass', 'imagemin', 'uglify:bundle',]);
};