module.exports = new function() {
    this.reset = '\x1b[0m';
    this.fg = function(number) {
        return '\x1b[38;5;' + number + 'm';
    };
    this.bg = function(number) {
        return '\x1b[48;5;' + number + 'm';
    }

}();




//
//console.log("done in " + colors.fg(128) + "4.5ms" + colors.reset);
//process.stdout.write("Starting '" + colors.fg(39) + 'development' + colors.reset + "'... ");
//console.log("done in " + colors.fg(128) + "4.5ms" + colors.reset);
//
//process.stdout.write("Starting '" + colors.fg(39) + 'intell.js' + colors.reset + "'... ");
//console.log("done in " + colors.fg(128) + "4.5ms" + colors.reset);

//setTimeout(function() { }, 20000);






