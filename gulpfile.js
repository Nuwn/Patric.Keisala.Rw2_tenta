var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var jadeAtomic = require('jade-atomic');
var rename = require('gulp-rename');
var louis = require('gulp-louis');

gulp.task('jade-html',function(){
  return gulp.src('jade/**/*.jade')
    .pipe(gulpJade({
      jade:jadeAtomic({
        basePath:__dirname,
        fileStructure:'/[module]/[atomic]s/jade/[file].jade'
      }),
      pretty:true
    }))
    .pipe(rename({
          extname: '.php'
    }))
    .pipe(gulp.dest('./components')); 
});
gulp.task('sass', function () {  
    gulp.src('scss/main.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('Error',sass.logError))
        .pipe(gulp.dest('./css/'));
});
gulp.task('default', ['sass', 'jade-html'], function () {  
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('jade/**/*.jade', ['jade-html']);
});

gulp.task('louis', function() {
  louis({
    
    timeout: 60,
    viewport: '1280x1024',
    engine: 'webkit',
    userAgent: 'Chrome/37.0.2062.120',
    noExternals: false,
    performanceBudget: {
      requests: 2,
      medianLatency: 10,
      slowestResponse: 1000
    }
  });
});