var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var paths = require('../paths');
var typescript = require('gulp-tsb');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var through2 = require('through2');
var tools = require('aurelia-tools');
var to5 = require('gulp-babel');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

var jsName = paths.packageName + '.js';

gulp.task('transpile', function () {
  var options = require('../../tsconfig.json').compilerOptions;
  var typescriptCompiler = typescript.create(options);
  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber())
    .pipe(typescriptCompiler())
    .pipe(gulp.dest(paths.transpiled));
});

gulp.task('build-index', function () {
  var importsToAdd = [];
  var files = [
    'Defaults.js',
    'KeyCodes.js',
    'MouseButtons.js',
    'ProgressState.js',
    'SortDirection.js',
    'SortParameter.js',
    'StatusModel.js',
    'Utility.js',
    'filterManager.js',
    'filterConfig.js',
    'filterAnnotation.js',
    'baseComponent.js',
    'selectionManager.js',
    'statusTracker.js',
    'listComponent.js',
    'bufferedListComponent.js',
    'pagedListComponent.js'
  ].map(function (file) {
    return paths.transpiled + file;
  });

  return gulp.src(files)
    .pipe(through2.obj(function (file, enc, callback) {
      file.contents = new Buffer(tools.extractImports(file.contents.toString("utf8"), importsToAdd));
      this.push(file);
      return callback();
    }))
    .pipe(concat(jsName))
    .pipe(insert.transform(function (contents) {
      return tools.createImportBlock(importsToAdd) + contents;
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-amd', function () {
  return gulp.src(paths.output + jsName)
    .pipe(to5(assign({}, compilerOptions, { modules: 'amd' })))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-es6', function () {
  return gulp.src(paths.output + jsName)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  return gulp.src(paths.output + jsName)
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-system', function () {
  return gulp.src(paths.output + jsName)
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-dts', function(){
  return gulp.src(paths.root + paths.packageName + '.d.ts')
    .pipe(gulp.dest(paths.output))
    .pipe(gulp.dest(paths.output + 'es6'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});


gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    'transpile',
    'build-index',
    [
      'build-amd',
      'build-es6',
      'build-commonjs',
      'build-system'
    ],
    'build-dts',
    callback
  );
});