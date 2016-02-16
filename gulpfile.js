/**
 * Created by Administrator on 2015-05-07.
 */
// Include gulp
var gulp = require('gulp');
var server = require('gulp-express');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var cache = require('gulp-cache');
var deleted = require('gulp-deleted');
var imagemin = require('imagemin');
var path = require('path');
var react = require('gulp-react');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var dev='front-src/dev/';
var release='front-src/release/';

gulp.task('serve',['index','html','jsx','styles','scripts','images'], function() {

    browserSync.init([dev+'html/**/*',dev+'js/*.js',dev+'images/*'],{
        baseDir:'./'
    });

    gulp.watch([dev+'*.html'], ['index']).on('change', browserSync.reload);
    gulp.watch([dev+'html/**/*'], ['html']).on('change', browserSync.reload);
    gulp.watch([dev+'template/jsx/*'], ['jsx']).on('change', browserSync.reload);
    gulp.watch([dev+'css/**/*'], ['styles']).on('change', browserSync.reload);
    gulp.watch([dev+'js/**/*'], ['scripts']).on('change', browserSync.reload);
    gulp.watch([dev+'images/**/*'], ['images']).on('change', browserSync.reload);

});

gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['app.js']);
});

// Html
gulp.task('index', function() {
    return gulp.src(dev+'*.html')
        //.pipe(deleted(dev+'html'))
        //.pipe(react())
        .pipe(gulp.dest(release));
});


// Html
gulp.task('html', function() {
    return gulp.src(dev+'html/**/*')
        //.pipe(deleted(dev+'html'))
        //.pipe(react())
        .pipe(gulp.dest(release+'html'));
});

// jsx
gulp.task('jsx', function() {
    return gulp.src(dev+'template/jsx/*')
        .pipe(react())
        .pipe(deleted(release+'template/*.jsx'))
        .pipe(gulp.dest(release+'template'));
});

// Styles
gulp.task('styles', function() {
    /*
    return gulp.src(dev+'css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(release+'css'))
        .pipe(browserSync.reload({stream: true}));
    */

    return gulp.src(dev+'css/**/*')
        .pipe(compass({
            sass: dev+'css',
            css: release+'css',
            image: release+'images',
            style:'compact'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(deleted(dev+'css'))
        .pipe(gulp.dest(release+'css'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(dev+'js/**/*')
        //.pipe(uglify({mangle: false}))//syntax error at angular compress, so add option(mangle:false)
        //.pipe(rename({ extname: '.js' }))
        //.pipe(deleted(dev+'js'))
        .pipe(gulp.dest(release+'js'));
});

// Images
gulp.task('images', function() {
    return gulp.src(dev+'images/**/*')
        //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        //.pipe(deleted(release+'images'))
        .pipe(gulp.dest(release+'images'));
});

// Watch
gulp.task('watch', function() {

    // Watch .html files
    gulp.watch([dev+'*.html']);
    gulp.watch([dev+'html/**/*']);

    gulp.watch([dev+'template/jsx/*']);

    // Watch .scss files
    gulp.watch(dev+'css/*', ['styles']);

    // Watch .js files
    gulp.watch(dev+'js/*', ['scripts']);

    // Watch image files
    gulp.watch(dev+'images/*', ['images']);

});

gulp.task('default', ['index','html', 'jsx','styles','scripts','server','images','serve'], function() {});

////////////////////////////////////////////////////////////////////////////////
// INSTALL
////////////////////////////////////////////////////////////////////////////////
/*
 gulp.task('install', function() {
 return gulp.src('bower.json')
 .pipe(install());
 });
*/

