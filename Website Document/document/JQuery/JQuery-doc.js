/** @type {docObjContent[]} */
var o = [];

//innerOffset
o.push({
    id: 'innerOffset', name: 'innerOffset', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    _: 'default', syntax: 'innerOffset(): JQuery.Coordinates', syntax_language: "typescript", content: [
                        '<h4>Get the current inner coordinates (without border) of the first element in the set of matched elements, relative to the document.</h4>',
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'JQuery.Coordinates', type_ref: '#Coordinates', content: '<h4>The return value is similar as $.offset() but instead of return coordinates of <b>border</b>, it returns coordinates of <b>padding</b>.<h4>' }
                    ]
                }
            ]
        },

        '<h2>Example</h2>',
        '<a href="/Document/JQuery/innerOffset.html">Example 1</a>'
    ]
});

//centerOffset
o.push({
    id: 'centerOffset', name: 'centerOffset', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    _: 'default', syntax: 'centerOffset(): JQuery.Coordinates', syntax_language: "typescript", content: [
                        '<h4>Get the center coordinates of the first element in the set of matched elements, relative to the document.</h4>',
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'JQuery.Coordinates', type_ref: '#Coordinates', content: '<h4>The return value is similar as $.offset() but instead of return coordinates of <b>border</b>, it returns the center coordinates.<h4>' }
                    ]
                }
            ]
        }
    ]
});

//Events
//clickoutside
o.push({
    id: 'clickoutside', name: 'clickoutside', icon: 'event', content: [
        '<h4>The <mark>clickoutside</mark> event is sent to an element when the mouse pointer is <b>not</b> over the element, and the mouse pointer is pressed and released.</h4>',

        {
            _: 'overloads', overloads: [
                {
                    syntax: 'clickoutside(hander: (this: HTMLElement) => any): this', syntax_language: 'typescript', content: [
                        '<h4>Add an event handler to the "clickoutside" event.</h4>',

                        '<h2>Parameters</h2>',
                        {
                            _: 'parameter', name: 'handler', type: 'function', content: [
                                'The handler to add.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'this', type: 'HTMLElement', content: 'The source of the event.' }

                                    ]
                                }
                            ]
                        },




                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'JQuery&lt;HTMLElement&gt;', content: 'the return JQuery object.' }
                    ]
                }
            ]
        },
        '<h2>Example</h2>',
        { _: 'code-block', name:'AA', language: 'javascript', code: "$('#btn1').clickoutside(function() {\r\n    alert('User clicked outside button');\r\n});" }
    ]
});


//Interfaces
o.push('<h3>Interfaces</h3>');
o.push({
    id: 'Coordinates', syntax: 'interface Coordinates { }', syntax_language: 'typescript', icon: 'interface', content: {
        _: 'item-members', content: [
            { _: 'sproperty', name: 'left', icon: 'field', type: 'number', content: 'Left.' },
            { _: 'sproperty', name: 'top', icon: 'field', type: 'number', content: 'Top.' }
        ]
    }
});
