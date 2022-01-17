interface BuildArgumentsObject {
    mode: 'development' | 'production';
    output: string;
}


type BuildJob = {
    type: 'javascript',
    name: string,
    src: ['intell.js', 'intell.controls.js']
    dest: {
        name: 'intell.js',
        minify: 'intell.min.js',
        sourcemap: 'intell.min.js.map',
        sourcemapUrl: 'intell.min.js.map',
    }
} | {
    type: 'declaration typescript',
    name: string,
    src: ['intell.d.ts', 'intell.controls.d.ts']
    dest: {
        name: 'intell.d.ts',
        minify: 'intell.min.d.ts',
    }
} | {
    type: 'style sheet',
    name: string,
    src: ['portal.css']
    dest: {
        name: 'portal.css',
        minify: 'portal.min.css',
    }
};