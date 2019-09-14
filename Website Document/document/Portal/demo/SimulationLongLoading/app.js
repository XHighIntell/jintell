ssss = document.currentScript;


!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Simulation Long Loading";
    mainfest.title ="Simulation 150s loading content";
    mainfest.icon = "SimulationLongLoading/hourglass.svg";
    mainfest.html = "SimulationLongLoading/app.html";

    app.load = function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(app);
            }, 150000);
        });
    }
    

    portal.addApplication(app);

    $(app.shortcut).addClass('app4')
    
    
}();