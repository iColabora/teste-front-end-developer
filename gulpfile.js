'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var minify = require('gulp-minify'); // js
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

//Sass
gulp.task('sass', function () {
    return gulp.src('./assets/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            //suffix: ".min",
            extname: ".css"
        }))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:production', function () {
    return gulp.src('./assets/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            //suffix: ".min",
            extname: ".css"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css/'));
});

//End - Sass

//Webpack
gulp.task('webpack', function() {
    return gulp.src('./assets/js/app.js')
        .pipe(webpack( require('./webpack.dev.js') ))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('webpack:production', function() {
    return gulp.src('./assets/js/app.js')
        .pipe(webpack( require('./webpack.prod.js') ))
        .pipe(gulp.dest('./public/js/'));
});

//End - Webpack

gulp.task('watch', function () {
    gulp.watch([
        './assets/css/*.scss',
        './assets/css/*/*.scss'
    ], ['sass']);
    gulp.watch([
        './assets/js/*.js',
        './assets/js/*/*.js'
    ], ['webpack']);
});

gulp.task('production', ['webpack:production', 'sass:production']);