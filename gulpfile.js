//----- required variables -----

var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template-html');
var inlineCss = require('gulp-inline-css');
var prettify = require('gulp-prettify');

//----- required variables -----


gulp.task('create', function () {
    gulp.src('src/content/*.html')
        .pipe(template('src/templates/template.html'))
        .pipe(gulp.dest('src'));
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

gulp.task('prettify', function () {
    gulp.src('src/*.html')
        .pipe(prettify({
            indent_size: 2
        }))
        .pipe(gulp.dest('src'));
    gutil.log(gutil.colors.green('.HTML is prettier now'));
});

gulp.task('copy-to-dist-folder', function () {
    return gulp.src(['src/index.html', 'src/images/*.png', 'src/images/*.jpg', 'src/images/*.gif'])
        .pipe(gulp.dest('deploy'));
    gutil.log(gutil.colors.green('Email packaged to deploy folder'));
});