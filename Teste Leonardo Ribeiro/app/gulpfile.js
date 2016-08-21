var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe(clean());
});


gulp.task('uglify', function () {
    return es.merge([
        gulp.src(['lib/**/*.js', 'js/**/*.js']).pipe(uglify())
    ])
        .pipe(gulp.dest('dist/js'));
});



gulp.task('cssmin', function () {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'css/**/*.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('default', function (cb) {
    return runSequence('clean', ['uglify','cssmin'], cb)
});