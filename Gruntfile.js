'use strict';
module.exports = function(grunt){
    grunt.initConfig({
      concat:{
        cssLibs:{
          src:[
            'app/vendor/bootstrap/dist/css/bootstrap.min.css',
            'app/vendor/animate.css/animate.min.css',
            'app/vendor/chartist/dist/chartist.min.css',
            'app/css/style.css'
          ],
          dest:'app/dist/css/style.css'
        },
        jsLibs:{
          src:[
            'app/vendor/jquery/dist/jquery.min.js',
            'app/vendor/bootstrap/dist/js/bootstrap.min.js',
            'app/vendor/chartist/dist/chartist.min.js',
            'app/vendor/angular/angular.min.js',
            'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
            'app/vendor/oclazyload/dist/ocLazyLoad.min.js',
            'app/js/lib-mysql.js',
            'app/js/app.js'
          ],
          dest:'app/dist/js/script.min.js'
        }
      },
      cssmin:{
        min:{
          src:['app/dist/css/style.css'],
          dest:'app/dist/css/style.min.css'
        }
      },
      htmlmin:{
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            views:{
                expand: true,
                cwd: 'app/views/',
                src:['*.html'],
                dest:'app/dist/views'
            },
            dist:{
                src:['app/index-prod.html'],
                dest:'app/dist/index.html'
            },
      },
      clean:{
        src:'app/dist/css/style.css'
      }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('dist', ['concat','cssmin','htmlmin','clean']);
};
