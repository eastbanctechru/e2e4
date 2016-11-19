var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: false,
        frameworks: ['mocha'],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/ts-helpers/index.js',
            'tests/**/*.ts'
        ],
        preprocessors: {
            'tests/**/*.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            ts: {
                configFileName: "tsconfig.cjs.json",
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
            noInfo: true
        }
    });
};