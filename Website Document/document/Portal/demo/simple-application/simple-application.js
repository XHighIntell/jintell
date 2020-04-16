

!function() {
    var app = new PortalApplication();
    var manifest = app.manifest;

    manifest.id = "simple-application";
    manifest.name = "Example";
    manifest.title = "A demo for simple Portal Application";
    manifest.icon = "simple-application/app.svg";
    manifest.content.html = "simple-application/simple-application.html";
    manifest.content.js = ["/static/lib/highlight.pack.js"];
    manifest.content.css = ["/static/css/hljs.css"];

    app.load = function() {
        hljs.highlightBlock($(app.root).find('code')[0]);
    };
    /** @type Portal */
    var portal = window.portal;

    portal.add(app);
}();