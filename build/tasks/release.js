var gulp = require('gulp');
var runSequence = require('run-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');
var conventionalRecommendedBump = require('conventional-recommended-bump');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var releaseAs = '';

gulp.task('github-release', function (done) {
    conventionalGithubReleaser({ type: 'oauth' }, { preset: 'angular' }, done);
});

gulp.task('get-bump', function () {
    conventionalRecommendedBump({ preset: 'angular' }, function (err, result) {
        releaseAs = result.releaseAs;
    });
});

gulp.task('bump-version', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: releaseAs }).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('write-changelog', function () {
    return gulp.src('CHANGELOG.md', { buffer: false })
        .pipe(conventionalChangelog({ preset: 'angular' }))
        .pipe(gulp.dest('./'));
});

gulp.task('release', function (callback) {
    runSequence(
        'get-bump',
        'bump-version',
        'write-changelog',
        // 'commit-changes',
        // 'push-changes',
        // 'create-new-tag',
        // 'github-release',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});