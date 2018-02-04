var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
    return {
        files: [
            { pattern: 'node_modules/es6-shim/es6-shim.js', instrument: false, load: true },
            { pattern: 'src/**/*.ts', load: false },
            { pattern: 'src/**/*.d.ts', ignore: true }
        ],

        tests: [{ pattern: 'tests/**/*.ts', load: false }],

        postprocessor: webpackPostprocessor,
        env: {
            type: 'browser',
            params: {
                runner: '--web-security=false'
            }
        },

        testFramework: 'mocha@5.0.0',

        bootstrap: function() {
            window.__moduleBundler.loadTests();
        },
        debug: true
    };
};
