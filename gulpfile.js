var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var inject = require('gulp-inject');
var mincss = require('gulp-minify-css');
var flatten = require('gulp-flatten');
var ngSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var es = require('event-stream');
var wiredep = require('wiredep').stream;

var files = {
  js: {
    src: ['./src/app/**/*.js'],
    dst: './build/'
  },
  css: {
    src: ['./src/less/*.css'],
    dst: './build/css/'
  },
  html: {
    src: ['./src/app/**/*.html'],
    dst: './build/'
  },
  fonts: {
    src: ['./src/bower_components/**/*.woff*', './src/bower_components/**/*.ttf*'],
    dst: './build/fonts'
  },
  stubs: {
    src: ['./src/stubs/*.json'],
    dst: './build/stubs'
  }
};

gulp.task('stubs', function() {
  return gulp.src(files.stubs.src).pipe(gulp.dest(files.stubs.dst));
});

gulp.task('usemin', ['inject'], function () {
  return gulp.src('./src/index.html')
      .pipe(usemin({
        css: [mincss({ processImport: false })],
        bower: [uglify({ mangle: false})],
        openflix: [uglify({ mangle: false})]
      }))
      .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function() {
  return gulp.src(files.fonts.src)
    .pipe(flatten())
    .pipe(gulp.dest(files.fonts.dst));
});

gulp.task('connect', ['inject'], function() {
  connect.server({
    root: ['src'],
    livereload: true
  });
});

gulp.task('connectBuild', ['inject', 'usemin'], function() {
  connect.server({
    root: ['build'],
    livereload: true
  });
});

gulp.task('templates', function() {
  return gulp.src(files.html.src)
    .pipe(templateCache({ module: 'openflix', root: '/app'}))
    .pipe(gulp.dest(files.html.dst));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(files.js.src, {read: false}).pipe(ngSort());
  var css = gulp.src(files.css.src, {read: false});
  var bowerComponents = gulp.src(bowerFiles(), {read: false, base: 'src/bower_components'});

  return target
    .pipe(inject(bowerComponents, {name: 'bower', relative: true}))
    .pipe(inject(sources, {relative: true}))
    .pipe(inject(css, {relative: true}))
    .pipe(gulp.dest('./src'))
    .pipe(connect.reload());
});

gulp.task('build', ['inject', 'usemin', 'fonts', 'templates', 'stubs', 'connectBuild']);
gulp.task('default', ['inject', 'connect']);
