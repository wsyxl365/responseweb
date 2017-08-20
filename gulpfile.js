/**
 * Created by Administrator on 2017/8/19 0019.
 */
var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");



gulp.task("default",["images"],function(){
    var jsFilter = filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

    return gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('images',function() {
     return gulp.src('src/img/**/*')
       .pipe(gulp.dest('dist/img'))
});


