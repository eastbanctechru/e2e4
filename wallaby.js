var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
    return {
        files: [
            { pattern: 'node_modules/babel-es6-polyfill/browser-polyfill.js', instrument: false, load: true },
            { pattern: 'src/**/*.ts', load: false },
            { pattern: 'src/**/*.d.ts', ignore: true }
        ],

        tests: [
            { pattern: 'tests/**/*.ts', load: false }
        ],

        preprocessors: {
            '**/*.js*': function(file) { return babel.transform(file.content, {stage: 2, loose: "all",
                optional: [
                    "es7.decorators",
                    "es7.classProperties"
                ]}) }
        },

        postprocessor: webpackPostprocessor,
        env: {
            type: 'browser',
            runner: require('phantomjs-prebuilt').path,
            params: {
                runner: '--web-security=false'
            }
        },

        testFramework: 'mocha@2.2.4',

        bootstrap: function() {
            window.__moduleBundler.loadTests();
        },
        debug: true
    };
};