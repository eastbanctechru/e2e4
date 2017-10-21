var webpack = require("webpack");
var path = require("path");
module.exports = function(config) {
    config.set({
        browsers: ["ChromeNoSandboxHeadless"],
        customLaunchers: {
            ChromeNoSandboxHeadless: {
                base: "Chrome",
                flags: [
                    "--no-sandbox",
                    "--headless",
                    // Without a remote debugging port, Google Chrome exits immediately.
                    " --remote-debugging-port=9222"
                ]
            }
        },
        coverageReporter: {
            dir: "./",
            reporters: [{ type: "lcov", subdir: "coverage" }]
        },
        files: ["node_modules/es6-shim/es6-shim.js", "tests/**/*.ts"],
        frameworks: ["mocha"],
        preprocessors: {
            "src/**/*.js": ["coverage"],
            "tests/**/*.ts": ["webpack", "sourcemap"]
        },
        reporters: ["spec", "coverage"],
        singleRun: true,
        mime: {
            "text/x-typescript": ["ts", "tsx"]
        },
        webpack: {
            devtool: "inline-source-map",
            module: {
                rules: [
                    {
                        exclude: [path.resolve(__dirname, "node_modules")],
                        include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "tests")],
                        loader: "ts-loader",
                        test: /.*(?!\.d\.ts)|(\.ts)$/,
                        options: {
                            compilerOptions: {
                                importHelpers: true,
                                noEmitHelpers: true
                            }
                        }
                    },
                    {
                        include: [path.resolve(__dirname, "src")],
                        enforce: "post",
                        loader: "istanbul-instrumenter-loader",
                        test: /\.ts$/
                    }
                ]
            },
            resolve: {
                extensions: [".ts", ".tsx", ".json", ".js"],
                modules: ["node_modules"]
            }
        },
        webpackServer: {
            noInfo: true,
            noLog: true
        }
    });
};
