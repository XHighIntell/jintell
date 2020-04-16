/*! jIntell Framework - Portal.js 
 * 
 * https://github.com/XHighIntell/jintell */

'use strict';

window.Portal = function(element) {
    /** @type Portal */
    var portal = this;
    var $portal = $(element);
    var $portalContent = $portal.find('.Portal-Content'); // .Portal-Content
    
    portal.sidebar = new function() {
        /** @type Portal.Sidebar */
        var sidebar = this;
        var $sidebar = $portal.find('.Sidebar');
        var $sidebarTop = $sidebar.find('.Sidebar-Top');
        var $sidebarMiddle = $sidebar.find('.Sidebar-Middle');
        var $sidebarAppAbstract = $sidebarMiddle.find('.Sidebar-App.abstract').removeClass('abstract').remove();
        var $groupAbstract = $sidebarMiddle.find('.Group.abstract').removeClass('abstract').remove();

        if ($sidebarAppAbstract.length == 0) $sidebarAppAbstract =
$(`<div class="Sidebar-App abstract" title="" tabindex="0">
    <i class="Icon"></i>
    <span class="Name"></span>
</div>`);

        if ($groupAbstract.length == 0) $groupAbstract =
$(`<div class="Group" data-group="Account">
    <header>
        <div class="Name">Account</div>
    </header>
    <div class="Apps">
                        
    </div>
</div>`);

        // property
        sidebar.keys = {};
        
        // methods
        sidebar.add = function(application) {
            var $element = $sidebarAppAbstract.clone();
            var element = $element[0];
            var manifest = application.manifest;            

            $element.attr('title', manifest.title);
            if (manifest.icon) $element.find('.Icon').css('background-image', 'url("' + manifest.icon + '")');
            $element.find('.Name').html(manifest.name);

            sidebar.setApplication(element, application);


            if (manifest.group) {
                // 1. find or create create new group if not exists
                // 2. append shortcut element to group

                // --1--
                var $group = $sidebarMiddle.find('.Group[data-group="' + manifest.group + '"]');
                if ($group.length == 0 ) {
                    var $group = $groupAbstract.clone();
                    $group.attr('data-group', manifest.group);
                    $group.find('>header>.Name').html(manifest.group)
                    $sidebarMiddle.append($group);
                }

                // --2--
                $group.find('.Apps').append($element);
                
            } else {
                // when manifest.group equal null or empty, 
                // must insert shortcut element before any group
                // 1. find the first match for group
                // 2. 
                //   a. found a group, insert before the first match group
                //   b. don't have any group, append $sidebarMiddle

                // --1--
                var $group = $sidebarMiddle.find('.Group:first');

                // --2--
                if ($group.length) {
                    // --2a--
                    $element.insertBefore($group);
                } else {
                    // --2b--
                    $sidebarMiddle.append($element);
                }

                
            }

            

            return element;
        }
        sidebar.get = function(application) {
            return $sidebarMiddle.find('.Sidebar-App').toArray().find(function(value) {
                return sidebar.getApplication(value) == application;
            });
        }
        sidebar.active = function(application) {
            var element = sidebar.get(application);

            if (element == null) return;

            $sidebarMiddle.find('.Sidebar-App').each(function() {
                if (this == element) 
                    $(this).addClass('ACTIVE')
                else
                    $(this).removeClass('ACTIVE')
                
            })

            return element;
        }
        sidebar.getApplication = function(element) { return element._application }
        sidebar.setApplication = function(element, application) { element._application = application }

        sidebar.enableCollapseStorage = function(key) {
            sidebar.keys.collapsed = key;

            if (sidebar.keys.collapsed) {
                if (localStorage.getItem(key) == "true") $sidebar.addClass('collapsed');
            }
        }

        // handle events
        $sidebarTop.find('.collapse-button:first').click(function() {
            var collapsed = $sidebar.toggleClass('collapsed').is('.collapsed');

            if (sidebar.keys.collapsed) localStorage.setItem(sidebar.keys.collapsed, collapsed);
        });
        $sidebarMiddle.on('click', '.Sidebar-App', function() {
            var application = sidebar.getApplication(this);
            if (application) {
                portal.open(application);
            }
        });

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

            $loadingOverlay[0].offsetHeight
            $loadingOverlay.addClass('ACTIVE');

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
            $loadingOverlay.hide().removeClass('ACTIVE');
            $errorOverlay.hide().removeClass('ACTIVE');
        }


        !function() {

            if ($loadingOverlay.length == 0) {
                $loadingOverlay = $(`<div class="Loading-Overlay" style="display:none">
    <i class="spring"></i>
    <div class="content">
        <i class="spring"></i>
        <div class="Application-Name"></div>
        <div class="Application-Description"></div>
        <i class="spring" style="flex-grow:1.5"></i>
    </div>
                
    <i class="spring"></i>
    <div class="Waiting-Box">
        <div class="cycle"></div>
        <div class="cycle" style="animation-delay:.15s"></div>
        <div class="cycle" style="animation-delay:.3s"></div>
        <div class="cycle" style="animation-delay:.45s"></div>
        <div class="cycle" style="animation-delay:.6s"></div>
    </div>
</div>`);
                $portalContent.append($loadingOverlay);
            }
            if ($errorOverlay.length == 0) {
                $errorOverlay = $(`<div class="Error-Overlay" style="display:none">
    <i class="spring"></i>
    <div>
        <i class="spring"></i>
        <div class="header">
            <div class="icon">✖</div>
            <div>
                <div class="Application-Name"></div>
                <div class="Message"></div>
            </div>
        </div>
        <div class="Stack"></div>
        <i class="spring" style="flex-grow:1.5"></i>
    </div>
    <i class="spring"></i>
</div>`);
                $portalContent.append($errorOverlay);
            }

        }();


    }();
    
    // fields
    /** @type {Portal.Application[]} */
    var applications = [];
    /** @type {Portal.Application} */
    var activeApplication;
    /** @type string[] */
    var jsUrls = portal.jsUrls = [];
    /** @type string[] */
    var styleUrls = portal.styleUrls = [];


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

        // 1. check if application exist
        // 2. create shortcut base on manifest

        // --1--
        var element = portal.sidebar.get(application);
        if (element != null) return; // application already exists

        applications.push(application);
        
        // --2
        if (manifest.shortcut == true) {
            application.shortcut = portal.sidebar.add(application);
        }
    }
    portal.addManifest = function(manifest, callback) {
        var application = new PortalApplication();

        if (manifest.id != null) application.manifest.id = manifest.id;
        if (manifest.name != null) application.manifest.name = manifest.name;
        if (manifest.description != null) application.manifest.description = manifest.description;
        if (manifest.title != null) application.manifest.title = manifest.title;
        if (manifest.icon != null) application.manifest.icon = manifest.icon;
        if (manifest.shortcut != null) application.manifest.shortcut = manifest.shortcut;
        if (manifest.group != null) application.manifest.group = manifest.group;
        if (manifest.startup != null) application.manifest.startup = manifest.startup;
        if (manifest.content != null) {
            if (manifest.content.html != null) application.manifest.content.html = manifest.content.html;
            if (manifest.content.js != null) application.manifest.content.js = manifest.content.js;
            if (manifest.content.css != null) application.manifest.content.css = manifest.content.css;
        }

        
        application.load = function() { return callback(application) }

        portal.add(application);
    }
    portal.open = function(application) {

        // open method have 3 overloads
        // A. open(): void;
        // B. open(application: Portal.Application): void;
        // C. open(applicationId: string): void;
        if (application == null) {
            var application = applications.find(function(value) {
                return value.manifest.startup == true;
            });
            
            if (application) portal.open(application);
        }
        else if (application instanceof PortalApplication) {
            // --B--

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
                // 2. start load

                // --1--
                overlay.showLoading(application);

                // --2--
                portal.load(application).then(function() {

                    $portalContent.append(application.root);

                    if (activeApplication == application) {
                        overlay.hide();
                        $(application.root).show();
                    }
                    else
                        $(application.root).hide();

                    application.onopen();
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
            else if (application.status == "FAIL") {
                overlay.showError(application);
            }

            portal.sidebar.active(application);
            portal.onchange({ oldApplication: oldApplication, newApplication: newApplication });

            // because portal.onchange -> application.onopen 
            if (application.status == "LOADED") application.onopen();
            

        }
        else if (typeof application == "string") {
            // --C--

            // let find a application to open first
            // 1. find application have the same id

            var id = application;
            /** @type Portal.Application */
            var application;

            // --1--
            if (id) {
                application = applications.find(function(value) {
                    return value.manifest.id == id;
                });
            }
            
            if (application) portal.open(application);
            else portal.open();
        }


    }



    portal.contains = function(application) {
        return applications.indexOf(application) != -1;
    }
    portal.load = function(application) {
        // 1. The application status must be none
        // 2. Load html
        // 3. Load script
        // 4. Load style

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

                        if (this.status != 200) {
                            reject(new Error('Can\'t load html: ' + manifest.content.html));
                            return;
                        }

                        // 1. if have more than 1 element, swap in another div

                        // --1--
                        var $root = $(this.responseText);
                        if ($root.length > 1)
                            $root = $('<div></div>').append($root);
                        application.root = $root[0];

                        resolve();

                    }).error(function() {
                        reject(new Error("ERR_INTERNET_DISCONNECTED"));
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

        // --4--
        if (manifest.content.css && manifest.content.css.length > 0) {

            manifest.content.css.forEach(function(url) {
                portal.loadStyle(url);
            });
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
    portal.loadStyle = function(relative_url) {
        var url = new URL(relative_url, document.baseURI);

        if (styleUrls.indexOf(url.href) != -1) {
            // already exist 
            return Promise.resolve();
        } else {
            return new Promise(function(resolve, reject) {

                var $link = $('<link href="/static/css/hljs.css" rel="stylesheet">');
                document.head.append($link[0]);
                styleUrls.push(url.href);

                resolve();
            });
        }
    }

    // events
    portal.onchange = intell.createEventFunction();


    // handle events
    //portal.onchange(function(e) {
    //
    //    var qs = intell.qs();
    //    qs.app = e.newApplication.manifest.id;
    //
    //    var names = Object.getOwnPropertyNames(qs);
    //    var url = '?' + names.map(function(name) {
    //        return name + '=' + qs[name];
    //    }).join('&') + location.hash;
    //
    //    history.pushState(null, document.title, url);
    //})



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
    application.onopen = intell.createEventFunction();
}


