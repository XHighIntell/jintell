

!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Example Application";
    mainfest.title = "A demo for simple Portal Application";
    mainfest.icon = "ExampleApplication/app.svg";
    mainfest.html = "ExampleApplication/example.html";
    mainfest.js = ["/static/lib/highlight.pack.js"];
    
    app.load = function() {
        hljs.highlightBlock($(app.root).find('code')[0]);
    };

    portal.addApplication(app);
}();