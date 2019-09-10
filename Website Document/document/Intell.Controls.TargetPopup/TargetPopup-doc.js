/** @type {docObjContent[]} */
var o = [];


//value
o.push({
    _: 'property', id: 'target', name: 'target', type: 'HTMLElement', default: 'undefined', icon: 'property', content: [
        'Gets or sets the current target of popup.',
        '<h3>Remark</h3><h4>When sets target, control will call <mark>setTarget</mark> method with input argument.</h4>'
    ]
});
//autoHide
o.push({
    _: 'property', id: 'autoHide', name: 'autoHide', type: 'boolean', default: 'true', icon: 'property', content: 'Gets or sets a value indicating whether the popup hide on click outside the popup or target element.'
});
//locations
o.push({
    _: 'property', id: 'locations', name: 'locations', type: 'Array', default: '[1, 3, 9, 7]', icon: 'property', content: [
        'Gets or sets locations indicating where popup is displayed at.',
        '<h3>Remark</h3>',
        'This property will be pass to intell.showAt(target, popup, locations, option);'
    ]
});
//option
o.push({
    _: 'property', id: 'option', name: 'option', type: 'IShowAtOption', type_ref: '/Intell#IShowAtOption', default: '{ space: 5, margin: 4, insideWindow: true, insideOffsetParent: false }', icon: 'property', content: [
        'Gets or sets the extra option for position of popup.'
    ]
});

// previousSolution
o.push({
    _: 'property', id: 'previousSolution', name: 'previousSolution', type: 'Intell.IShowAtResult', type_ref: '/Intell#IShowAtResult', icon: 'property', content: 'Gets the return value from last call <mark>intell.showAt(...)</mark>'
});

//delayHideTime
o.push({
    _: 'property', id: 'delayHideTime', name: 'delayHideTime', type: 'number', default: '500', icon: 'property', content: 'Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide the popup element.'
});
//delayHideClass
o.push({
    _: 'property', id: 'delayHideClass', name: 'delayHideClass', type: 'string', default: '"OUT"', icon: 'property', content: 'Gets or sets the class name that set while waiting before hide.'
});
//activeClass
o.push({
    _: 'property', id: 'activeClass', name: 'activeClass', type: 'string', default: '"ACTIVE"', icon: 'property', content: 'Gets or sets the active class name that set to popup while displaying.'
});
//targetActiveClass
o.push({
    _: 'property', id: 'targetActiveClass', name: 'targetActiveClass', type: 'string', default: '"ACTIVE"', icon: 'property', content: 'Gets or sets the active class name that set to target while displaying.'
});

//setTarget
o.push({
    id: 'setTarget', name: 'setTarget', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    syntax: 'setTarget(target: Element): IShowAtResult', content: [
                        '<h4>Set target.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'Element', content: 'The target element.' },
                        
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '/Intell#IShowAtResult', content: 'Return the ShowAt result.' }
                    ]
                }
            ]
        }
    ]
});
o.push({
    id: 'show', name: 'show', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    syntax: 'show(target: Element): IShowAtResult', content: [
                        '<h4>Show popup at a target element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'Element', content: 'The target element.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '/Intell#IShowAtResult', content: 'Return the ShowAt result.' }
                    ]
                },
                {
                    syntax: 'show(target: Coordinates): IShowAtResult', content: [
                        '<h4>Show popup at a target coordinates that relative to the document.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'An object containing the properties top and left that relative to the document.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Intell.IShowAtResult', type_ref: '/Intell#IShowAtResult', content: 'Return the ShowAt result.' }
                    ]
                }
            ]
        }
    ]
});

//event onshow
o.push({
    id: 'onshow', name: 'onshow', icon: 'event', content: [
        '<h4>Occurs when popup element has changed from hide to show.</h4>',

        { _: 'code-block', code: 'onshow(handler: (this: TargetPopup) => void): TargetPopup', language:'typescript' },
        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'TargetPopup', type_ref: '#TargetPopup', content: 'The source of the event.' }

                    ]
                }
            ]
        },
    ]
});

//event onhide
o.push({
    id: 'onhide', name: 'onhide', icon: 'event', content: [
        '<h4>Occurs when popup element is hide.</h4>',

        { _: 'code-block', code: 'onhide(handler: (this: TargetPopup) => void): TargetPopup', language: 'typescript' },

        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'TargetPopup', type_ref: '#TargetPopup', content: 'The source of the event.' }

                    ]
                }
            ]
        },
    ]
});