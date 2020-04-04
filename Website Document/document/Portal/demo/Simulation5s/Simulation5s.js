!function() {
    var app = new PortalApplication();
    var manifest = app.manifest;

    manifest.id = "app_5s"
    manifest.name = "Simulation Short Loading";
    manifest.title = "Simulation 5s loading content";
    manifest.icon = "Simulation5s/Simulation5s.svg";
    manifest.content.html = "Simulation5s/Simulation5s.html";
    manifest.content.js = ["/static/lib/highlight.pack.js"];

    app.load = function() {

        // show this file to html
        intell.get('Simulation5s/Simulation5s.js').load(function() {
            var code_element = $(app.root).find('[data-file-name="Simulation5s/Simulation5s.js"]>code')[0];
            code_element.textContent = this.responseText;
            hljs.highlightBlock(code_element);
        }).send();

        

    };
    

    portal.add(app);
}();