var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'tests/common/-ts-emitted-functions.js',
            'tests/**/*.ts'
        ],
        preprocessors: {
            'tests/**/*.ts': ['webpack', 'sourcemap'],
            'src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        webpack: {
            devtool: 'inline-source-map',
            ts: {
                compilerOptions: {
                    noEmitHelpers: true
                }
            },
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
            noInfo: true
        }
    });
};