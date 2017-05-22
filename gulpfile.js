// Plugins
var 
gulp = require('gulp'), 
uglify = require('gulp-uglify');

// Config
var path = {};
path.scripts = 'assets/js/';

gulp.task('minify-js', function () {
    gulp.src(path.scripts+'*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min'));
});