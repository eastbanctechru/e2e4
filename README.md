# e2e4

[![Build Status](https://travis-ci.org/fshchudlo/e2e4.svg?branch=master)](https://travis-ci.org/fshchudlo/e2e4)
[![Coverage Status](https://coveralls.io/repos/github/fshchudlo/e2e4/badge.svg?branch=master)](https://coveralls.io/github/fshchudlo/e2e4?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/fshchudlo/e2e4.svg)](https://david-dm.org/fshchudlo/e2e4)
[![devDependency Status](https://david-dm.org/fshchudlo/e2e4/dev-status.svg)](https://david-dm.org/fshchudlo/e2e4?type=dev)
[![npm version](https://badge.fury.io/js/e2e4.svg)](https://badge.fury.io/js/e2e4)

Set of base classes and utilities to build unobtrusive list models. 
This is abstract codebase which can be used to implement bridges to end-user frameworks (such as [Angular bridge](https://github.com/fshchudlo/right-angled) for example).

## Documentation
Documentation is available [here](http://fshchudlo.github.io/e2e4)

## Changelog
Changelog is available [here](https://github.com/fshchudlo/e2e4/blob/master/CHANGELOG.md)

## How to build the project

To build the project, follow these steps:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. Ensure that [TypeScript](http://www.typescriptlang.org/), [Typings](https://github.com/typings/typings/) and [Gulp](http://gulpjs.com/) are installed. If you need to install them, use the following command:

  ```shell
  npm install -g typescript typings gulp
  ```
3. From the project folder, execute the following command to install project dependencies:

  ```shell
  npm install
  ```
4. From the project folder, execute the following command to install type definitions:

  ```shell
  typings install
  ```
5. From the project folder, execute the following command to build the source code:

  ```shell
  gulp build
  ```
6. You will find ES5-compiled code in the `src` folder and ES6-compiled code in `esm` folder.

## How to run tests

You can run tests in chrome with watch mode by executing the following command: 

  ```shell
  gulp test
  ```
  or execute single run in PhantomJS:
  
  ```shell
  gulp test-single-run
  ```