var gulp = require('gulp'),
    /* BrowserSync */
    browserSync = require('browser-sync').create(),
    /* CSS */
    /* Prefixer */
    prefixer = require('autoprefixer-stylus'),
    /* Stylus */
    stylus = require('gulp-stylus'),
    /* KoutoSwiss */
    koutoSwiss = require('kouto-swiss'),
    /* Rupture */
    rupture = require('rupture'),
    /* Remove Comments */
    stripCssComments = require('gulp-strip-css-comments'),
    cleanCSS = require('gulp-clean-css'),
    /* JS */
    /* Compress */
    uglify = require('gulp-uglify'),
    /* Combine */
    concat = require('gulp-concat'),
    /* Image */
    /* Sprite */
    spritesmith = require('gulp.spritesmith'),
    /* Buffer */
    buffer = require('vinyl-buffer'),
    /* Merge */
    merge = require('merge-stream'),
    /* Image */
    imagemin = require('gulp-imagemin'),
    /* Changed File */
    changed = require('gulp-changed'),
    /* Notify */
    notify = require("gulp-notify"),
    /* FTP */
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    /* Plumber */
    plumber = require("gulp-plumber");
/* Bower Config */
var config = {
    bowerDir: './bower_components/',
    imgDir: './assets/images/**/*'
}
var reload = browserSync.reload;
/* JS Files */
var js = [
    './assets/js/plugins.js',
    './assets/js/main.js'
];
var files = [
        './css/style.css',
        './js/main.js',
        '/*.php',
        '/*.html'
    ]
    /* JS */
gulp.task('minify-js', function() {
    gulp.src(js)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
    //.pipe(notify("JS Compilado"));
});
/* Stylus */
gulp.task('stylus', function() {
    gulp.src('./assets/stylus/style.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include css': true,
            use: [koutoSwiss(), prefixer(), rupture()]
        }))
        .pipe(plumber())
        .pipe(stripCssComments())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});
/* Server BrowserSync Init */
gulp.task('sync', function() {
    browserSync.init(["*.php", "js/main.js", "css/style.css", "*.html"], {
        proxy: 'isystem.bomfim',
        ghostMode: false,
        notify: true,
    });
});
/* Image Compress */
gulp.task('imagemin', function() {
    return gulp.src('./assets/images/compress/*.{jpg,png,gif}')
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./images/'));
});
/* Sprite  */
gulp.task('sprite', function() {
    var spriteName = 'sprite.png';
    var spriteData = gulp.src('./assets/images/sprite/*.{jpg,png}').pipe(spritesmith({
        imgName: spriteName,
        cssName: '_sprite.styl',
        padding: 4,
        imgPath: '/images/sprite/' + spriteName,
    }));

    var cssStream = spriteData.css
        .pipe(gulp.dest('./assets/stylus/base/'));

    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('./images/sprite/'));

    return merge(imgStream, cssStream);
});
/* Deploy */
gulp.task('deploy', function() {

    var conn = ftp.create({
        host: 'HOST',
        user: 'USER',
        password: 'PASS',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'css/**',
        'js/**',
        'fonts/**',
        'images/**',
        'video/**',
        '*.php',
        '.htaccess',
        '*.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 

    return gulp.src(globs, {
            base: '.',
            buffer: false
        })
        .pipe(conn.newer('/')) // only upload newer files 
        .pipe(conn.dest('/'));

});
/* Watch */
gulp.task('default', function() {
    gulp.watch('./assets/stylus/**/*', ['stylus']);
    gulp.watch(js, ['minify-js']);
});