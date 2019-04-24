const { src, watch } = require('gulp')
const path = require('path')
const chalk = require('chalk')
const eslint = require('gulp-eslint')
const notifier = require('node-notifier')
const friendlyFormatter = require('eslint-friendly-formatter')
// const stylelint = require('gulp-stylelint');
const stylelint = require('stylelint');
const stylelintFormatter = require('stylelint-formatter-pretty');

function clean (cb) {
  // body omitted
  cb()
}

function jsLint () {
  const jsFiles = [
    'src/**/*.js',
    '!src/libs/*',
  ];
  return src(jsFiles)
    .pipe(eslint({
      quiet: true
    }))
    .pipe(eslint.result(result => {
      result.messages.forEach(item => {
        notifier.notify({
          title: item.ruleId,
          message: `${item.message}\nin ${result.filePath} ${item.line}:${item.column}`,
          icon: path.join(__dirname, 'icon-error.png'), // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: false // Wait with callback, until user action is taken against notification
        })
      })
    }))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError())
}

function wxssLint(done) {
  stylelint.lint({
      files: `${__dirname}/src/**/*.wxss`,
      formatter: stylelintFormatter,
      console: true,
      fix: true,
    })
      .then(function(data) {
        if(data.output) {
          notifier.notify({
            title: 'css with violations',
            message: 'Please check the console',
            icon: path.join(__dirname, 'icon-error.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: false // Wait with callback, until user action is taken against notification
          })
          process.stdout.write(data.output.toString({ colors: true }) + '\n\n');
          console.log(chalk.red('cssLint failed with violations.\n'));
          done();
          // process.exit(1);
        }
        done();
      })
      .catch(function(err) {
        console.error(err.stack);
          done(err);
      });
}

// function wxssLint (cb) {
//   return src('src/**/*.wxss')
//     .pipe(stylelint({
//       fix: true,
//       reporters: [
//         {
//           formatter: stylelintFormatter,
//           console: true
//         }
//       ]
//     }))
// }

function watchFiles () {
  const option = {
    events: 'all',
    ignoreInitial: false
  }
  watch('src/**/*.js', option, jsLint)
  watch('src/**/*.wxss', option, wxssLint)
}

exports.default = watchFiles
