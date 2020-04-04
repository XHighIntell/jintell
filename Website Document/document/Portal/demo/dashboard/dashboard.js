!function () {
    var app = new PortalApplication();
    var manifest = app.manifest;

    manifest.id = "dashboard";
    manifest.name = "Dashboard";
    manifest.title = "Dashboard - Summary Report";
    manifest.icon = "dashboard/icon.svg";
    
    manifest.content = {
        html: "dashboard/dashboard.html",
        js: ["/static/lib/highlight.pack.js"],
    }
    manifest.shortcut = true;
    manifest.startup = true;


    app.load = function() {


        intell.get('portal.html').load(function() {
            var code_element = $(app.root).find('[data-file-name="demo.html"]>code')[0];
            code_element.textContent = this.responseText;
            hljs.highlightBlock(code_element);
        }).send();

        intell.get('dashboard/dashboard.js').load(function() {
            var code_element = $(app.root).find('[data-file-name="dashboard.js"]>code')[0];
            code_element.textContent = this.responseText;
            hljs.highlightBlock(code_element);
        }).send();

        
    }

    portal.add(app);
}();
