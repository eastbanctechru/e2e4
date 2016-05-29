var gulp = require('gulp');
var Server = require('karma').Server;
var isVerbose = true;

/**
 * Run test once and exit
 */
gulp.task('test-single-run', function (done) {
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
        client: { captureConsole: isVerbose },
        browsers: ['PhantomJS'],
        singleRun: true
    }, done).start();
});