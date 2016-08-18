// instanciando módulos

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function() {
    // corpo da tarefa 
    return gulp
            .src(['src/js/**/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('js-minified'));      
});

gulp.task('minify-css', function(){
	return gulp
			.src('src/css/*.css')
		    .pipe(cleanCSS({compatibility: 'ie8'}))
		    .pipe(gulp.dest('css-minified'));
});