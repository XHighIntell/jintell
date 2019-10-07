/** @type {docObjContent[]} */
var o = [];
//Constructor
o.push({
    _: 'default', id: 'Constructor', name: 'Constructor', icon: 'method', content: [
        '<h4>Create a new ComboBox or get if it is created before.</h4>',
        {
            _: 'overloads',
            overloads:
                [
                    {
                        syntax: '(element: HTMLElement, option?: Intell.Controls.ComboBoxOption): Intell.Controls.ComboBox', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.ComboBoxOption', type_ref: '#ComboBoxOption', content: 'Option.' }
                        ]
                    },
                    {
                        syntax: 'new (element: HTMLElement, option?: Intell.Controls.ComboBoxOption): Intell.Controls.ComboBox', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.ComboBoxOption', type_ref: '#ComboBoxOption', content: 'Option.' }
                        ]
                    }
                ]
        }
    ]
});


//popupLocations
o.push({
    _: 'property', icon: 'property', name: 'popupLocations', type: 'number[]', default: '[9, 1]', id: 'popupLocations', content: [
        '<h4>Gets or sets locations indicating where dropdown is displayed at.</h4>',
        '<h3>Remark</h3>',
        '<h4>This property will be pass to <mark>intell.showAt(combobox, dropdown, popupLocations, popupOption)</mark>.</h4>',
    ]
});
//popupOption
o.push({ _: 'property', icon: 'property', name: 'popupOption', type: 'IShowAtOption', type_ref: '/Intell#IShowAtOption', default: '{ insideWindow: true, space: -1 }', id: 'popupOption', content: 'Gets or sets the extra option for position of dropdown.' });


// enableDropdownArrow
o.push({
    _: 'property', icon: 'property', name: 'enableDropdownArrow', type: 'boolean', default: 'false', id: 'enableDropdownArrow', content: [
        'Gets or set a value indicating whether the menu turn on the feature automatically modify position of Arrow when open.',
        '<h3>Remark</h3>',
        "Menu finds 2 arrows $menu.find('>.Label>.Arrow') and $menu.find('>.X-Menu-Items>.Arrow'). If they are exist, do follow steps:",
        {
            _: 'list', content: [
                'Get center of <mark>>.Label>.Arrow</mark> by use it\'s outer width and outer height divide by 2.',
                'Set direction of <mark>>.X-Menu-Items>.Arrow</mark> by SetArrowDirection($arrow, e.result.location, center)',
            ]
        }
    ]
});

//  onchange
o.push({
    _: 'default', icon: 'event', name: 'onchange', id: 'onchange', content: [
        '<h4>Occurs when the selectedIndex property value changes.</h4>',
        { _: 'code-block', code: 'onchange(handler: (this: ComboBox, ev: object) => void): this', language:'typescript' },

        '<h2>Parameters</h2>',
        { _: 'parameter', name: 'this', type: 'ComboBox', content: 'The source of the event.' },
        
    ]
});
// onlabel
o.push({
    icon: 'event', name: 'onlabel', id: 'onlabel', content: [
        '<h4>Occurs before combobox display label.</h4>',
        { _: 'code-block', code: 'ondropdownclose(handler: (this: ComboBox, event: object) => void): this', language: 'typescript' },


        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'ComboBox', content: 'The source of the event.' },
                        {
                            _: 'parameter', name: 'event', type: 'Intell.Event', type_ref: '/Intell#Event', content: [
                                'The event object.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'sproperty', name: 'target', icon: 'field', type: 'HTMLElement', content: 'The element user clicked.' },
                                    ]
                                }
                            ]

                        }
                    ]
                }
            ]
        },

        '<h2>Returns</h2>',
        { _: 'parameter', type: 'ComboBox', content: 'The ComboBox control.' },

        '<h2>Remark</h2>',
        'If preventDefault() is called, the ComboBox won\'t do anything. It is useful if you want to customize label after selecting.'

    ],
});

