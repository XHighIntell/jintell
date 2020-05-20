/** @type {docObjContent[]} */
var o = [];

//Portal
o.push({
    id: 'Portal', name: 'Portal', icon: 'class', content: [
        '<h4>Represents a portal that allows applications.</h4>',
        {
            _: 'item-members', content: [
                {
                    _: 'default', id: 'Constructor', name: 'Constructor', icon: 'method', content: [
                        '<h4>Initializes a new instance of the Portal class.</h4>',
                        {
                            _: 'overloads',
                            overloads:
                                [
                                    {
                                        syntax: '(element: HTMLElement): Portal', syntax_language: 'typescript', content: [
                                            '<h4></h4>',
                                            '<h2>Parameters</h2>',
                                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                                        ]
                                    },
                                    {
                                        syntax: 'new (element: HTMLElement): Portal', syntax_language: 'typescript', content: [
                                            '<h4></h4>',
                                            '<h2>Parameters</h2>',
                                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' }
                                        ]
                                    }
                                ]
                        }
                    ]
                },
                {
                    _: 'property', name: 'applications', icon: 'property', type: 'Application[]', type_ref: '#Application', content: [
                        '<h4>Gets array of applications added to the portal.</h4>',
                    ]
                },
                { _: 'property', name: 'activeApplication', icon: 'property', type: 'Application', type_ref: '#Application', content: 'Gets the current active application.' },
                {
                    name: 'add', icon: 'method', content: [
                        '<h4>Add an application to portal.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'add(application: Application): void', syntax_language: 'typescript', content: [
                                        '<h4>Add an application to portal.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'application', type: 'Application', type_ref: '#Application', content: 'An application to add to the portal.' }
                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        'The application don\'t load when added but when call <mark>open</mark>.'
                    ]
                },
                {
                    name: 'addManifest', icon: 'method', content: [
                        '<h4>Add a manifest to portal.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'add(manifest: ApplicationManifest, callback: (application: Application) => void): Application', syntax_language: 'typescript', content: [
                                        '<h4>Add an application to portal.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'manifest', type: 'ApplicationManifest', type_ref: '#ApplicationManifest', content: 'A manifest of application to add to the portal.' },
                                        {
                                            _: 'parameter', name: 'callback', type: 'function', content: [
                                                '<h4>Callback will occours when application open.</h4>',
                                                {
                                                    _: 'item-members', content: [
                                                        { _: 'parameter', name: 'application', icon: 'field', type: 'Application', type_ref: '#Application', content: 'The fully load application.' },
                                                        '<h2>Return</h2>',
                                                        { _: 'parameter', type: 'void | Promise', content: "Return Promise for async run or undefined if application don't have any tasks to complete." },
                                                    ]
                                                }
                                            ]
                                        },
                                        '<h2>Return</h2>',
                                        { _: 'parameter', type: 'Application', type_ref: "#Application", content: "Return application." },
                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        '<h4>The <mark>callback</mark> will called after load javascript, html, css.</h4>',
                        '<h4><mark>AddManifest</mark> is another way of adding an application to portal. Adding via addManifest is readable and reasonable in some situations.</h4>',
                        {
                            _: 'list', content: [
                                'The application completed loading before return in callback, <mark>root</mark> element is ready to use. Some people found declaring varible with empty then set it again in <mark>Application.load</mark> when <mark>root</mark> ready is clunky .',
                                'Intellisense in Typescript'
                            ]
                        }
                    ]
                },
                {
                    name: 'open', icon: 'method', content: [
                        '<h4>Open an application that added before.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'function open(): void', content: [
                                        '<h4>Open the first application that have <mark>manifest.startup</mark> equal true.</h4>'
                                    ]
                                },
                                {
                                    syntax: 'function open(application: Application): void', content: [
                                        '<h4>Open an application that added before.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'application', type: 'Application', type_ref: '#Application', content: 'The application to open.' }

                                    ]
                                },
                                {
                                    syntax: 'function open(applicationId: string): void', content: [
                                        '<h4>Open an application specified by its <mark>manifest.id</mark>. If there are no match with id, portal will open default applcation.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'applicationId', type: 'string', content: 'The application <mark>manifest.id</mark>.' }

                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        '<h4>Poral gives the best customize for development, we control starting portal manually when ready.</h4>',
                        'see <mark>application.load</mark>.'
                    ]
                },
                {
                    name: 'load', icon: 'method', content: [
                        '<h4>Load all resources of an application.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'function load(application: Application): Promise2&lt;any, Error&gt;', content: [
                                        '<h4>Load all resources of an application.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'application', type: 'Application', type_ref: '#Application', content: 'The application to open.' },
                                        '<h2>Return</h2>',
                                        { _: 'parameter', type: 'Promise2&lt;any, Error&gt;', content: "Return <mark>Promise</mark> of async loading content." },
                                    ]
                                }
                            ]
                        },
                        
                        '<h2>Remark</h2>',
                        'Load will create a chain promise for load html, js, css (content of manifest) and application.load.',
                        '<h4>Throw "Application is already loaded" if call more than one time.</h4>',
                        '<h4>This is private function of portal.</h4>'
                    ]
                },
                {
                    name: 'loadJavascript', icon: 'method', content: [
                        '<h4>Load a single javascript. Javascript will be ignored if url that have loaded before.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'function loadJavascript(url: string): Promise2&lt;any, Error&gt;', content: [
                                        '<h4>Load a single javascript. Javascript will be ignored if url that have loaded before.</h4>',
                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'url', type: 'string', content: 'The url of lib.' }

                                    ]
                                }
                            ]
                        },
                        '<h2>Remark</h2>',
                        '<h4>Return Promise.resolve() in case of ignored.</h4>',
                        '<h4>This is private function of portal.</h4>'
                    ]
                },
                {
                    _: 'default', name: 'onchange', icon: 'event', content: [
                        '<h4>Occurs when the activeApplication property value changes.</h4>',
                        { _: 'code-block', language: 'typescript', code: 'onchange(handler: (this: Portal, ev: PortalChangeEvent) => void): Portal' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'Portal', type_ref: '#Portal', content: 'The source of the event.' },
                                        {
                                            _: 'parameter', name: 'ev', type: 'PortalChangeEvent', content: [
                                                {
                                                    _: 'item-members', content: [
                                                        { _: 'sproperty', name: 'newApplication', icon: 'field', type: 'Application', type_ref: '#Application', content: 'The new Application to which the portal is navigating.' },
                                                        { _: 'sproperty', name: 'oldApplication', icon: 'field', type: 'Application', type_ref: '#Application', content: 'The previous Application from which the portal was navigated.' },
                                                    ]
                                                }
                                            ]
                                        }
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

//Application
o.push({
    id: 'Application', name: 'PortalApplication', icon: 'class', content: [
        '<h4>Represents an application that can be added to portal.</h4>',
        {
            _: 'item-members', content: [
                { _: 'property', name: 'manifest', icon: 'field', type: 'ApplicationManifest', type_ref: '#ApplicationManifest', content: 'The manifest of application.' },
                { _: 'sproperty', name: 'root', icon: 'field', type: 'HTMLElement', content: 'The root element of application' },
                { _: 'sproperty', name: 'shortcut', icon: 'field', type: 'HTMLElement', content: 'The sidebar element of this application ' },

                {
                    _: 'sproperty', name: 'status', icon: 'field', type: 'string', content: [
                        'The status of this application.',
                        '<h2>Remarks</h2>',
                        '<h4><mark>NONE</mark> Application nerver load before</h4>',
                        '<h4><mark>LOADING</mark> Application is loading</h4>',
                        '<h4><mark>LOADED</mark> Application completed loading</h4>',
                        '<h4><mark>FAIL</mark> An error occurs while loading</h4>',

                    ]
                },
                { _: 'sproperty', name: 'error', icon: 'field', type: 'Error', content: 'Error occurs while loading.' },

                {
                    name: 'load', icon: 'method', content: [
                        '<h4>Portal will call when user open application, can be overridden to customize loading async tasks.</h4>',
                        {
                            _: 'overloads', overloads: {
                                //Promise&ltApplication&gt
                                syntax: 'function load(): Promise | undefined', syntax_language: 'typescript', content: [
                                    '<h4>Load async application.</h4>',
                                    '<h2>Return</h2>',
                                    { _: 'parameter', type: 'Promise | undefined', content: "Return <mark>Promise</mark> for async run or <mark>undefined</mark> if application don't have any tasks to complete." }
                                ]
                            }
                        },
                        '<h2>Remarks</h2>',
                        'When code reach <mark>load</mark> Portal loaded <mark>manifest.content.html</mark> and <mark>manifest.content.js</mark>, so you can use <mark>root</mark> or call function of library in <mark>manifest.content.js</mark>'
                    ]
                },

                {
                    name: 'onopen', icon: 'event', content: [
                        '<h4>Occur when the application show.</h4>',

                        { _: 'code-block', language: 'typescript', code: 'onopen(handler: (this: Application) => void): Application' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'Application', type_ref: '#Application', content: 'The source of the event.' },
                                    ]
                                }
                            ]
                        },

                        '<h2>Returns</h2>',
                        {
                            _: 'parameter', type: 'Application', content: [
                                'Return this application.',
                            ]
                        },

                        '<h2>Remark</h2>',
                        '<h4><mark>onopen</mark> occur for every time application open.</h4>'
                    ]
                },
                {
                    name: 'onHide', icon: 'event', content: [
                        '<h4>Occur when the application hide.</h4>',

                        { _: 'code-block', language: 'typescript', code: 'onHide(handler: (this: Application) => void): Application' },

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'Application', type_ref: '#Application', content: 'The source of the event.' },
                                    ]
                                }
                            ]
                        },

                        '<h2>Returns</h2>',
                        {
                            _: 'parameter', type: 'Application', content: [
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
    var manifest = app.manifest;
    
    manifest.name = "Simulation Short Loading";
    manifest.title = "Simulation 5s loading content";
    manifest.icon = "/Document/Portal/demo/Simulation5s/Simulation5s.svg";
    manifest.content.html = "/Document/Portal/demo/Simulation5s/Simulation5s.html";

    app.load = function() {
        
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                app.root.innerHTML = 'Hello';
                resolve(app);
            }, 5000);
        });
    };
    

    portal.add(app);
}();`
        },
    ]
});




//Interfaces
o.push('<h3>Interfaces</h3>');

//ApplicationManifest
o.push({
    id: 'ApplicationManifest', syntax: 'interface ApplicationManifest { }', icon: 'interface', content: [
        '<h4>Manifest of application.</h4>',
        {
            _: 'item-members', content: [
                { _: 'sproperty', name: 'id', icon: 'field', type: 'string', content: 'An unique identifier of application.' },
                { _: 'sproperty', name: 'name', icon: 'field', type: 'string', content: 'The application name.' },
                { _: 'sproperty', name: 'description', icon: 'field', type: 'string', content: 'A plain text string (no HTML or other formatting) that describes the application while loading.' },
                { _: 'sproperty', name: 'title', icon: 'field', type: 'string', content: 'A short description of the application.' },
                { _: 'sproperty', name: 'icon', icon: 'field', type: 'string', content: 'Url to icon/image of the application.' },
                { _: 'sproperty', name: 'iconText', icon: 'field', type: 'string', content: 'Display a text as icon/image of the application. It is useful for icon font.' },
                { _: 'sproperty', name: 'shortcut', icon: 'field', type: 'boolean', default: 'true', content: 'Pin this application to menu.' },
                { _: 'sproperty', name: 'group', icon: 'field', type: 'string', default: '', content: 'The group name of shortcut element.' },
                { _: 'sproperty', name: 'startup', icon: 'field', type: 'boolean', default: 'false', content: 'Load the application immediately after add.' },
                { _: 'property', name: 'content', icon: 'field', type: 'ApplicationManifestContent', type_ref: '#ApplicationManifestContent', content: 'The manifest content of application.' },
            ]
        }
    ]
});

//ApplicationManifestContent
o.push({
    id: 'ApplicationManifestContent', syntax: 'interface ApplicationManifestContent { }', icon: 'interface', content: [
        '<h4>Manifest content of application.</h4>',
        {
            _: 'item-members', content: [
                { _: 'sproperty', name: 'html', icon: 'field', type: 'string', content: 'The HTML file to be injected into page.' },
                { _: 'sproperty', name: 'js', icon: 'field', type: 'string[]', content: 'The list of JavaScript files to be injected into portal.' },
                { _: 'sproperty', name: 'css', icon: 'field', type: 'string[]', content: '(Unsupport) The list of CSS files to be injected into portal.' },
                
            ]
        }
    ]
});