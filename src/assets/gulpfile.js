'use strict';

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');

// Paths
var paths = {
  /* SCSS paths for build and watching */
  scripts: [
    'js/**/*.js',
    '!js/**/*.min.js'
  ],
  "sass": {
    "main": "scss/styles.scss",
    "vendor": "scss/vendor.scss",
    "watch": "scss/**/*"
  },
  /* Root of css folder */
  "css": {
    "root": "css"
  },
  /* Paths to clean */
  "clean": [
    "css/*"
  ]
};

gulp.task('clean', function () {
  return del(paths.clean);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass.main)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
      })
        .on('error', sass.logError)
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.root))
});

gulp.task('sass-vendor', function () {
  return gulp.src(paths.sass.vendor)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
      })
        .on('error', sass.logError)
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.root))
});

gulp.task('watch', function () {
  gulp.watch(paths.sass.watch, ['sass', 'sass-vendor']);
});

gulp.task('build', ['clean', 'sass', 'sass-vendor']);

gulp.task('default', ['build']);
