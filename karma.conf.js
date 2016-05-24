var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            //polyfill
            'node_modules/es6-shim/es6-shim.js',
            //ts emitted functions replaced to more relevant code coverage
            'tests/ts-emitted-functions.js',
            // all files in "test"
            'tests/**/*.ts'
            // each file acts as entry point for the webpack configuration
        ],
        preprocessors: {
            // add webpack as preprocessor
            'tests/**/*.ts': ['webpack', 'sourcemap'],
            'src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'reports/',
            reporters: [
                { type: 'json', subdir: 'coverage' },
                { type: 'html', subdir: 'coverage/html' }
            ]
        },
        webpack: {
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                        loader: 'ts-loader',
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ]
                    }
                ],
                postLoaders: [{
                    test: /\.ts$/,
                    include: [path.resolve(__dirname, 'src')],
                    loader: 'istanbul-instrumenter'
                }]
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