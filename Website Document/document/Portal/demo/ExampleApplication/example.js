

!function() {
    var app = new PortalApplication();
    var manifest = app.manifest;

    manifest.id = "simple-application";
    manifest.name = "Example Application";
    manifest.title = "A demo for simple Portal Application";
    manifest.icon = "ExampleApplication/app.svg";
    manifest.content.html = "ExampleApplication/example.html";
    manifest.content.js = ["/static/lib/highlight.pack.js"];
    
    app.load = function() {
        hljs.highlightBlock($(app.root).find('code')[0]);
    };

    portal.add(app);
}();