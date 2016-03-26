var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            //polyfill
            'node_modules/babel-es6-polyfill/browser-polyfill.js',
            // all files in "test"
            'tests/**/*.ts'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'tests/**/*.ts': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'spec' ], //report results in this format
        webpack: {
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                        loader: 'babel?stage=2&optional[]=es7.decorators&optional[]=es7.classProperties&loose[]=all!ts-loader',
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ]
                    }
                ]
            },
            resolve: {
                modulesDirectories: [
                    'node_modules'
                ],
                extensions: ['', '.ts', '.tsx', '.json', '.js']
            }
        },
        webpackServer: {
            noLog: true,
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};