var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'tests/**/*.ts'
        ],
        frameworks: ['mocha'],
        preprocessors: {
            'tests/**/*.ts': ['webpack', 'sourcemap']
        },
        singleRun: false,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        include: [
                            path.resolve(__dirname, 'src'),
                            path.resolve(__dirname, 'tests')
                        ],
                        loader: 'ts-loader',
                        test: /.*(?!\.d\.ts)|(\.ts)$/
                    }
                ]
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
                },
                configFileName: 'tsconfig.cjs.json'
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
};
