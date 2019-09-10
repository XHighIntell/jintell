/** @type {docObjContent[]} */
var o = [];

//index
o.push({
    _: 'property', id: 'index', name: 'index', type: 'number', default: -1, icon: 'property', content: 'Gets or sets index of slider.'
});
//interval
o.push({
    _: 'property', id: 'interval', name: 'interval', type: 'number', default: 5000, icon: 'property', content: [
        'Gets or sets the interval, expressed in milliseconds, at which to raise next function.',
        '<h3>Remark</h3>',
        'When change interval, the effect take for next slider.'
    ]
});
//count
o.push({
    _: 'property', id: 'count', name: 'count', type: 'number', default: 5000, icon: 'property', content: [
        '<h4>Gets numbers of slider.</h4>',
        '<h3>Remark</h3>',
        '<h4>When gets value, control find elements with class name \'>.X-Slideshow-Item\' and return length array every time the method call. Repeating getter waste cpu and resource.</h4>'
    ]
});

//delayHideTime
o.push({
    _: 'property', id: 'delayHideTime ', name: 'delayHideTime ', type: 'number', default: 1000, icon: 'property', content: 'Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide the current slider.'
});
//delayHideClass
o.push({
    _: 'property', id: 'delayHideClass', name: 'delayHideClass', type: 'string', default: '"OUT"', icon: 'property', content: 'Gets or sets the class name that set while waiting before hide.'
});
//activeClass
o.push({
    _: 'property', id: 'activeClass   ', name: 'activeClass   ', type: 'string', default: '"ACTIVE"', icon: 'property', content: 'Gets or sets the active class name that set to active slider.'
});

//inClass
o.push({
    _: 'property', id: 'inClass', name: 'inClass', type: 'string', default: '"IN"', icon: 'property', content: [
        'Gets or sets the effect class name that set to slider that is fading in.',
        '<h3>Remark</h3>',
        'The effect class name isn\'t removed by control after slider already faded in.',
    ]
});

//nextInClass
o.push({
    _: 'property', id: 'nextInClass', name: 'nextInClass', type: 'string', default: '"NEXT-IN"', icon: 'property', content: [
        'Gets or sets the effect class name that set to slider that is fading in by a next function.',
        '<h3>Remark</h3>',
        'The effect class name isn\'t removed by control after slider already faded in.',
    ]
});
//prevInClass
o.push({
    _: 'property', id: 'prevInClass', name: 'prevInClass', type: 'string', default: '"PREV-IN"', icon: 'property', content: [
        'Gets or sets the effect class name that set to slider that is fading in by a previous fucntion.',
        '<h3>Remark</h3>',
        'The effect class name isn\'t removed by control after slider already faded in.',
    ]
});
//next
o.push({
    id: 'next', name: 'next', icon: 'method', content: [
        {
            _: 'overloads', overloads: [{
                syntax: 'next(): void', syntax_language: 'typescript', content: [
                    '<h4>Go to the next element of the slideshow.</h4>',
                ]
            }]
        }
    ]
});
//prev
o.push({
    id: 'prev', name: 'prev', icon: 'method', content: [
        {
            _: 'overloads', overloads: [{
                syntax: 'prev(): void', syntax_language: 'typescript', content: [
                    '<h4>Go to the previous element of the slideshow.</h4>',
                ]
            }]
        }
    ]
});
//setIndex
o.push({
    id: 'setIndex', name: 'setIndex', icon: 'method' , content: [
        {
            _: 'overloads', overloads: [{
                syntax: 'setIndex(newIndex: number, action?: string): void', content: [
                    '<h4>Go to the previous element of the slideshow.</h4>',
                    '<h2>Parameters</h2>',

                    { _: 'parameter',  name: 'newIndex', type: 'number', content: 'The new index' },
                    {
                        _: 'parameter', name: 'action', type: 'string', content: [
                            'The action name ("next" or "prev")',
                            '<h4>If undefined, "next" will be used when newIndex is greater than index otherwise "previous"</h4>'
                        ]
                    }
                ]
            }]
        }
    ]
});
//start
o.push({
    id: 'start', name: 'start', icon: 'method', content: [
        {
            _: 'overloads', overloads: [{
                syntax: 'start(): void', content: [
                    '<h4>Starts the timer that raising the <mark>next</mark> function automatically repeat.</h4>',
                    '<h3>Remark</h3>',
                    '<h4>The timer use <mark>interval</mark> property as interval.</h4>'
                ]
            }]
        }
    ]
});
//stop
o.push({
    id: 'stop', name: 'stop', icon: 'method', content: [
        {
            _: 'overloads', overloads: [{
                syntax: 'stop(): void', content: [
                    '<h4>Stops the timer that raising the <mark>next</mark> function.</h4>',
                ]
            }]
        }
    ]
});
// onchange
o.push({
    id: 'onchange', name: 'onchange', icon: 'event', content: [
        '<h4>Occurs when the slider of control has changed.</h4>',
        { _: 'code-block', code: 'onchange(handler: (this: Slideshow, ev: Intell.Event) => void): Slideshow', language: 'typescript' },

        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'Slideshow', content: 'The source of the event.' },
                        {
                            _: 'parameter', name: 'ev', type: 'Intell.Event', type_ref: '/Intell#Event', content: {
                                _: 'item-members', content: [
                                    { _: 'sproperty', name: 'target', icon: 'field', type: 'Element', content: 'The current slider.' },
                                ]
                            }
                        }
                    ]
                }
            ]
        },
    ]
});

