var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'tests/**/*.ts'
        ],
        frameworks: ['mocha'],
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'tests/**/*.ts': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        singleRun: true,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        exclude: [path.resolve(__dirname, 'node_modules')],
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts-loader',
                        test: /.*(?!\.d\.ts)|(\.ts)$/
                    }
                ],
                postLoaders: [{
                    include: [path.resolve(__dirname, 'src')],
                    loader: 'istanbul-instrumenter',
                    test: /\.ts$/
                }]
            },
            resolve: {
                extensions: ['', '.ts', '.tsx', '.json', '.js'],
                modulesDirectories: [
                    'node_modules'
                ]
            },
            ts: {
                compilerOptions: {
                    importHelpers: true,
                    noEmitHelpers: true
                }
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
};
