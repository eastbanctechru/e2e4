# e2e4

[![Build Status](https://travis-ci.org/fshchudlo/e2e4.svg?branch=master)](https://travis-ci.org/fshchudlo/e2e4)
[![Coverage Status](https://coveralls.io/repos/github/fshchudlo/e2e4/badge.svg?branch=master)](https://coveralls.io/github/fshchudlo/e2e4?branch=master)
[![Dependency Status](https://david-dm.org/fshchudlo/e2e4.svg)](https://david-dm.org/fshchudlo/e2e4)
[![devDependency Status](https://david-dm.org/fshchudlo/e2e4/dev-status.svg)](https://david-dm.org/fshchudlo/e2e4#info=devDependencies)

Set of base classes and utilities to build unobtrusive list models. 
This is used as abstract codebase to implement bridges from client side frameworks like [Angular](https://angular.io/) or [Aurelia](http://www.aurelia.io/)

## How to build this

To build the project, follow these steps:
1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. Ensure that [TypeScript](http://www.typescriptlang.org/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g typescript
  ```
3. From the project folder, execute the following command to install project dependencies:

  ```shell
  npm install
  ```
4. From the project folder, execute the following command to build the source code:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the dist folder in following module formats: AMD, CommonJS, SystemJS and ES6.