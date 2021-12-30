// Define variables.
const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync').create();
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const del          = require('del');
const gulp         = require('gulp');
const gutil        = require('gulp-util');
const imagemin     = require('gulp-imagemin');
const notify       = require('gulp-notify');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const exec         = require('child_process').exec;
const runSequence  = require('run-sequence');
const sass         = require('gulp-ruby-sass');
const uglify       = require('gulp-uglify');

// Include paths file.
const paths = require('./_assets/gulp_config/paths');

// Processes SCSS.
gulp.task('build:styles:main', function() {
  // Compile SCSS, run autoprefixer, and minify CSS.
    return sass(paths.sassFiles + '/main.scss', {
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Builds all styles.
gulp.task('build:styles', gulp.series('build:styles:main'));

// Deletes CSS.
gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles + 'main.css',
        paths.siteCssFiles + 'main.css']);
    callback();
});

// Processes JS.
gulp.task('build:scripts', function() {
  // Concatenate and uglify JS.
    return gulp.src([
        paths.jsFiles + '/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});

// Deletes processed JS.
gulp.task('clean:scripts', function(callback) {
    del([paths.jekyllJsFiles, paths.siteJsFiles]);
    callback();
});

// Optimizes images.
gulp.task('build:images', function() {
  // Run imagemin.
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

// Copy icons
gulp.task('build:icons', function() {
    return gulp.src(paths.iconFilesGlob)
        .pipe(gulp.dest(paths.jekyllIconFiles))
        .pipe(gulp.dest(paths.siteIconFiles))
        .on('error', gutil.log)
});

// Deletes processed images.
gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});

// Runs jekyll build command.
gulp.task('build:jekyll', function(callback) {
  // Run bundle exec jekyll build with appropriate config file.
    var shellCommand = 'bundle exec jekyll build';
    return exec(shellCommand, callback);
});

// Deletes the entire _site directory.
gulp.task('clean:jekyll', function(callback) {
    del(['_site']);
    callback();
});

// Main clean task.
// Deletes _site directory and processed assets.
gulp.task('clean', gulp.series('clean:jekyll',
    'clean:images',
    'clean:scripts',
    'clean:styles'));

// Builds site anew.
gulp.task('build', gulp.series('build:scripts', 'build:images', 'build:styles',
    'build:icons', 'build:jekyll', function(callback) {callback()}));

// Default Task: builds site.
gulp.task('default', gulp.series('build'));
