var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var inject = require('gulp-inject');
var ngSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var es = require('event-stream');
var wiredep = require('wiredep').stream;

var files = {
  js: {
    src: ['./src/app/**/*.js'],
    dst: './build/'
  },
  less: {
    src: ['./src/less/*.less'],
    dst: './build/css/'
  },
  html: {
    src: ['./src/app/**/*.html'],
    dst: './build/'
  },
};

gulp.task('usemin', ['inject'], function () {
  return gulp.src('./src/index.html')
      .pipe(usemin())
      .pipe(gulp.dest('./build/'));
});

gulp.task('connect', ['inject'], function() {
  connect.server({
    root: ['src'],
    livereload: true
  });
});

gulp.task('connectBuild', ['inject'], function() {
  connect.server({
    root: ['build'],
    livereload: true
  });
});

gulp.task('templates', function() {
  return gulp.src(files.html.src)
    .pipe(templateCache({ module: 'openflix', root: '../app'}))
    .pipe(gulp.dest(files.html.dst));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(files.js.src, {read: false}).pipe(ngSort());
  var bowerComponents = gulp.src(bowerFiles(), {read: false, base: 'src/bower_components'});

  return target
    .pipe(inject(bowerComponents, {name: 'bower', relative: true}))
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./src'))
    .pipe(connect.reload());
});

gulp.task('build', ['inject', 'usemin', 'templates', 'connectBuild']);
gulp.task('default', ['inject', 'connect']);
