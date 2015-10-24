//----- required variables -----

var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template-html');

//----- required variables -----


gulp.task('create', function () {
    gulp.src('src/content/*.html')
      .pipe(template('src/templates/template.html'))
      .pipe(gulp.dest('src'));
    gutil.log(gutil.colors.green('.HTML created in src folder'));
});