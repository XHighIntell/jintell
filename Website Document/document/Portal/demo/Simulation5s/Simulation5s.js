!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Simulation Short Loading";
    mainfest.title = "Simulation 5s loading content";
    mainfest.icon = "Simulation5s/Simulation5s.svg";
    mainfest.html = "Simulation5s/Simulation5s.html";

    app.load = function() {

        // show this file to html
        intell.get('Simulation5s/Simulation5s.js').load(function() {
            var code_element = $(app.root).find('[data-file-name="Simulation5s/Simulation5s.js"]>code')[0];
            code_element.textContent = this.responseText;
            hljs.highlightBlock(code_element);
        }).send();

        

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(app);
            }, 5000);
        });
    };
    

    portal.addApplication(app);
}();