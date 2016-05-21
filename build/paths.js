var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var testsRoot = 'tests/';
var tsGlob = '**/*.ts';

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  reports: 'reports/',
  transpiled: 'transpiled/',
  source: appRoot + tsGlob,
  tests: testsRoot + tsGlob,
  output: 'dist/',
  packageName: pkg.name,
  dtsSrc: ['typings/index.d.ts']
};
