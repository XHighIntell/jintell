
/** @class */
window.Portal = function() {

    /** @type {Portal} */
    var portal = this;
    
    
    var $sidebarMiddle = $(document).find('.sidebar-middle');
    var $sidebarAppBase = $sidebarMiddle.find('.sidebar-app.BASE-CONTROL').removeClass('BASE-CONTROL').remove(); 
    var $portalContent = $(document).find('.portal-content');                   //.portal-content
    var $portalContentLoading = $portalContent.find('.portal-content-loading'); //.portal-content .portal-content-loading
    var $portalContentLoadingTitle = $portalContentLoading.find('>.title');     //.portal-content .portal-content-loading .icon

    //properties
    var applications = [];
    var activeApplication;

    
    Object.defineProperties(this, {
        applications: { value: applications },
        activeApplication: {
            get: function() { return activeApplication; }
        },
    });

    //events
    var onAppAdd = this.onAppAdd = intell.createEventFunction();
    var onAppLoad = this.onAppLoad = intell.createEventFunction();

    // private fields
    var scripts = []; // loaded script

    
    
    /////////////////////
    // public function
    /////////////////////

    portal.addApplication = addApplication;
    portal.openApplication = openApplication;

    /** @param {PortalApplication} app */
    function addApplication(app) {
        var mainfest = app.mainfest;
        

        if (mainfest.pinned == true) {
            var $sidebar = $sidebarAppBase.clone();
            var sidebar = $sidebar[0];

            sidebar.application = app;
            sidebar.mainfest = mainfest;

            if (mainfest.icon) $sidebar.find('.icon').css('background-image', 'url("' + mainfest.icon + '")');
            $sidebar.find('.name').html(mainfest.name);
            sidebar.title = mainfest.title;

            app.shortcut = sidebar;

            $sidebarMiddle.append($sidebar);
        }
        if (mainfest.startup == true) {
            openApplication(app);

            if ($sidebar) $sidebar.addClass('ACTIVE');
        }

        applications.push(app);
        onAppAdd(app);
    }

    /** @param {PortalApplication} application */
    function openApplication(application) {

        var mainfest = application.mainfest;

        activeApplication = application; // set current application
        

        if (application.status == 0) { //NONE: application never load before
            

            $portalContentLoading.show();
            $portalContentLoadingTitle.html(mainfest.title);

            application.status = 1;

            loadApplication(application).then(function() {
                // this is asynchronous action when code reach here, user may open another apps

                $portalContent.append(application.root);
                application.status = 2;
                onAppLoad(application);
                
                if (activeApplication == application) {
                    $portalContentLoading.hide();
                    $(application.root).show();
                }
                else $(application.root).hide();

            }).catch(function(error) {
                application.status = 3;

                $portalContentLoading.show();
                $portalContentLoadingTitle.html("Error while load " + mainfest.name);

                throw error;
            });

        }
        else if (application.status == 1) { //LOADING: application is loading
            $portalContentLoading.show();
            $portalContentLoadingTitle.html(mainfest.title);

        }
        else if (application.status == 2) { //LOADED
            $portalContentLoading.hide();
            $(application.root).show();
        }
        else if (application.status == 3) { //FAIL
            $portalContentLoading.show();
            $portalContentLoadingTitle.html("Error while load " + mainfest.name);

            //throw "Not implement";
        }
    }

    /////////////////////
    // private function
    /////////////////////

    /** @param {string} urls @returns {Promise<XMLHttpRequest>}  */
    function loadHtml(url) {
        if (!url) return Promise.resolve(null);        

        return new Promise(function(resolve, reject) {
            intell.get(url).load(function() {
                resolve(this);
            }).error(function() {
                reject(this);
            }).send();
        });
    };

    /** @param {string[]} urls @returns {Promise<XMLHttpRequest>}  */
    function loadScript(urls) {
        if (Array.isArray(urls) == false) urls = [urls];


        var filted_urls = urls.filter(function(value) {
            return scripts.indexOf(value) == -1;
        });

        return new Promise(function(resolve, reject) {
            var promises = [];

            filted_urls.forEach(function(value, index) {

                promises.push(new Promise(function(resolve, reject) {
                    jQuery.getScript({ url: value, cache: true }).done(function() {
                        resolve();
                    }).fail(function() {
                        reject();
                    });
                }));
            });

            Promise.all(promises).then(function() {
                Array.prototype.push.apply(scripts, filted_urls);
                
                resolve();
            }).catch(function() {
                reject();
            });

        });

    }

    /** @param {PortalApplication} application; @returns {Promise<XMLHttpRequest>} */
    function loadApplication(application) {
        var mainfest = application.mainfest;
        
        return loadHtml(mainfest.html).then(function(request) {
            if (request != null) {
                var $all = $(request.responseText);
                if ($all.length > 1) $all = $('<div></div>').append($all);
                application.root = $all[0];
            }

            return loadScript(mainfest.js);
        }).then(function() {
            return application.load();
        });
    }



    

    $sidebarMiddle.on('click', '.sidebar-app', function() {
        var $this = $(this);
        var application = this.application;

        portal.applications.forEach(function(item) { $(item.root).hide() });
        portal.openApplication(application);

        $this.parent().find('>.sidebar-app.ACTIVE').removeClass('ACTIVE');
        $this.addClass('ACTIVE');
    });
}
window.PortalApplication = function PortalApplication() {
    if (this instanceof PortalApplication == false) return new PortalApplication();

    this.mainfest = {
        name: undefined,
        icon: undefined,

        html: undefined,
        css: [],
        js: [],
        pinned: true,
        startup: false,
    };

    
    this.status = 0;

    this.loaded = false;

    this.load = function() { }


    Object.defineProperties(this, {
        statusName: {
            get: function() {
                var status = this.status;
                if (status == 0) return "NONE";
                else if (status == 1) return "LOADING";
                else if (status == 2) return "LOADED";
                else if (status == 3) return "FAIL";
                
            },
        }
    });


    this.onShow = intell.createEventFunction(false);
    this.onHide = intell.createEventFunction(false);
}