var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
useref = require('gulp-useref'),
gulpif = require('gulp-if'),
uglify = require('gulp-uglify'),
minifyCss = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
lazypipe = require('lazypipe'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache');



gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  	.pipe(cache(imagemin({
      interlaced: true
    })))
  	.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('app/font/**/*')
  .pipe(gulp.dest('dist/font'))
})
gulp.task('viewsbuild', function() {
  return gulp.src('app/js/**/*.html')
  .pipe(gulp.dest('dist/views'))
})
gulp.task('views', function() {
  return gulp.src('app/js/**/*.html')
  .pipe(gulp.dest('app/views'))
})

gulp.task('useref', function(){

 	return gulp.src('app/*.html')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
        .pipe(sourcemaps.write('maps'))
        //.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
	      stream: true
	    }))
});

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('build', [ 'sass', 'useref', 'images', 'fonts','viewsbuild'], function (){
  console.log('Building files');
})
gulp.task('watch', ['browserSync'],function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch(['app/css/**/*.css','app/js/**/*.js'],['useref']);
	gulp.watch(['app/js/**/*.html'],['views']);
	gulp.watch('app/*.html', browserSync.reload);
})

