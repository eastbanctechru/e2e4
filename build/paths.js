var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  transpiled: 'transpiled/',
  source: appRoot + '**/*.ts',
  output: 'dist/',
  packageName: pkg.name,
  dtsSrc: [
    'typings/**/*.ts',
    './jspm_packages/**/*.d.ts'
  ]
};
