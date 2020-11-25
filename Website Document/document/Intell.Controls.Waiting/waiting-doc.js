
!function() {
    /** @type {docObjContent[]} */
    var o = window.o = [];

    var waiting = {
        id: 'Waiting', name: 'Waiting', icon: 'class', content: [
            '<h4>Displays a hierarchical collection of labeled items, each represented by a Menu.</h4>',
            { _: 'item-members', content: [] }
        ]
    };
    /** @type {docObjContent[]} */
    var waiting_members = waiting.content[1].content;
    
    waiting_members.push({
        _: 'property', id: 'Waiting.constructor', syntax: 'new', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'new Waiting(): Waiting', content: [
                        '<h4>Initializes a new instance of the Waiting class.</h4>',

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Waiting', type_ref: '#Waiting', content: 'Return the new Waiting.' }
                    ]
                },
                {
                    syntax: 'new Waiting(element: HTMLElement): Waiting', content: [
                        '<h4>Initializes a new instance of the Waiting class with specified element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The element have been created before.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Waiting', type_ref: '#Waiting', content: 'Return the new Waiting.' }
                    ]
                },
            ]

        }
    }); // new Waiting
    waiting_members.push({
        _: 'property', id: 'Waiting.element', name: 'element', type: 'HTMLElement', icon: 'property', content: [
            'Gets the element of this control.'
        ]
    }); // Waiting.element
    waiting_members.push({
        _: 'property', id: 'Waiting.parent', name: 'parent', type: 'HTMLElement', icon: 'property', content: [
            '<h4>Gets or sets the attached element of Waiting control.</h4>',
            '<h3>Remark</h3>',
            'Switch attached element while enabled won\'t stop.'
        ]
    }); // Waiting.parent
    waiting_members.push({
        _: 'property', id: 'Waiting.enabled', name: 'enabled', type: 'HTMLElement', default: 'null', icon: 'property', content: [
            '<h4>Gets or sets whether the control is running. If false stop, remove WAITING class from parent and remove this control element from its parent.</h4>'
        ]
    }); // Waiting.enabled


    o.push(waiting);


    o.push('<h3>Static Methods</h3>');
    o.push({
        id: 'startWait', name: 'startWait', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'startWait(parent: HTMLElement, elementAbstract?: HTMLElement): Waiting', content: [
                        '<h4>A shortcut way to create or reuse Waiting control that stores inside the specified element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'parent', type: 'HTMLElement', content: 'The element to attach.' },
                        { _: 'parameter', name: 'elementAbstract', type: 'HTMLElement', content: 'The abstract element that Waiting control will be cloned from.' },


                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Waiting', type_ref: '#Waiting', content: 'Return the new Waiting or the control that created before.' }
                    ]
                },
            ]
        }
    }); // startWait
    o.push({
        id: 'stopWait', name: 'stopWait', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'stopWait(parent: HTMLElement): Waiting', content: [
                        '<h4>A shortcut way to call stop wait of the specified element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'parent', type: 'HTMLElement', content: 'The attached element.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Waiting', type_ref: '#Waiting', content: 'Return the Waiting control if exist.' },
                        '<h2>Remark</h2>',
                        '<h4>The function won\'t throw exception.</h4>',
                    ]
                },
            ]
        }
    }); // stopWait



}();