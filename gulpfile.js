var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var lrload = require('livereactload');
var babelify = require('babelify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
// var uglify = require('gulp-uglify');
var watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

var bundler = browserify({
  entries:      [ "./app/app.js" ],
  transform:    [ babelify ],
  plugin:       production ? [] : [ lrload ],
  debug:        !production,
  cache:        {}, // for watchify
  packageCache: {}, // for watchify
  fullPaths:    !production // for watchify
});

var build = function(watch) {
  if(watch) {
    bundler = watchify(bundler);
  }

  var rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', function (err) {
      console.log('Error with Browserify:', err);
    });
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./public/js'));
  };

  bundler.on('update', rebundle);
  return rebundle();
};

gulp.task('clean:js', function() {
  del(['./public/js/*']);
});

gulp.task('clean:css', function() {
  del(['./public/css/*']);
});

gulp.task('clean:fonts', function() {
  del(['./public/fonts/*']);
});

gulp.task('font-awesome:fonts', ['clean:fonts'], function() {
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', ['clean:css'], function() {
  gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));

  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build:js', ['clean:js'], function() {
  return build(false);
});

gulp.task('watch:js', ['clean:js'], function() {
  return build(true);
});

gulp.task('serve', ['watch:js', 'css', 'font-awesome:fonts'], function() {
  gulp.watch('sass/*.scss', ['css']);
  return require('gulp-nodemon')({
    exec: 'node-inspector --web-port=8081 & node --debug',
    ext: 'js',
    script: './server/server.js',
    ignore: ["gulpfile.js", "bundle.js", "node_modules/*", "app/components/*"]
  });
});

gulp.task('build', ['build:js', 'css', 'font-awesome:fonts'], function() {
  return;
});
