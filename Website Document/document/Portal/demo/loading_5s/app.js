!function() {
    var app = new PortalApplication();
    var manifest = app.manifest;

    manifest.id = "app_5s"
    manifest.name = "Short Loading";
    manifest.title = "Simulation 5s Loading";
    manifest.description = "Simulation 5s loading content";
    manifest.icon = "loading_5s/icon.svg";
    manifest.content.html = "loading_5s/ui.html";
    manifest.content.js = ["/static/lib/highlight.pack.js"];
    manifest.content.css = ["/static/css/hljs.css"];

    app.load = function() {

        // show this file to html
        intell.get('loading_5s/app.js').load(function() {
            var code_element = $(app.root).find('[data-file-name="loading_5s/app.js"]>code')[0];
            code_element.textContent = this.responseText;
            hljs.highlightBlock(code_element);
        }).send();


        return new Promise(function(resolve) {
            setTimeout(resolve, 5000);
        })
    };
    

    portal.add(app);
}();