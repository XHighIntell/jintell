/** @type {docObjContent[]} */
var o = [];


//Rectangle
o.push({
    name: 'Rectangle', icon: 'class', id: 'Rectangle', content: [
        '<h4>Stores a set of four integers that represent the location and size of a rectangle.</h4>',
        {
            _: 'item-members',
            content: [
                {
                    _: 'default', name: '()', icon: 'method', content: [
                        '<h4>Create a new Rectangle.</h4>',
                        {
                            _: 'overloads', overloads: [
                                {
                                    syntax: 'new(x?: number, y?: number, width?: number, height?: number): Rectangle', syntax_language: 'typescript', content: [

                                        '<h2>Parameters</h2>',
                                        { _: 'parameter', name: 'x', type: 'number', content: 'The x coordinate of the rectangle.' },
                                        { _: 'parameter', name: 'y', type: 'number', content: 'The y coordinate of the rectangle.' },
                                        { _: 'parameter', name: 'width', type: 'number', content: 'The width of the rectangle.' },
                                        { _: 'parameter', name: 'height', type: 'number', content: 'The height of the rectangle.' },

                                        '<h2>Returns</h2>',
                                        { _: 'parameter', type: 'Rectangle', type_ref: '#Rectangle', content: 'Return a new rectangle object.' },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { _: 'sproperty', name: 'left', icon: 'field', type: 'number', default: 0, content: 'Gets the x-coordinate of the left edge of this Rectangle structure.'},
                { _: 'sproperty', name: 'top', icon: 'field', type: 'number', default: 0, content: 'Gets the y-coordinate of the top edge of this Rectangle structure.' },
                { _: 'sproperty', name: 'width', icon: 'field', type: 'number', default: 0, content: 'Gets or sets the width of this Rectangle structure.' },
                { _: 'sproperty', name: 'height', icon: 'field', type: 'number', default: 0, content: 'Gets or sets the height of this Rectangle structure.' },
                { _: 'sproperty', name: 'x', icon: 'property', type: 'number', default: 0, content: 'Gets or sets the x-coordinate of the upper-left corner of this Rectangle structure.' },
                { _: 'sproperty', name: 'y', icon: 'property', type: 'number', default: 0, content: 'Gets or sets the y-coordinate of the upper-left corner of this Rectangle structure.' },
                { _: 'sproperty', name: 'right', icon: 'property', type: 'number', content: 'Gets the x-coordinate that is the sum of X and Width property values of this Rectangle structure.' },
                { _: 'sproperty', name: 'bottom', icon: 'property', type: 'number', content: 'Gets the y-coordinate that is the sum of the Y and Height property values of this Rectangle structure.' },
                {
                    name: 'intersectsWith', icon: 'method', content: [{
                        '_': 'overloads', overloads: [
                            {
                                syntax: 'intersectsWith(rect: Rectangle): boolean', content: [
                                    '<h4>Determines if this rectangle intersects with rectangle.</h4>',
                                    '<h2>Parameters</h2>',
                                    { _: 'parameter', name: 'rect', type: 'Rectangle', type_ref: '#Rectangle', content: 'The rectangle to test.' },


                                    '<h2>Return</h2>',
                                    { _: 'parameter', type: 'boolean', content: 'This method returns true if there is any intersection, otherwise false.' }
                                ]
                            },
                            {
                                syntax: 'intersectsWith(point: Coordinates): boolean', content: [
                                    '<h4>Determines if this rectangle intersects with a point.</h4>',
                                    '<h2>Parameters</h2>',
                                    { _: 'parameter', name: 'point', type: 'Coordinates', type_ref: '#Coordinates', content: 'The point to test.' },


                                    '<h2>Return</h2>',
                                    { _: 'parameter', type: 'boolean', content: 'This method returns true if there is any intersection, otherwise false.' }
                                ]
                            }
                        ]
                    }]
                }
            ]
        }
    ]
});

//EventObject
o.push({
    name: 'Event', icon: 'class', id: 'Event', content: [
        '<h4>Stores a set of four integers that represent the location and size of a rectangle.</h4>',
        {
            _: 'item-members',
            content: [
                { _: 'sproperty', name: 'defaultPrevented', icon: 'field', type: 'boolean', content: 'Returns a <mark>boolean</mark> indicating whether or not Event.preventDefault() was called on the event.' },
                { _: 'sproperty', name: 'target', icon: 'field', type: 'HTMLElement', content: 'A reference to the object that dispatched the event. It may be different from control when the event is come from another element a part of control.' },
                {
                    name: 'preventDefault', icon: 'method', content: {
                        _: 'overloads',
                        overloads: { syntax: 'preventDefault(): void', content: '<h4>Set defaultPrevented to <mark>true</mark>.</h4>' }
                    }
                }
            ]
        }
    ]
});

//createOnFunction
o.push({
    name: 'createOnFunction', icon: 'method', id: 'createOnFunction', content: [
        'The function is created by createOnFunction is similar as <mark>addEventListener</mark> but instead of return <mark>undefined</mark> it returns <mark>this</mark> context.',

        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'createOnFunction(): OnFunction', syntax_language: 'typescript', content: [
                        '<h4>Create new on funtion that will call addEventListener of <mark>this</mark>.</h4>',
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'OnFunction', type_ref: '#OnFunction', content: 'the return function is similar as addEventListener but instead of return <mark>undefined</mark> it returns <mark>this</mark> context.' }
                    ]
                },
                {
                    syntax: 'createOnFunction&lt;T&gt;(target: T): OnFunction&lt;T&gt;', syntax_language: 'typescript', content: [
                        '<h4>Create new on funtion that will call addEventListener of <mark>target</mark> instead of <mark>this</mark>.</h4>',
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'OnFunction', type_ref: '#OnFunction&lt;T&gt;', content: 'the return function is similar as addEventListener but instead of return <mark>undefined</mark> it returns <mark>this</mark> context.' }
                    ]
                }

            ]
        },
        '<h2>Example</h2>',
        { _: 'code-block', name: 'Overload 1', language: 'javascript', code: "window.on = intell.createOnFunction();\r\nwindow.on('click', function() { }).innerHTML" },
        { _: 'code-block', name: 'Overload 2', language: 'javascript', code: "var o = { value: 1 };\r\no.on = intell.createOnFunction(window);\r\no.on('click', function() { }).value // 1" }
    ]
});
//createEventFunction
o.push({
    name: 'createEventFunction', icon: 'method', id: 'createEventFunction', content: [
        '<h4>Create a function that have 2 features, the new function can be used to add handler listener or raise handlers that added before.</h4>',

        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'createEventFunction(onlyFire1time?: boolean = false): EventFunction', content: [
                        '<h4>Create a function that can be used to raise event or add handler listener.</h4>',

                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'onlyFire1time', type: 'boolean', content: 'The event only fire one time. Adding another handler after event trigger will run that handler immediate.' },
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'EventFunction', typeref: "#EventFunction", content: 'the return function is EventFunction.' }
                    ]
                }
            ]
        },
        '<h2>Example</h2>',
        { _: 'code-block', name: 'Javascript', code: "var o = { value: 1 };\r\no.load = intell.createEventFunction();\r\no.load(function() { }); // add handler\r\no.load(); // raise handlers" }
    ]
});

//get
o.push({
    _: 'default', name: 'get', icon: 'method', id: 'get', content: [
        '<h4>Create XMLHttpRequest with additional useful fields.</h4>',
        {
            _: "overloads", overloads: [{
                syntax: 'get(url: string): HttpRequest', content: [
                    '<h4>Create XMLHttpRequest with GET method and specified url.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'url', type: 'string', content: 'A string containing the URL to which the request is sent.' },

                    '<h2>Return</h2>',
                    {
                        _: 'parameter', type: 'Intell.HttpRequest', type_ref:'#HttpRequest', content: [
                            'The XMLHttpRequest of request. The return XMLHttpRequest haven\'t called send().',
                        ]
                    }
                ]
            }]
        },
        '<h2>Example</h2>',
        { _: "code-block", name: 'Javascript', code: "intell.get('/').load(function (e) {\r\n    console.log(this.responseText);\r\n}).send();" }
    ]
});
//post
o.push({
    name: 'post', icon: 'method', id: 'post', content: [
        '<h4>Create XMLHttpRequest with additional useful fields.</h4>',
        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'post(url: string): HttpRequest', content: [
                        '<h4>Create XMLHttpRequest with POST method and specified url.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'url', type: 'string', content: 'A string containing the URL to which the request is sent.' },
                        
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.HttpRequest', type_ref: '#HttpRequest', content: 'The XMLHttpRequest of request. The return XMLHttpRequest haven\'t called <mark>send()</mark>.' }
                    ]
                }
            ]
        }

    ]
});

//getRectWhenShowAt
o.push({
    name: 'getRectWhenShowAt', icon: 'method', id: 'getRectWhenShowAt', content: [
        '<h4>Get rectangle if show a rectangle near another rectangle at specified location.</h4>',
        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'getRectWhenShowAt(targetRect: Rectangle, popupRect: Rectangle, location: number, options?: IGetRectWhenShowAtOption): IGetRectWhenShowAtResult', syntax_language: 'typescript', content: [
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'targetRect', type: 'Rectangle', content: 'The target rectangle.' },
                        { _: 'parameter', name: 'popupRect', type: 'Rectangle', content: 'The popup rectangle that will fly around target rectangle.' },
                        { _: 'parameter', name: 'location', type: 'number', content: ['The location rectangle must be placed.', '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'] },
                        { _: 'parameter', name: 'options', type: 'Intell.IGetRectWhenShowAtOption', type_ref: '#IGetRectWhenShowAtOption', content: ['The extra option.'] },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'IGetRectWhenShowAtResult', type_ref: '#IGetRectWhenShowAtResult', content: 'The result of destination.' }

                    ]
                },
                {
                    syntax: 'getRectWhenShowAt(targetPoint: Coordinates, popupRect: Rectangle, location: number, options?: IGetRectWhenShowAtOption): IGetRectWhenShowAtResult', syntax_language: 'typescript', content: [
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'targetPoint', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'The target point.' },
                        { _: 'parameter', name: 'popupRect', type: 'Rectangle', content: 'The popup rectangle that will fly around target rectangle.' },
                        { _: 'parameter', name: 'location', type: 'number', content: ['The location rectangle must be placed.', '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'] },
                        { _: 'parameter', name: 'options', type: 'Intell.IGetRectWhenShowAtOption', type_ref: '#IGetRectWhenShowAtOption', content: ['The extra option.'] },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'IGetRectWhenShowAtResult', type_ref: '#IGetRectWhenShowAtResult', content: 'The result of destination.' }

                    ]
                }
            ]
        }
    ]
});
//findPlaceToShow
o.push({
    name: 'findPlaceToShow', icon: 'method-private', id: 'findPlaceToShow', content: [
        '<h4>Find the best place to show an rectangle near another rectangle. This method is used by <mark>intell.showAt</mark></h4>',
        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'findPlaceToShow(targetRect: Rectangle, popupRect: Rectangle, locations: number[], options?: IGetRectWhenShowAtOption): IShowAtResult', content: [

                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'targetRect', type: 'Rectangle', content: 'The target rectangle.' },
                        { _: 'parameter', name: 'popupRect', type: 'Rectangle', content: 'The popup rectangle that will fly around target element.' },
                        {
                            _: 'parameter', name: 'locations', type: 'number[]', content: [
                                'The location list popup rectangle may be placed.',
                                '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'
                            ]
                        },
                        { _: 'parameter', name: 'options', type: 'IGetRectWhenShowAtOption', type_ref: '#IGetRectWhenShowAtOption', content: 'The extra option.' },
                        
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '#IShowAtResult', content: 'The retsult of destinations.' }
                    ]
                },
                {
                    syntax: 'findPlaceToShow(targetPoint: Coordinates, popupRect: Rectangle, locations: number[], options?: IGetRectWhenShowAtOption): IShowAtResult', content: [

                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'targetRect', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'The target point.' },
                        { _: 'parameter', name: 'popupRect', type: 'Rectangle', content: 'The popup rectangle that will fly around target element.' },
                        {
                            _: 'parameter', name: 'locations', type: 'number[]', content: [
                                'The location list popup rectangle may be placed.',
                                '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'
                            ]
                        },
                        { _: 'parameter', name: 'options', type: 'IGetRectWhenShowAtOption', type_ref: '#IGetRectWhenShowAtOption', content: 'The extra option.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '#IShowAtResult', content: 'The retsult of destinations.' }
                    ]
                }
            ]
        }
    ]
});
//showAt
o.push({
    name: 'showAt', icon: 'method', id: 'showAt', content: [
        '<h4>Show an element near another element or at a point relative to the document.</h4>',
        {
            _: 'overloads',
            overloads: [
                {
                    syntax: 'showAt(target: Element, popup: Element, locations: number[], options?: IShowAtOption): IShowAtResult', content: [
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'Element', content: 'The target element.' },
                        { _: 'parameter', name: 'popup', type: 'Element', content: 'The popup element that will fly around target element.' },
                        { _: 'parameter', name: 'locations', type: 'number[]', content: ['The location list popup may show.', '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'] },
                        { _: 'parameter', name: 'options', type: 'Intell.IShowAtOption', type_ref: '/Intell#IShowAtOption', content: 'The extra conditions for finding position.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '#IShowAtResult', content: 'The rectangle of destination ' }

                    ]
                },
                {
                    syntax: 'showAt(target: Coordinates, popup: Element, locations: number[], options?: IShowAtOption): IShowAtResult', content: [
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'The target point relative to the document.' },
                        { _: 'parameter', name: 'popup', type: 'Element', content: 'The popup element that will fly around target element.' },
                        { _: 'parameter', name: 'locations', type: 'number[]', content: ['The location list popup may show.', '<div style="white-space:pre;font-family:monospace">     1   2  3\r\n12 ┌─────────┐ 4\r\n11 │ target  │ 5\r\n10 └─────────┘ 6\r\n     9   8   7</div>'] },
                        { _: 'parameter', name: 'options', type: 'Intell.IShowAtOption', type_ref: '/Intell#IShowAtOption', content: 'The extra conditions for finding position.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '#IShowAtResult', content: 'The rectangle of destination ' }

                    ]
                }
            ]
        },
        '<h3>Remark</h3>',
        '<h4>When call method, the following step happen to <b>popup</b> element:</h4>',
        {
            _: 'list',
            content: [
                'Set inline style <b>left</b> to -900px.', 'Set <b>visibility</b> to hidden.',
                'Try to show to element DOM. (Remove inline style "display:none" if exist. If element is not display, set display to block.)',
                'Find and set position with input options', 'Remove inline style <b>visibility</b>.'


            ]
        }

    ]
});
//qs
o.push({
    id: 'qs', name: 'qs', icon: 'method', content: [
        '<h4>Create a key value pair object from a query string.</h4>',
        {
            _: 'overloads', overloads: [
                {
                    syntax: 'qs(search?: string): object', syntax_language: 'typescript', content: [
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'search', type: 'string', content: 'A string containing the query.<h4>If <mark>search</mark> is not specified, <mark>location.search.substr(1)</mark> will be used instead.</h4>' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'object', content: 'Return the key value pair object. The key and value separate by <mark>=</mark>.' }

                    ]
                }
            ]
        }
    ]
});

//Interfaces
o.push('<h3>Interfaces</h3>');
o.push({
    _: 'default', id: "HttpRequest", icon: 'interface', syntax: 'interface HttpRequest extends XMLHttpRequest { }', syntax_language: 'typescript', content: [
        {
            _: "item-members", content: [
                {
                    name: 'on', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'on(type: string, handler: (ev: Event) => any): XMLHttpRequest', content: [
                                '<h4>Attach an event handler function for a specified event to the current object.</h4>',
                                '<h2>Parameters</h2>',
                                { _: 'parameter', name: 'type', type: 'string', content: 'event type, such as "load".' },
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },

                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' }
                            ]
                        }
                    }
                },
                {
                    name: 'loadstart', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'loadstart(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "loadstart" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.loadstart()</mark> method is a shorthand for <mark>.on(\'loadstart\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
                {
                    name: 'readystatechange', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'readystatechange(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "readystatechange" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.readystatechange()</mark> method is a shorthand for <mark>.on(\'readystatechange\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
                {
                    name: 'progress', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'progress(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "progress" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.progress()</mark> method is a shorthand for <mark>.on(\'progress\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
                {
                    name: 'load', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'load(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "load" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'XMLHttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.load()</mark> method is just a shorthand for <mark>.on(\'load\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
                {
                    name: 'loadend', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'loadend(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "loadend" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.loadend()</mark> method is a shorthand for <mark>.on(\'loadend\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
                {
                    name: 'error', icon: 'method', content: {
                        _: "overloads",
                        overloads: {
                            syntax: 'error(handler: (this: HttpRequest, ev: ProgressEvent) => any, options ?: boolean | AddEventListenerOptions): this', content: [
                                '<h4>Add an event handler to the "error" event.</h4>',
                                { _: 'parameter', name: 'handler', type: 'Function', content: 'A function to execute each time the event is triggered.' },
                                '<h2>Return</h2>',
                                { _: 'parameter', type: 'HttpRequest', type_ref: '#Intell.HttpRequest', content: 'This method returns its parent.' },
                                '<h4><mark>.error()</mark> method is a shorthand for <mark>.on(\'error\', handler)</mark>.</h4>'

                            ]
                        }
                    }
                },
            ]
        }
    ]
});

o.push({
    _: 'default', icon: 'interface', syntax: 'interface EventFunction&lt;E = any&gt; { }', syntax_language: 'typescript', id: 'EventFunction', content: [
        '<h4>A function that has two overloads, for adding an even handler and triggering event handlers.</h4>',
        {
            _:'overloads',
            overloads: [
                {
                    syntax: '&lt;T, E&gt;(this: T, arg: E): T', content: [
                        '<h4>Trigger event handlers.</h4>',

                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'arg', type: 'E', content: 'Event agrument.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'T', content: 'Return <mark>this</mark> context.' },
                    ]
                },
                {
                    syntax: '&lt;T&gt;(this: T, handler: (this: T, ev: E) => void): T', content: [
                        '<h4>Add an event handler.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'handler', type: 'function', content: 'A handler to add.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'T', content: 'Return <mark>this</mark> context.' },
                    ]
                }
            ]
        }
    ]
});

// Intell.IGetRectWhenShowAtOption
o.push({
    _: 'default', id: 'IGetRectWhenShowAtOption', icon: 'interface', syntax: 'interface IGetRectWhenShowAtOption { }', syntax_language: 'typescript', content: [
        {
            _: 'item-members', content: [
                { _: 'sproperty', name: 'insideRect', icon: 'field', type: 'Rectangle', content: 'The rectangle popup must be placed inside.' },
                { _: 'sproperty', name: 'space', icon: 'field', type: 'number', content: 'The minimum distance in pixel between popup and target.' },
                { _: 'sproperty', name: 'margin', icon: 'field', type: 'number', content: 'The minimum distance in pixel between popup and insideRect.' }
            ]
        },
        
    ]
});
// Intell.IGetRectWhenShowAtResult
o.push({
    _: 'default', id: 'IGetRectWhenShowAtResult', icon: 'interface', syntax: 'interface IGetRectWhenShowAtResult { }', syntax_language: 'typescript', content: [
        {
            _: 'item-members', content: [
                { _: 'property', name: 'location', icon: 'field', type: 'number', content: 'The location of result.' },
                { _: 'property', name: 'position', icon: 'field', type: 'Rectangle', content: 'The rectangle of result.' },
                { _: 'property', name: 'perfect', icon: 'field', type: 'boolean', content: 'true if reaches all input conditions.' },
                { _: 'property', name: 'canSeeTarget', icon: 'field', type: 'boolean', content: 'true if can see target, false if popup overlay target.' },
            ]
        },

    ]
});

// Intell.IShowAtOption
o.push({
    _: 'default', id: 'IShowAtOption', icon: 'interface', syntax: 'interface IShowAtOption extends IGetRectWhenShowAtOption { }', syntax_language: 'typescript', content: [
        {
            _: 'item-members', content: [
                { _: 'property', name: 'insideWindow', icon: 'field', type: 'boolean', content: 'Must place inside window.' },
                { _: 'property', name: 'insideOffsetParent', icon: 'field', type: 'boolean', content: 'Must place inside its offset parent.' },
                { _: 'property', name: 'insideRect', icon: 'field', type: 'Rectangle', content: 'The rectangle popup must be placed inside.' },
                { _: 'property', name: 'space', icon: 'field', type: 'number', content: 'The minimum distance between popup and target.' },
                { _: 'property', name: 'margin', icon: 'field', type: 'number', content: 'The minimum distance between popup and insideRect.' },

            ]
        },

    ]
});
// Intell.IShowAtResult
o.push({
    _: 'default', id: 'IShowAtResult', icon: 'interface', syntax: 'interface IShowAtResult { }', syntax_language: 'typescript', content: [
        {
            _: 'item-members', content: [
                { _: 'property', name: 'results', icon: 'field', type: 'IGetRectWhenShowAtResult[]', type_ref: '#Intell.IGetRectWhenShowAtResult', content: 'List of result.' },
                { _: 'property', name: 'location', icon: 'field', type: 'number', content: 'The location of result.' },
                { _: 'property', name: 'position', icon: 'field', type: 'Rectangle', content: 'The rectangle of result.' },
                { _: 'property', name: 'perfect', icon: 'field', type: 'boolean', content: 'true if reaches all input conditions.' },
                { _: 'property', name: 'canSeeTarget', icon: 'field', type: 'boolean', content: 'true if can see target, false if popup overlay target.' },
            ]
        },

    ]
});