'use strict';

var NODE_PATH = global.process.env["NODE_PATH"];

if (NODE_PATH == null) NODE_PATH = "C:\\node_modules"
else NODE_PATH += ";C:\\node_modules";

global.process.env["NODE_PATH"] = NODE_PATH;
require("module").Module._initPaths();



const FS = require('fs');
const Path = require('path');
const intell = require('intell-node');
const colors = intell.colors;

process.chdir('..'); // important



/** @type BuildJob[] */
var jobs = [

    {
        type: 'javascript',
        name: 'intell.js',
        src: [
            'intell/intell.js',
            'intell/intell.controls.js',
            'intell/intell.controls.Listview/ListView.js',
            'intell/intell.controls.Menu/Menu.js',
            'intell/intell.controls.Menu2/Menu2.js',
            'intell/intell.controls.TreeView/TreeView.js',
            'intell/intell.controls.Waiting/Waiting.js',
            'intell/intell.controls.ComboBox2/ComboBox2.js',
            'intell/intell.controls.TargetPopup2/TargetPopup2.js',
        ],
        dest: {
            name: 'intell/intell.js',
            minify: 'intell/intell.min.js',
            sourcemap: 'intell.min.js.map',
            comment: "/*! intell.js | https://github.com/XHighIntell/jintell */"
        }
    },
    {
        type: 'declaration typescript',
        name: 'intell.d.ts',
        src: [
            'intell/intell.d.ts',
            'intell/intell.controls.d.ts',
            'intell/intell.controls.Listview/ListView.d.ts',
            'intell/intell.controls.Menu/Menu.d.ts',
            'intell/intell.controls.Menu2/Menu2.d.ts',
            'intell/intell.controls.TreeView/TreeView.d.ts',
            'intell/intell.controls.Waiting/Waiting.d.ts',
            'intell/intell.controls.ComboBox2/ComboBox2.d.ts',
            'intell/intell.controls.TargetPopup2/TargetPopup2.d.ts',
            
        ],
        dest: {
            name: 'intell/intell.d.ts'
        }
    },
    {
        type: "style sheet",
        name: "intell.css",
        src: [
            'intell/intell.css',
            'intell/intell.controls.Waiting/Waiting.css',
            'intell/intell.controls.ComboBox2/ComboBox2.css',
            'intell/intell.controls.Menu2/Menu2.css',
        ],
        dest: {
            name: "intell/intell.css",
            minify: "intell/intell.min.css"
        }
    },
];

// ==== Portal ====
jobs.push(
    {
        type: "javascript",
        name: 'portal.js',
        src: 'portal/portal.js',
        dest: {
            name: 'portal/portal.js',
            minify: 'portal/portal.min.js',
            sourcemap: 'portal.min.js.map',
            comment: "/*! portal.js | https://github.com/XHighIntell/jintell */"
        }
    },
    {
        type: "declaration typescript",
        name: "portal.d.js",
        src: "portal/portal.d.ts",
        dest: {
            name: "portal/portal.d.ts",
            minify: "portal/portal.min.d.ts"
        }
    },
    {
        type: "style sheet",
        name: "portal.css",
        src: "portal/portal.css",
        dest: {
            name: "portal/portal.css",
            minify: "portal/portal.min.css"
        }
    }
);


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
                var outputPath = Path.resolve(setting.output, job.dest.name);
                var folder = Path.dirname(outputPath)
                intell.IO.Directory.CreateDirectory(folder);
               
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

                intell.IO.Directory.CreateDirectory(Path.dirname(originalPath));
                intell.IO.Directory.CreateDirectory(Path.dirname(minifyPath));
                intell.IO.Directory.CreateDirectory(Path.dirname(sourcemapPath));
                
                FS.writeFileSync(originalPath, code, { encoding: "utf8" });
                FS.writeFileSync(minifyPath, minify_result.code, { encoding: "utf8" });
                FS.writeFileSync(sourcemapPath, minify_result.map, { encoding: "utf8" });
            }

        }
        else if (job.type == "declaration typescript") {
            let outputPath = Path.resolve(setting.output, job.dest.name);

            intell.IO.Directory.CreateDirectory(Path.dirname(outputPath));

            FS.writeFileSync(outputPath, code, { encoding: "utf8" });
        }

        else if (job.type == "style sheet") {
            var outputPath = Path.resolve(setting.output, job.dest.name);
            var folder = Path.dirname(outputPath)
            intell.IO.Directory.CreateDirectory(folder);

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





