var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    htmlReplace = require('gulp-html-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    jshintStylish = require('jshint-stylish');

gulp.task('clean', function () {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('clean-img', function () {
    return gulp.src('./dist/img').pipe(clean());
});

gulp.task('clean-css', function () {
    return gulp.src('./dist/css').pipe(clean());
});

gulp.task('clean-js', function () {
    return gulp.src('./dist/js').pipe(clean());
});

gulp.task('clean-html', function () {
    return gulp.src('./dist/**/*.html').pipe(clean());
});

gulp.task('build-img', ['clean-img'], function () {
    gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-fonts', function () {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('usemin', ['clean-css', 'clean-js', 'clean-html'], function () {
    return gulp.src('./src/**/*.html')
        .pipe(usemin({
            js: [uglify],
            css: [autoprefixer, usemin]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('copy-fonts', 'build-img', 'usemin');
});

gulp.task('server', function () {
    browserSync.init({
        server : {
            baseDir: 'dist'
        }
    });

    gulp.watch('./src/sass/**/*.scss').on('change', function(event) {
        var stream = gulp.src(event.path)
                         .pipe(compass({
                             config_file: './config.rb',
                             css: './src/css',
                             sass: './src/sass'
                         })).on('error', function (error) {
                            console.log(error);
                         })
                         .pipe(gulp.dest('./src/css'));
        browserSync.reload;
    });

    gulp.watch('./src/**/*.js').on('change', function (event) {
        gulp.start('usemin');
        browserSync.reload;
    });

    gulp.watch('./src/**/*.css').on('change', function (event) {
        gulp.start('usemin');
        browserSync.reload;
    });

    gulp.watch('./src/**/*.html').on('change', function (event) {
        gulp.start('usemin');
        browserSync.reload;
    });

    gulp.watch('./src/img/**/*').on('change', function (event) {
        gulp.start('build-img');
        browserSync.reload;
    });
});