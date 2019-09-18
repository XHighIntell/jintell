# Intell Javascript
jIntell is a JavaScript library designed to simplify using many controls while write HTML. This project is a part of X High Intell for private use only, so updates or modifies can change whole structure.

## Documentation
You can find more documents & examples on [jintell.xhighintell.com](http://jintell.xhighintell.com/)

## Build
Our target is web platform, so you can use without build:
- src\intell.js
- src\intell.controls.js 
- src\portal.js

Or you can run `production.cmd` to build:
- `output\production\intell.min.js` = `src\intell.controls.js`+ `src\intell.js`
- `output\production\portal.min.js` = `src\portal.js`

In order to run `production.cmd` bundle & compress jintell, you need to install NodeJs with the following components: 

- [x] gulp
- [x] gulp-concat
- [x] gulp-uglify
- [x] gulp-sourcemaps

 babel may need if you want to write next generation JavaScript
