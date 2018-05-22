var webpack = require('webpack');
var path = require('path');
module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        colors: true,
        files: ['node_modules/es6-shim/es6-shim.js', 'tests/**/*.ts'],
        frameworks: ['mocha'],
        preprocessors: {
            'tests/**/*.ts': ['webpack', 'sourcemap']
        },
        singleRun: false,
        mime: { 'text/x-typescript': ['ts', 'tsx'] },
        webpack: {
            devtool: 'inline-source-map',
            mode: 'development',
            performance: { hints: false },
            module: {
                rules: [
                    {
                        exclude: [path.resolve(__dirname, 'node_modules')],
                        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'tests')],
                        loader: 'ts-loader',
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                        options: {
                            compilerOptions: {
                                importHelpers: true,
                                noEmitHelpers: true
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.json', '.js'],
                modules: ['node_modules']
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
};
