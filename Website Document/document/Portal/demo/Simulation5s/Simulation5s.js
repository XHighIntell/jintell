

!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Simulation Short Loading";
    mainfest.title = "Simulation 5s loading content";
    mainfest.icon = "/Document/Portal/demo/Simulation5s/Simulation5s.svg";
    mainfest.html = "/Document/Portal/demo/Simulation5s/Simulation5s.html";

    app.load = function() {

        hljs.highlightBlock($(app.root).find('code')[0]);

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(app);
            }, 5000);
        });
    };
    

    portal.addApplication(app);
}();