const concat = require('gulp-concat')
const gulp = require('gulp')
const iife = require("gulp-iife")
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const babel = require('gulp-babel');
const plug = require('gulp-load-plugins')()
const replace = require('gulp-replace')
const browserify = require('gulp-browserify')
const rename = require('gulp-rename')
const templateCache = require('gulp-angular-templatecache')
const autoPrefixer  = require('gulp-autoprefixer')
const sass = require('gulp-sass')

const clientFiles = ['./src/client/app.js', './src/client/components/**/**.js', './src/client/config/**.js', './src/client/services/**.js']

var sassFiles = 'src/**/*.scss'
const templates = './src/client/**/**.html'
const interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments)
  
    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args)
  
    // Keep gulp from hanging on this task
    this.emit('end')
}
const public = {
    css: './src/client/vendors/css/**.css',
    js: './src/client/vendors/js/**.js',
    iife: './src/client/vendors/iife/**.js'
}
const server = { 
    js: './src/server/index.js',
    html: './src/client/index.html'
}

gulp.task('clean', () => 
    gulp.src('./dist/**')
        .pipe(clean())
)

gulp.task('main',  () =>
    gulp.src(clientFiles)
      .pipe(iife())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./dist/public/js'))
)

gulp.task('template', () =>
    gulp.src(templates)
        .pipe(templateCache({
            transformUrl: function(url) {
                return url.replace(/components\//, '')
            },
            standalone: true
        }))
        .pipe(iife())
        .pipe(gulp.dest('./dist/public/js'))
)

gulp.task('server-index-js', () => 
    gulp.src(server.js).pipe(gulp.dest('./dist/server'))
)

gulp.task('vendor:css', () =>
    gulp.src(public.css)
        .pipe(gulp.dest('./dist/public/css'))
)

gulp.task('vendor:js', () =>
    gulp.src(public.js)
        .pipe(gulp.dest('./dist/public/js'))
)

gulp.task('vendor:iife', () =>
    gulp.src(public.iife)
        .pipe(gulp.dest('./dist/public/iife'))
)

gulp.task('public', ['vendor:js', 'vendor:css', 'vendor:iife', 'sass'])

gulp.task('inject', () => {
    const target = gulp.src('./src/client/index.html')
	const sources = gulp.src(['./dist/public/iife/**.js', './dist/public/js/**.js', './dist/public/css/**.css'])
    return target.pipe(plug.inject(sources), {read: false})
        .pipe(replace('/dist/public', ''))
        .pipe(gulp.dest('./dist/server'))
})

gulp.task('sass', () =>
    gulp.src('./src/client/vendors/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/public/css'))
)


gulp.task('default', function() {
    return runSequence( 'public', 'template', 'main', 'server-index-js', 'inject', () => console.log('done'))
})
