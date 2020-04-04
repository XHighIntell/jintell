/*! portal.js | @ license | https://github.com/XHighIntell/jintell */

window.Portal = function(element) {
    /** @type Portal */
    var portal = this;
    var $portal = $(element);
    var $portalContent = $portal.find('.portal-content'); //.portal-content
    
    portal.sidebar = new function() {
        /** @type Portal.Sidebar */
        var sidebar = this;
        var $sidebar = $portal.find('.sidebar');
        var $sidebarMiddle = $portal.find('.sidebar .sidebar-middle');
        var $sidebarTop = $portal.find('.sidebar .sidebar-top');
        var $sidebarAppAbstract = $portal.find('.sidebar .sidebar-middle .sidebar-app.BASE-CONTROL').removeClass('BASE-CONTROL').remove();


        // methods
        sidebar.add = function(application) {
            var $element = $sidebarAppAbstract.clone();
            var element = $element[0];
            var manifest = application.manifest;


            $element.attr('title', manifest.title);
            if (manifest.icon) $element.find('.icon').css('background-image', 'url("' + manifest.icon + '")');
            $element.find('.name').html(manifest.name);


            sidebar.setApplication(element, application);
            $sidebarMiddle.append($element);

            return element;
        }
        sidebar.get = function(application) {
            return $sidebarMiddle.find('>.sidebar-app').toArray().find(function(value) {
                return sidebar.getApplication(value) == application;
            });
        }
        sidebar.active = function(application) {
            var element = sidebar.get(application);

            if (element == null) return;

            $sidebarMiddle.find('>.sidebar-app').each(function() {
                if (this == element) 
                    $(this).addClass('ACTIVE')
                else
                    $(this).removeClass('ACTIVE')
                
            })

            return element;
        }

        sidebar.getApplication = function(element) { return element._application }
        sidebar.setApplication = function(element, application) { element._application = application }

        // handle events
        $sidebarTop.find('.collapse-button').click(function() {
            var collapsed = $sidebar.toggleClass('collapsed').is('.collapsed');
            localStorage.setItem('portal.sidebar.collapsed', collapsed);
        });
        $sidebarMiddle.on('click', '.sidebar-app', function() {
            var application = sidebar.getApplication(this);
            if (application) {
                portal.open(application);
            }
        });
        

        if (localStorage.getItem('portal.sidebar.collapsed') == "true") $sidebar.addClass('collapsed');

    }();
    /** @type Portal.Overlay */
    var overlay = portal.overlay = new function() {
        /** @type Portal.Overlay */
        var overlay = this;
        var $loadingOverlay = $portalContent.find('.Loading-Overlay');
        var $errorOverlay = $portalContent.find('.Error-Overlay');

        // methods 
        overlay.showLoading = function(application) {
            $loadingOverlay.find('.Application-Name').text(application.manifest.name);
            $loadingOverlay.find('.Application-Description').text(application.manifest.description);
            $loadingOverlay.show();

            $errorOverlay.hide();
        }
        overlay.showError = function(application) {
            $errorOverlay.find('.Application-Name').html(application.manifest.name);
            $errorOverlay.find('.Message').html(application.error.message);
            $errorOverlay.find('.Stack').html(application.error.stack);
            $errorOverlay.show();

            $loadingOverlay.hide();
        }
        overlay.hide = function() {
            $loadingOverlay.hide();
            $errorOverlay.hide();
        }
    }();
    
    // fields
    /** @type {Portal.Application[]} */
    var applications = [];
    /** @type {Portal.Application} */
    var activeApplication;
    /** @type string[] */
    var jsUrls = portal.jsUrls = [];


    // properties
    Object.defineProperties(portal, {
        applications: {
            get: function() { return applications }
        },
        activeApplication: {
            get: function() { return activeApplication }
        }
    });

    // methods
    portal.add = function(application) {
        var manifest = application.manifest;

        // 1. find sidebar element of application
        // 2. 
        // 3. create shortcut base on manifest

        // --1--
        var element = portal.sidebar.get(application);
        if (element != null) return;

        applications.push(application);

        
        // --22
        if (manifest.shortcut == true) element = portal.sidebar.add(application);




    }
    portal.open = function(application) {
        var manifest = application.manifest;
        
        // 1. if open an application already opened, exit this block
        // 2. 
        // 3. 

        

        // --1--
        if (activeApplication == application) return;

        var oldApplication = activeApplication;
        var newApplication = application;


        // --2--
        activeApplication = application; // set current application

        portal.sidebar.active(application);
        portal.applications.forEach(function(value) {
            $(value.root).hide();
        });


        if (application.status == "NONE") {
            // application never load before
            // 1. show loading overlay
            // 2.

            overlay.showLoading(application);

            portal.load(application).then(function() {

                $portalContent.append(application.root);

                if (activeApplication == application) {
                    overlay.hide();
                    $(application.root).show();
                }
                else
                    $(application.root).hide();

                //onAppLoad(application);
            }, function(error) {
                if (activeApplication == application) 
                    overlay.showError(application);
                
            });
        
        }
        else if (application.status == "LOADING") {
            // application is loading
            overlay.showLoading(application);
        }
        else if (application.status == "LOADED") { //LOADED
            overlay.hide();
            $(application.root).show();
        }
        else if (application.status == "FAIL") { //FAIL
            overlay.showError(application);
        }

        portal.sidebar.active(application);
        portal.onchange({ oldApplication: oldApplication, newApplication: newApplication });
    }
    portal.contains = function(application) {
        return applications.indexOf(application) != -1;
    }
    portal.load = function(application) {
        // 1. The application status must be none
        // 2. Load html
        // 3. Load script

        // --1--
        if (application.status != "NONE") throw "Application is already loaded";

        application.status = "LOADING";

        var manifest = application.manifest;
        var promise = Promise.resolve();

        // --2--
        if (manifest.content.html) {
            promise = promise.then(function() {
                return new Promise(function(resolve, reject) {
                    intell.get(manifest.content.html).load(function() {

                        // 1. if have more than 1 element, swap in another div

                        // --1--
                        var $root = $(this.responseText);
                        if ($root.length > 1)
                            $root = $('<div></div>').append($root);
                        application.root = $root[0];

                        resolve();

                    }).error(function() {
                        reject("ERR_INTERNET_DISCONNECTED");
                    }).send();

                });
            });
        }

        // --3--
        if (manifest.content.js && manifest.content.js.length > 0) {
            promise = promise.then(function() {
                return new Promise(function(resolve, reject) {

                    var tasks = Array.from(manifest.content.js);

                    processTask();

                    function processTask() {
                        var url = tasks.shift();
                        if (url == null) { onFinish(); return }

                        portal.loadJavascript(url).then(function() {
                            processTask();
                        }, function(e) {
                            reject(e);
                        })
                    }
                    function onFinish() { resolve() }

                });
            })


        }


        return promise.then(function() {
            if (typeof application.load == 'function')
                return application.load();
        }).then(function() {
            application.status = "LOADED";
        }).catch(function(error) {
            application.status = "FAIL";
            application.error = error;

            console.error(error);

            return Promise.reject(error);
        });

    }
    portal.loadJavascript = function(relative_url) {
        
        var url = new URL(relative_url, document.baseURI);

        if (jsUrls.indexOf(url.href) != -1) {
            // already exist 
            return Promise.resolve();
        } else {
            return new Promise(function(resolve, reject) {
                return $.getScript({ url: url.href, cache: true }).done(function() {
                    jsUrls.push(url.href);
                    resolve();
                }).fail(function() {
                    reject(new Error('Can\'t load javascript: ' + relative_url));
                })
            });
        }
    }

    // events
    portal.onchange = intell.createEventFunction();


    // handle events
    $(document).ready(function() {

        // let find a application to open first
        // 1. find application have id equal to query string (?app=)
        // 2. find application have manifest.startup equal true

        /** @type Portal.Application */
        var application;

        // --1--
        var qs = intell.qs();
        if (qs.app) {
            application = applications.find(function(value) {
                return value.manifest.id == qs.app;
            });
        }

        // --2--
        if (application == null) {
            application = applications.find(function(value) {
                return value.manifest.startup == true;
            });

            if (application) portal.open(application);
        }

        portal.open(application);
    })
    portal.onchange(function(e) {
        console.log('portal.onchange', e);

        var qs = intell.qs();
        qs.app = e.newApplication.manifest.id;

        var names = Object.getOwnPropertyNames(qs);
        var seach = '?' + names.map(function(name) {
            return name + '=' + qs[name];
        }).join('&');

        history.pushState(null, document.title, seach);
    })



}

window.PortalApplication = function(element) {
    /** @type Portal.Application */
    var application = this;

    application.manifest = {
        id: "",
        icon: "",
        name: "",
        title: "",
        description: "",

        content: {
            js: [],
            css: [],
            html: ""
        },

        shortcut: true,
        startup: false,
    }
    application.status = "NONE";

}


