({
    appDir: './',
    baseUrl: './js',
    dir: './dist',
    mainConfigFile : 'js/app.conf.js', // same config file that is loaded in index.html
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimize: 'uglify'
})