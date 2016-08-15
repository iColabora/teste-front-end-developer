var gulp = require( 'gulp' );
var minifycss = require( 'gulp-minify-css' );
var notify = require( 'gulp-notify' );

gulp.task( 'default', function() {
    gulp.src( './styles/css/styles.css' )
        .pipe( minifycss() )
        .pipe(gulp.dest('./styles/css/min'))
        .pipe( notify( 'CSS OK!' ) );
});

//gulp.task( 'default', function() {
//    gulp.watch( './styles/css/styles.css', [ 'css' ] );
//});