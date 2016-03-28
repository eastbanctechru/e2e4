var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var testsRoot = 'tests/';
var tsGlob = '**/*.ts';

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  transpiled: 'transpiled/',
  source: appRoot + tsGlob,
  bundleFile: 'e2e4.ts',
  tests: testsRoot + tsGlob,
  output: 'dist/',
  packageName: pkg.name,
  dtsSrc: ['typings/browser.d.ts'],
  es6dtsSrc: ['typings/browser/ambient/lodash/index.d.ts']
};
