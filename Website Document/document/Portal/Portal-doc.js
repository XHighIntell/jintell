/** @type {docObjContent[]} */
var o = [];

//Portal
o.push({
    id: 'Portal', name: 'Portal', icon: 'class', content: [
        '<h4>Represents a portal that allows applications.</h4>',
        {
            _: 'item-members', content: [
                {
                    _: 'property', name: 'applications', icon: 'property', type: 'PortalApplication[]', type_ref: '#PortalApplication', content: [
                        '<h4>Gets array of applications added to the portal.</h4>',

                        '<h2>Remark</h2>',
                        'This is for reference only, use <mark>addApplication</mark> to add.'
                    ]
                },
                { _: 'property', name: 'activeApplication', icon: 'property', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'Gets the current active application.' },
                {
                    name: 'addApplication', icon: 'method', content: [
                        '<h4>Add an application to portal.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'addApplication(application: PortalApplication): void', content: [
                                        '<h4>Add an application to portal.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'application', type: 'PortalApplication', type_ref: '#class-PortalApplication', content: 'An application to add to the portal.' }
                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        'The application don\'t load when added but when call <mark>openApplication</mark>.'
                    ]
                },
                {
                    name: 'openApplication', icon: 'method', content: [
                        '<h4>Open an application that added before.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'function openApplication(application: PortalApplication): void', content: [
                                        '<h4>Open an application that added before.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'application', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'The application.' }

                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        'The portal will start to load html, js from application.mainfest then call <mark>application.load</mark>.'
                    ]
                },

                {
                    _: 'default', name: 'onAppAdd', icon: 'event', content: [
                        '<h4>Occur when an application added into portal.</h4>',
                        { _: 'code-block', language: 'typescript', code: 'onAppAdd(handler: (this: Portal, ev: PortalApplication) => void): Portal' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'Portal', type_ref: '#Portal', content: 'The source of the event.' },
                                        { _: 'parameter', name: 'ev  ', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'The application added to portal.' }

                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    _: 'default', name: 'onAppLoad', icon: 'event', content: [
                        '<h4>Occur when an application loaded.</h4>',
                        { _: 'code-block', language: 'typescript', code: 'onAppLoad(handler: (this: Portal, ev: PortalApplication) => void): Portal' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'Portal', type_ref: '#Portal', content: 'The source of the event.' },
                                        { _: 'parameter', name: 'ev  ', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'The application loaded.' }

                                    ]
                                }
                            ]
                        },
                    ]

                },

            ]
        }
    ]
});

//PortalApplication
o.push({
    id: 'PortalApplication', name: 'PortalApplication', icon: 'class', content: [
        '<h4>Represents an application that can be added to portal.</h4>',
        {
            _: 'item-members', content: [
                {
                    _: 'property', name: 'mainfest', icon: 'field', type: 'PortalApplicationMainfest', type_ref: '#PortalApplicationMainfest',
                    default: `{ js: [], pinned: true, startup: false }`,
                    content: 'The mainfest of application.'
                },
                { _: 'sproperty', name: 'root', icon: 'field', type: 'HTMLElement', content: 'The root element of application' },
                { _: 'sproperty', name: 'shortcut', icon: 'field', type: 'HTMLElement', content: 'The sidebar element of this application ' },

                { _: 'sproperty', name: 'status', icon: 'field', type: 'number', content: 'The numerical status code of this application. "NONE" = 0, "LOADING" = 1, "LOADED" = 2, "FAIL" = 3' },
                { _: 'sproperty', name: 'statusName', icon: 'property', type: 'string', content: 'Gets the name of status code.' },

                {
                    name: 'load', icon: 'method', content: [
                        '<h4>Portal will call when user open application, can be overridden to customize loading async tasks.</h4>',
                        {
                            _: 'overloads', overloads: {
                                //Promise&ltPortalApplication&gt
                                syntax: 'function load(): Promise | undefined', syntax_language: 'typescript', content: [
                                    '<h4>Load async application.</h4>',
                                    '<h2>Return</h2>',
                                    { _: 'parameter', type: 'Promise | undefined', content: "Return <mark>Promise</mark> for async run or <mark>undefined</mark> if application don't have any tasks to complete." }
                                ]
                            }
                        },
                        '<h2>Remarks</h2>',
                        'When code reach <mark>load</mark> Portal loaded <mark>mainfest.html</mark> and <mark>mainfest.js</mark>, so you can use <mark>root</mark> or call function of library in <mark>mainfest.js</mark>'
                    ]
                },

                {
                    name: 'onShow', icon: 'event', content: [
                        '<h4>Occur when the application show.</h4>',

                        { _: 'code-block', language: 'typescript', code: 'onShow(handler: (this: PortalApplication) => void): PortalApplication' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'The source of the event.' },
                                    ]
                                }
                            ]
                        },

                        '<h2>Returns</h2>',
                        {
                            _: 'parameter', type: 'PortalApplication', content: [
                                'Return this application.',
                            ]
                        }
                    ]
                },
                {
                    name: 'onHide', icon: 'event', content: [
                        '<h4>Occur when the application hide.</h4>',

                        { _: 'code-block', language: 'typescript', code: 'onHide(handler: (this: PortalApplication) => void): PortalApplication' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'PortalApplication', type_ref: '#PortalApplication', content: 'The source of the event.' },
                                    ]
                                }
                            ]
                        },

                        '<h2>Returns</h2>',
                        {
                            _: 'parameter', type: 'PortalApplication', content: [
                                'Return this application.',
                            ]
                        }
                    ]

                },
            ]
        },

        '<h2>Remarks</h2>',
        {
            _: 'code-block', language: 'javascript', code: `!function() {
    var app = new PortalApplication();
    var mainfest = app.mainfest;
    
    mainfest.name = "Simulation Short Loading";
    mainfest.title = "Simulation 5s loading content";
    mainfest.icon = "/Document/Portal/demo/Simulation5s/Simulation5s.svg";
    mainfest.html = "/Document/Portal/demo/Simulation5s/Simulation5s.html";

    app.load = function() {
        
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                app.root.innerHTML = 'Hello';
                resolve(app);
            }, 5000);
        });
    };
    

    portal.addApplication(app);
}();`
        },
    ]
});




//Interfaces
o.push('<h3>Interfaces</h3>');
o.push({
    id: 'PortalApplicationMainfest', syntax: 'interface PortalApplicationMainfest { }', icon: 'interface', content: [
        '<h4>Mainfest of application.</h4>',
        {
            _: 'item-members', content: [
                { _: 'sproperty', name: 'name', icon: 'field', type: 'string', content: 'Name of the application.' },
                { _: 'sproperty', name: 'icon', icon: 'field', type: 'string', content: 'Url to icon/image of the application.' },
                { _: 'sproperty', name: 'html', icon: 'field', type: 'string', content: 'Optional. The HTML file to be injected into page.' },
                { _: 'sproperty', name: 'css', icon: 'field', type: 'string[]', content: 'Unsupport. The list of CSS files to be injected into page.' },
                { _: 'sproperty', name: 'js', icon: 'field', type: 'string[]', content: 'Optional. The list of JavaScript files to be injected into page.' },
                { _: 'sproperty', name: 'pinned', icon: 'field', type: 'boolean', content: 'Optional. Add application to sidebar.' },
                { _: 'sproperty', name: 'startup', icon: 'field', type: 'boolean', content: 'Optional. Load the application immediately after add.' },
            ]
        }
    ]
});
