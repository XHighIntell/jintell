

!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Example Application";
    mainfest.title = "A demo for simple Portal Application";
    mainfest.icon = "/Document/Portal/demo/ExampleApplication/app.svg";
    mainfest.html = "/Document/Portal/demo/ExampleApplication/example.html";
    mainfest.js = ["/static/lib/highlight.pack.js"];
    
    app.load = function() {
        hljs.highlightBlock($(app.root).find('code')[0]);
    };
    

    portal.addApplication(app);
}();