const { src, watch } = require('gulp');
const eslint = require('gulp-eslint');
const friendlyFormatter = require('eslint-friendly-formatter');

function jsLint() {
  const jsFiles = [
    'src/**/*.js',
    '!src/libs/*',
  ];
  return src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError());
}

function wxssLint() {
}

function wxmlLint() {
}

function watchFiles() {
  const option = {
    events: 'all',
    ignoreInitial: false,
  };
  watch('src/**/*.js', option, jsLint);
}

exports.default = watchFiles;
