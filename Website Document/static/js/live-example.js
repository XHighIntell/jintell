!function () {
    function countSpace(line) {
        var count = 0;
        for (var i = 0; i < line.length; i++) {
            if (line[i] == ' ') count++;
            else return count;
        }
        return count;
    }
    window.trimCode = function (input) {
        var lines = input.split('\n');
        var x;


        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var count = countSpace(line);
            if (count == line.length) {
                //lines.splice(i, 1);
                //i--;
            } else {
                if (x == undefined) x = ' '.repeat(count);
                lines[i] = line.replace(x, '');
            }
        }

        return lines.join('\n').trim();
    }
}();


//data-code-name
//data-code-ref

var liveexample = new function () {

    /**
     * Concat all innerHTML of selector and write them to target.
     * @param {string | HTMLElement} toElement
     * @param {string} selector
     */
    this.write = function (toElement, selector) {
        
        var $to = $(toElement);
        var $from = $(selector);

        var html = '';
        $from.each(function () { html += this.innerHTML });

        $to[0].textContent = trimCode(html);
        
        hljs.highlightBlock($to[0]);
    }
    /** Find all elements have attribute "data-code-ref", and put their content to element has attribute "data-code-name". */
    this.auto = function () {
        $('*[data-code-name]').each(function () {
            var codeName = this.getAttribute('data-code-name');
            liveexample.write(this, '*[data-code-ref="' + codeName + '"]');
        })
    }

}();
















