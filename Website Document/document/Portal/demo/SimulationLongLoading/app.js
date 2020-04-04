!function() {
    var application = new PortalApplication();
    var manifest = application.manifest;

    manifest.id = "app_150s";
    manifest.name = "Simulation Long Loading";
    manifest.title = "Simulation 150s loading content";
    manifest.description = "Simulation 150s loading content";
    manifest.icon = "SimulationLongLoading/hourglass.svg";
    manifest.content.html = "SimulationLongLoading/app.html";

    application.load = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(application);
            }, 150000);
        });
    }
    

    portal.add(application);
       
}();