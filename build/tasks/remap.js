var gulp = require('gulp');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

gulp.task('remap', function () {
    return gulp.src('reports/coverage/coverage-final.json')
        .pipe(remapIstanbul({
            reports: {
                'html': '/reports/coverage/html-report'
            }
        }));
});