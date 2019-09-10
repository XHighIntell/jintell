const Path = require('path');
const FileStream = require('fs');
const util = require('util');
const Gulp = require('gulp');

Gulp.rename = require('./Gulp.rename.js');
Gulp.concat = require('gulp-concat');
Gulp.uglify = require('gulp-uglify');
Gulp.sourceMaps = require('gulp-sourcemaps');

const colors = require('./colors.js');
const copyFilePromise = util.promisify(FileStream.copyFile); // return promise
//----------------------------------------------------------

var __dirsrc = Path.resolve(__dirname, "../src");


async function build(option) {
    
    var mode = option.mode;
    var __dirout = Path.resolve(__dirname, option.output);

    if (mode != 'development' && mode != 'production') throw "mode must be 'development' or 'production'.";
    console.log("build target = '" + colors.fg(226) + mode + colors.reset + "' ");
    console.log("build output = '" + __dirout + "' ");
    console.log();


    var all = {};
    all['intell.js'] = function() {
        var filename;

        if (mode == 'development') filename = 'intell.js';
        else                       filename = 'intell.min.js';

        process.stdout.write('build ' + colors.fg(39) + filename + colors.reset + '... ');


        return new Promise(function(resolve, reject) {
            var stream = Gulp.src([__dirsrc + '/intell.js', __dirsrc + '/intell.controls.js']);

            if (mode == 'development') {
                stream = stream.pipe(Gulp.concat(filename, { newLine: '\r\n' }));
            } else {
                stream = stream.pipe(Gulp.sourceMaps.init()).pipe(Gulp.concat(filename)).pipe(Gulp.uglify()).pipe(Gulp.sourceMaps.write(''));
            }
            stream = stream.pipe(Gulp.dest(__dirout));


            stream.on('end', function() { resolve(); });
            stream.on('error', function() { reject(); });
        });
    };

    all['intell.d.ts'] = function() {
        var filename;

        if (mode == 'development') filename = 'intell.d.ts';
        else                       filename = 'intell.min.d.ts';

        process.stdout.write('copy ' + colors.fg(39) + filename + colors.reset + '... ');

        return new Promise(function(resolve, reject) {
            var stream = Gulp.src([__dirsrc + '/intell.d.ts', __dirsrc + '/intell.controls.d.ts'])
                .pipe(Gulp.concat(filename, { newLine: '\r\n' }))
                .pipe(Gulp.dest(__dirout));

            stream.on('end', function() { resolve(); });
            stream.on('error', function() { reject(); });
        });
    };

    all['portal.js'] = function() {
        var filename;

        if (mode == 'development') filename = 'portal.js';
        else                       filename = 'portal.min.js';


        process.stdout.write('build ' + colors.fg(39) + filename + colors.reset + '... ');

        if (mode == 'development') return copyFilePromise(__dirsrc + '/portal.js', __dirout + '/portal.js');
        else {
            return new Promise(function(resolve, reject) {
                var stream = Gulp.src([__dirsrc + '/portal.js'])
                    .pipe(Gulp.sourceMaps.init())
                    .pipe(Gulp.uglify())
                    .pipe(Gulp.rename('portal.min.js'))
                    .pipe(Gulp.sourceMaps.write(''))
                    .pipe(Gulp.dest(__dirout));

                stream.on('end', function() { resolve(); });
                stream.on('error', function() { reject(); });
            });
        }
    };

    all['portal.d.ts'] = function() {
        var filename;

        if (mode == 'development') filename = 'portal.d.ts';
        else                       filename = 'portal.min.d.ts';

        process.stdout.write('copy ' + colors.fg(39) + filename + colors.reset + '... ');

        return copyFilePromise(__dirsrc + '/portal.d.ts', __dirout + '/' + filename);
    };

    all['copy'] = function() {
        process.stdout.write('copy to website... ');

        var __website = Path.resolve(__dirname, "../../Website Document");

        if (mode == 'development') {

            return Promise.all([

                copyFilePromise(__dirout + '/intell.js', __website + '/static/lib/intell.js'),
                copyFilePromise(__dirout + '/intell.d.ts', __website + '/static/lib/intell.d.ts'),

                copyFilePromise(__dirout + '/portal.js', __website + '/static/lib/portal.js'),
                copyFilePromise(__dirout + '/portal.d.ts', __website + '/static/lib/portal.d.ts'),

            ]);

        } else {

            return Promise.all([

                copyFilePromise(__dirout + '/intell.min.js', __website + '/static/lib/intell.min.js'),
                copyFilePromise(__dirout + '/intell.min.d.ts', __website + '/static/lib/intell.min.d.ts'),
                copyFilePromise(__dirout + '/intell.min.js.map', __website + '/static/lib/intell.min.js.map'),

                copyFilePromise(__dirout + '/portal.min.js', __website + '/static/lib/portal.min.js'),
                copyFilePromise(__dirout + '/portal.min.d.ts', __website + '/static/lib/portal.min.d.ts'),
                copyFilePromise(__dirout + '/portal.min.js.map', __website + '/static/lib/portal.min.js.map'),

            ]);

        }
    }

    var tasks = [];
    tasks.push(all['intell.js']);
    tasks.push(all['intell.d.ts']);
    //tasks.push(all['portal.js']);
    //tasks.push(all['portal.d.ts']);
    tasks.push(all['copy']);

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var x = Date.now();

        process.stdout.write((i + 1) + '. ');
        await task();
        console.log("done in " + colors.fg(128) + (Date.now() - x) + "ms" + colors.reset);
    }
  

    console.log('All done!');
}

var argv = require('yargs-parser')(process.argv.slice(2))
build({ mode: argv.mode, output: argv.output });








//console.log(__filename);
//console.log(process);




//setTimeout(function() { }, 20000);






