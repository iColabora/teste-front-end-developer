var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var browserSync = require('browser-sync').create();

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var scripts = [
  './src/js/database.js',
  './src/js/validator.js',
  './src/js/form-wizard.js',
  './src/js/paginator.js',
  './src/js/cep.js',
  './src/js/chart_pedidos.js',
  './src/js/core.js',
];

var scriptsLibs = [
  './exemplo-query/mysql_lib.js',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/bootstrap/dist/js/bootstrap.min.js',
  './bower_components/datatables.net/js/jquery.dataTables.min.js',
  './bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js',
  './bower_components/jquery-mask-plugin/dist/jquery.mask.min.js',
  './bower_components/chart.js/dist/Chart.min.js',
  './vendor/datepicker/js/bootstrap-datepicker.min.js',
  './vendor/datepicker/locales/bootstrap-datepicker.pt-BR.min.js'
];

var cssLib = [
  './bower_components/bootstrap/dist/css/bootstrap.min.css',
  './bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css',
  './vendor/animate.css',
  './vendor/datepicker/css/bootstrap-datepicker3.css',
];

gulp.task('scripts-libs', function() {
  return gulp.src(scriptsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('scripts-site', function() {
  return gulp.src(scripts)
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function() {
  return gulp.src(['src/scss/app.scss'])
    .pipe($.sass({
      outputStyle: 'compressed'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({  
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('css-libs', function() {
  return gulp.src(cssLib)
    .pipe($.sass({
      outputStyle: 'compressed'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({  
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('serve', ['sass', 'css-libs', 'scripts-libs'], function() {
    browserSync.init({
        server: "./public"
    });

    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(scripts, ['scripts-site']);
    gulp.watch("public/index.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
