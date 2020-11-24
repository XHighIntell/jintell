'use strict';

const FS = require('fs');
const Path = require('path');
const intell = require('intell-nodejs');
const colors = intell.colors;

process.chdir('..');


/** @type BuildJob[] */
var jobs = [

    {
        type: 'javascript',
        name: 'intell.js',
        src: [
            'intell.js',
            'intell.controls.js',
            'intell.controls/Menu.js',
            'intell.controls/Menu2.js',
            'intell.controls/TreeView.js',
            'intell.controls/Waiting.js',
            'intell.controls/ListView.js',
        ],
        dest: {
            name: 'intell.js',
            minify: 'intell.min.js',
            sourcemap: 'intell.min.js.map',
            comment: "/*! intell.js | https://github.com/XHighIntell/jintell */"
        }
    },

    {
        type: 'declaration typescript',
        name: 'intell.d.ts',
        src: [
            'intell.d.ts',
            'intell.controls.d.ts',
            'intell.controls/Menu.d.ts',
            'intell.controls/Menu2.d.ts',
            'intell.controls/TreeView.d.ts',
            'intell.controls/Waiting.d.ts',
            'intell.controls/ListView.d.ts',
        ],
        dest: { name: 'intell.d.ts' }
    },


    {
        type: "javascript",
        name: 'portal.js',
        src: 'portal.js',
        dest: {
            name: 'portal.js',
            minify: 'portal.min.js',
            sourcemap: 'portal.min.js.map',
            comment: "/*! portal.js | https://github.com/XHighIntell/jintell */"
        }
    },

    {
        type: "declaration typescript",
        name: "portal.d.js",
        src: "portal.d.ts",
        dest: {
            name: "portal.d.ts",
            minify: "portal.min.d.ts"
        }
    },


];

!function() {
    /** @type BuildArgumentsObject */
    var args = intell.createArgumentsObject();
    
    var setting = {
        mode: args.mode, // development | production
        input: 'src',
        output: args.output,
    }


    console.log("build target = '" + colors.fg(226) + setting.mode + colors.reset + "'");
    console.log("build output = '" + Path.resolve(setting.output) + "'");
    console.log();


    jobs.forEach(function (job, index) {

        process.stdout.write((index + 1).toString().padStart(2) + '. build ' + colors.fg(39) + job.name + colors.reset + '... ');

        var current_time = Date.now();
        var code = '';
        var src_files = (Array.isArray(job.src) == true ? job.src : [job.src]);

        src_files.forEach(function (value) {
            code += FS.readFileSync(Path.resolve(setting.input, value), { encoding: "utf8" });
        });
        
        if (job.type == "javascript") {
            if (setting.mode == "development") {
                let outputPath = Path.resolve(setting.output, job.dest.name);

                FS.writeFileSync(outputPath, code, { encoding: "utf8" });
            }
            else {
                const Babel = require("babel-core");
                const Uglifyjs = require("uglify-js");



                var result = Babel.transform(code, {
                    "presets": [
                        ["env"]
                    ],
                    sourceMaps: true,
                    sourceFileName: job.dest.name,
                });

                

                var minify_result = Uglifyjs.minify(result.code, {
                    output: {
                        comments: function(node, comment) {
                            return comment.value.indexOf('github.com') != -1;
                        }
                    },
                    sourceMap: {
                        content: result.map,
                        url: job.dest.sourcemap,
                    }
                });

                if (minify_result.error) throw minify_result;

                var originalPath = Path.resolve(setting.output, job.dest.name);
                var minifyPath = Path.resolve(setting.output, job.dest.minify);
                var sourcemapPath = Path.resolve(setting.output, job.dest.sourcemap);


                FS.writeFileSync(originalPath, code, { encoding: "utf8" });
                FS.writeFileSync(minifyPath, minify_result.code, { encoding: "utf8" });
                FS.writeFileSync(sourcemapPath, minify_result.map, { encoding: "utf8" });
            }

        }
        else if (job.type == "declaration typescript") {
            let outputPath = Path.resolve(setting.output, job.dest.name);

            FS.writeFileSync(outputPath, code, { encoding: "utf8" });
        }
        else {
            throw "not support '" + job.type + "'type";
        }



        console.log("done in " + colors.fg(128) + (Date.now() - current_time) + "ms" + colors.reset);

    });


    // args.mode
    console.log("\r\nAll Done!");
}();




