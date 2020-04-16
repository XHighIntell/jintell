!function () {
    var manifest = {
        id: "billing",
        name: "Cost + Billing",
        title: "Cost + Billing",
        icon: "sub-portal/icon.svg",
        content: {
            html: "sub-portal/ui.html",
            js: ["/static/lib/highlight.pack.js"],
            css: ["/static/css/hljs.css"],
        },
        group: "Account"
    }
    var purchaseManifest = {
        id: "purchase", name: "Purchase", title: "Purchase", icon: "sub-portal/purchase/icon.svg",
        content: { html: "sub-portal/purchase/ui.html" },
        startup: true
    }
    var historyManifest = {
        id: "history", name: "History", title: "History", icon: "sub-portal/history/icon.svg",
        content: { html: "sub-portal/history/ui.html" },
        startup: true
    };

    /** @type Portal  */
    var portal = window.portal;
    portal.addManifest(manifest, function(application) {
        var $root = $(application.root);

        var sportal = new Portal($root.find('#SubPortal')[0]);

        sportal.addManifest(purchaseManifest, function(application) {

        });
        sportal.addManifest(historyManifest, function(application) {

        });
        sportal.onchange(function() { replaceState() });


        application.onopen(function() {    
            if (sportal.activeApplication == null) {
                // when this application first open
                // lets find and open an application base on path

                var applicationId = intell.qs().application;
                if (applicationId) applicationId = applicationId.split('/')[1];

                sportal.open(applicationId);    
            } else {
                replaceState();
            }
        })
        

        function replaceState() {
            var qs = intell.qs();
            var levels = qs.application.split('/');
            levels[1] = sportal.activeApplication.manifest.id;
            qs.application = levels.join('/');


            var names = Object.getOwnPropertyNames(qs);
            var url = '?' + names.map(function(name) {
                return name + '=' + qs[name];
            }).join('&') + location.hash;

            history.replaceState(null, document.title, url);
        }
    })

}();
