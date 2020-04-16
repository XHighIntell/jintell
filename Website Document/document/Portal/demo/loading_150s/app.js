!function() {
    var application = new PortalApplication();
    var manifest = application.manifest;

    manifest.id = "loading_150s";
    manifest.name = "Loading";
    manifest.title = "Simulation 150s loading content";
    manifest.description = "Simulation 150s loading content";
    manifest.icon = "loading_150s/hourglass.svg";
    manifest.content.html = "loading_150s/app.html";

    application.load = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(application);
            }, 150000);
        });
    }

    portal.add(application);
}();
