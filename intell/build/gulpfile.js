const Gulp = require('gulp');
Gulp.rename = require('./Gulp.rename.js');
const concat = require('gulp-concat');
const Path = require('path');
const uglify = require('gulp-uglify');
const SourceMaps = require('gulp-sourcemaps');
const FileStream = require('fs');
const util = require('util');
const copyFilePromise = util.promisify(FileStream.copyFile); // return promise




var __dirsrc = Path.resolve(__dirname, "../src");
var __dirout = Path.resolve(__dirname, "../output");

//console.log(global);



function build(option) {
    var mode = option.mode; // development or production
    var output = Path.resolve(__dirname, option.output); 


    Gulp.task('intell.js', function() {
        //console.log('1. concat "intell.js" + "intell.controls.js"');
        //console.log('2. concat "intell.d.ts" + "intell.controls.d.ts"');

        var stream = Gulp.src([__dirsrc + '/intell.js', __dirsrc + '/intell.controls.js']);


        if (mode == 'development') stream = stream.pipe(concat('intell.js', { newLine: '\r\n' })).pipe(Gulp.dest(output));
        else {
            stream = stream.pipe(SourceMaps.init()).pipe(concat('intell.min.js')).pipe(uglify()).pipe(SourceMaps.write('')).pipe(Gulp.dest(output));
        }


        return stream;
    });
    Gulp.task('intell.d.ts', function() {
        return new Promise(function(resolve, reject) {
            var stream = Gulp.src([__dirsrc + '/intell.d.ts', __dirsrc + '/intell.controls.d.ts']);

            if (mode == 'development') stream = stream.pipe(concat('intell.d.ts', { newLine: '\r\n' }));
            else stream = stream.pipe(concat('intell.min.d.ts', { newLine: '\r\n' }));

            stream = stream.pipe(Gulp.dest(output));
                    

            stream.on('end', function() { resolve(); });
            stream.on('error', function() { reject(); });

            return stream;
        });
    });


    Gulp.task('portal.js', function() {
        // just copy from src to ..
        if (mode == 'development') {
            return copyFilePromise(__dirsrc + '/portal.js', output + '/portal.js');
        }
        else {
            return stream = Gulp.src([__dirsrc + '/portal.js'])
                .pipe(SourceMaps.init())
                .pipe(uglify())
                .pipe(Gulp.rename('portal.min.js'))
                .pipe(SourceMaps.write(''))
                .pipe(Gulp.dest(output));
        }
        
    });
    Gulp.task('portal.d.ts', function() {
        if (mode == 'development')
             return copyFilePromise(__dirsrc + '/portal.d.ts', output + '/portal.d.ts');
        else return copyFilePromise(__dirsrc + '/portal.d.ts', output + '/portal.min.d.ts');
    });


    Gulp.task('Copy to Website 2', function() {
        var __website = Path.resolve(__dirname, "../../Website Document");

        if (mode == 'development') {

            return Promise.all([

                copyFilePromise(output + '/intell.js', __website + '/static/lib/intell.js'),
                copyFilePromise(output + '/intell.d.ts', __website + '/static/lib/intell.d.ts'),

                copyFilePromise(output + '/portal.js', __website + '/static/lib/portal.js'),
                copyFilePromise(output + '/portal.d.ts', __website + '/static/lib/portal.d.ts'),

            ]);

        } else {

            return Promise.all([

                copyFilePromise(output + '/intell.min.js',     __website + '/static/lib/intell.min.js'),
                copyFilePromise(output + '/intell.min.js.map', __website + '/static/lib/intell.min.js.map'),
                copyFilePromise(output + '/intell.min.d.ts',   __website + '/static/lib/intell.min.d.ts'),

                copyFilePromise(output + '/portal.min.js',     __website + '/static/lib/portal.min.js'),
                copyFilePromise(output + '/portal.min.js.map', __website + '/static/lib/portal.min.js.map'),
                copyFilePromise(output + '/portal.min.d.ts',   __website + '/static/lib/portal.min.d.ts'),

            ]);

        }
    });

    console.log();
    return new Promise(function(resolve, reject) {
        Gulp.series(
            Gulp.task('intell.js'),
            Gulp.task('intell.d.ts'),

            Gulp.task('portal.js'),
            Gulp.task('portal.d.ts'),

            Gulp.task('Copy to Website 2')
        )(resolve);
    });
}


module.exports.production = function() { return build({ mode: 'production', output: '../output/production' }) };
module.exports.development = function() { return build({ mode: 'development', output: '../output/development' }) };

module.exports.default = module.exports.development;





