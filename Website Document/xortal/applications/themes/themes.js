

!function() {

    var pathname = new URL(document.currentScript.src).pathname;
    var pathfolder = pathname.substr(0, pathname.lastIndexOf('/'));


    var manifest = {
        id: "themes",
        name: "Themes",
        title: "Contain tons of useful themes",
        icon: pathfolder + "/icon.svg",
        content: {
            html: pathfolder +  "/ui.html"
        }
    }


    /** @type Portal */
    var portal = window.portal;
    portal.addManifest(manifest, function(application) {
        //return;
        var $root = $(application.root).find('#Themes');
        var $sportal = $root.find('.X-Portal');





    });
}();