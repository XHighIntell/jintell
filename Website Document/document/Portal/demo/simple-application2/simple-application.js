

!function() {
    var manifest = {
        id: "simple-application2",
        name: "Example addManifest",
        title: "A demo for simple Portal Application",
        icon: "simple-application2/app.svg",
        content: {
            html: "simple-application2/simple-application.html",
            js: ["/static/lib/highlight.pack.js"],
            css: ["/static/css/hljs.css"]
        }
    }

    //** @type Portal */
    //var portal = window.portal;
    portal.addManifest(manifest, function(application) {
        hljs.highlightBlock($(application.root).find('code')[0]);

        return new Promise(function(resolve, reject) {
            setTimeout(resolve, 2000);
        })
    });
}();