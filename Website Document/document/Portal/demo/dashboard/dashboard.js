!function () {
    var app = new PortalApplication();
    var mainfest = app.mainfest;

    mainfest.name = "Dashboard";
    mainfest.title = "Dashboard - Summary Report";
    mainfest.icon = "dashboard/icon.svg";
    mainfest.html = "dashboard/dashboard.html";
    mainfest.js = ["/static/lib/highlight.pack.js"];
    mainfest.pinned = true;
    mainfest.startup = true;


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

    portal.addApplication(app);    
}();
