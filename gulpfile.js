const concat = require('gulp-concat')
const gulp = require('gulp')
const iife = require("gulp-iife")
const templateCache = require('gulp-angular-templatecache')
const controllers = './src/components/**/**.js'
const service = './src/services/**/**.js'
const config = './src/config/**.js'
const templates = './src/components/**/**.html'
const app = './src/index.js'
const plug = require('gulp-load-plugins')()
const browserify = require('gulp-browserify')
const rename = require("gulp-rename")
const template = './src/templates.js'
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const babel = require('gulp-babel');

gulp.task('clean', () =>
    gulp.src([ app, template, "./build/*"])
        .pipe(clean())
)

gulp.task('iife', function () {
    return gulp.src([app, template , config, service, controllers])
       .pipe(babel({
        presets: ['env']
       }))
      .pipe(iife())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./build'))
})

gulp.task('template',  function () {
    return gulp.src(templates)
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./src'))
})

gulp.task('browserify', function() {
  // Single entry point to browserify
  return gulp.src('./src/app.js')
      /*.pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))*/
      .pipe(rename('index.js'))
      .pipe(gulp.dest('./src/'))
});
 
gulp.task('index', function() {
	const target = gulp.src('./src/index.html')
	const sources = gulp.src(['./build/*.js', './build/*.css'])
	
	return target.pipe(plug.inject(sources, {relative: true}))
		.pipe(gulp.dest('./build'))
});

gulp.task('default', () =>  runSequence([ 'browserify', 'template', 'iife', 'index']))