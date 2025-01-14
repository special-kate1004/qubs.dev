var gulp = require('gulp'),
  sass = require('gulp-dart-sass');
sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  minify = require('gulp-minify'),
  cleanjs = require('gulp-clean'),
  wait = require('gulp-wait'),
  autoprefixer = require('autoprefixer')


function buildCss() {
  return gulp.src(['scss/*.scss'])
    .pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css/'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css/'))
}

// function compress() {
//   return gulp.src(['scss/js/*.js'])
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('assets/js/'))
//     .pipe(cleanjs())
//     .pipe(minify())
//     //.pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('assets/js/'))
// }

function watcher() {
  gulp.watch(['scss/*.scss'], gulp.series(buildCss));
}
// exports.compress = gulp.series(compress);
exports.watch = gulp.series(buildCss, watcher);
exports.default = gulp.series(buildCss);