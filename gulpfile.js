archiveName = 'emailName.zip';

//----- required variables -----

var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template-html');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var open = require('gulp-open');
var inlineCss = require('gulp-inline-css');
var replace = require('gulp-replace-task');
var prettify = require('gulp-prettify');
var zip = require('gulp-zip');
var filesize = require('gulp-filesize');

//----- required variables -----


gulp.task('create', function () {
    gulp.src('src/content/*.html')
        .pipe(template('src/templates/2columnsMarquee.html'))
        .pipe(gulp.dest('src/'));
    gutil.log(gutil.colors.green('.HTML created in src folder'));
});

gulp.task('inline', function () {
    gulp.src('src/index.html')
        .pipe(inlineCss({
            applyStyleTags: false,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true,
            removeHtmlSelectors: false
        }))
        .pipe(gulp.dest('src'));
    gutil.log(gutil.colors.green('css inlined'));
});

gulp.task('remove', function () {
    gulp.src('src/index.html')
        .pipe(replace({
            patterns: [
                {
                    match: /id=[',\"]([\w- ])*[',\"]/g,
                    replacement: ''
            }
        ]
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('prettify', function () {
    gulp.src('src/*.html')
        .pipe(prettify({
            indent_size: 2
        }))
        .pipe(gulp.dest('src'));
    gutil.log(gutil.colors.green('.HTML is prettier now'));
});

gulp.task('connect', function () {
    connect.server({
        root: ['src'],
        port: 8889,
        livereload: true,
    });
});

gulp.task('open', function () {
    var options = {
        uri: 'http://localhost:8889'
    };
    gutil.log('-----------------------------------------');
    gutil.log('Opening browser to:', gutil.colors.yellow('http://localhost:8889'));
    gutil.log('-----------------------------------------');
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task('basic-reload', function () {
    gulp.src('src')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/*.html', 'src/*.css'], ['basic-reload']);
});

gulp.task('serve', function (callback) {
    runSequence(['connect'], ['open', 'watch'],
        callback);
});

gulp.task('copy-html-to-dist-folder', function () {
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('deploy'));
    gutil.log(gutil.colors.green('html packaged to deploy folder'));
});

gulp.task('copy-images-to-dist-folder', function () {
    gulp.src(['src/images/*.png', 'src/images/*.jpg', 'src/images/*.gif'])
        .pipe(gulp.dest('deploy/images'));
    gutil.log(gutil.colors.green('images packaged to deploy folder'));
});

gulp.task('compress', function () {
    return gulp.src('deploy/*')
        .pipe(zip(archiveName))
        .pipe(filesize())
        .pipe(gulp.dest('delivery'));
});

gulp.task('build', function (callback) {
    runSequence(['copy-html-to-dist-folder'], ['copy-images-to-dist-folder'], ['compress'],
        callback);
});