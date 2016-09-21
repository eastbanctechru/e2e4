var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var tsGlob = '**/*[!.][!d].ts';

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  coverage: 'coverage/',
  docs: 'docs/',
  source: [appRoot + tsGlob],
  tests: ['tests/' + tsGlob],
  esmOutput: 'esm/',
  packageName: pkg.name
};
