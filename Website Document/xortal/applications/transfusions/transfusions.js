

!function() {

    var pathname = new URL(document.currentScript.src).pathname;
    var pathfolder = pathname.substr(0, pathname.lastIndexOf('/'));

    /** @type Portal.ApplicationManifest */
    var manifest = {
        id: "transfusions",
        name: "Transfusions",
        title: "Transfusions between computers.",
        icon: pathfolder + "/icon.svg",
        group: "Tools",
        content: {
            html: pathfolder +  "/ui.html"
        }
    }


    /** @type Portal */
    var portal = window.portal;
    portal.addManifest(manifest, function(app) {
        //return;
        /** @type AP.Transfusions.Application */
        var application = app;
        var $root = $(application.root);

        application.filetransfusion = new function() {
            /** @type AP.Transfusions.FileTransfusion */
            var _this = this;
            var $this = $root.find('.File-Transfusion');
            var $table = $this.find('.file-table');
            var $tbody = $table.find('tbody');
            var $rowAbstract = $tbody.find('.file.abstract').removeClass('abstract').remove();

            // methods
            _this.set = function(files) {
                $tbody.html('');

                files.forEach(function(file) {
                    var $element = $rowAbstract.clone();
                    $element.find('.name').text(file.name);
                    $element.find('.date').text(file.date);
                    $element.find('.size').text(file.size);
                    $element.appendTo($tbody);

                });
            }
        }();

        // methods


        return __.api.xortal.transfusions.get_all_file().then(function(e) {
            console.log(e);
        });

    });
}();