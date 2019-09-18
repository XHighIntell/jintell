/** @type {docObjContent[]} */
var o = [];
//Constructor
o.push({
    _: 'default', id: 'Constructor', name: 'Constructor', icon: 'method', content: [
        '<h4>Create a new Menu or get if it is created before.</h4>',
        {
            _: 'overloads',
            overloads:
                [
                    {
                        syntax: '(element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.Menu', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.MenuOption', type_ref: '#MenuOption', content: 'Option.' }
                        ]
                    },
                    {
                        syntax: 'new (element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.Menu', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.MenuOption', type_ref: '#MenuOption', content: 'Option.' }
                        ]
                    }
                ]
        }
    ]
});

// setItems
o.push({
    _: 'default', id: 'setItems', name: 'setItems', icon: 'method', content: [
        '<h4>Sets children menu item.</h4>',
        {
            _: 'overloads',
            overloads:
                [
                    {
                        syntax: 'function setItems(items: IMenuItem[]): void', content: [
                            '<h4>Replaces the children items with specified list of items.</h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'items', type: 'IMenuItem[]', type_ref: '#IMenuItem', content: 'Array of menu items.' }
                        ]
                    }
                ]
        },
        '<h2>Example</h2>',
        { _: 'code-block', name: 'Javascript', language: 'javascript', code: "var menu1 = intell.controls.Menu($('#menu1'));\nvar items = [\n    { icon: '', name: '1111', shortcut: 'Alt+F12' },\n    {\n        icon: '', name: '2222', items: [\n            { name: '2222-1' }, { name: '2222-2' }, '-', { name: '2222-3' }\n        ]\n    }\n];\nmenu1.setItems(items);" }
    ]
});
// show
o.push({
    name: 'show', icon: 'method', id: 'show', content: [{
        _: 'overloads',
        overloads: [
            {
                _: 'default', syntax: 'function show(element?: HTMLElement): void', content: [
                    '<h4>Show menu\'s dropdown at target element.</h4>', 
                    '<h2>Parameters</h2>',

                    { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The target element.' },
                ]
            },
            {
                _: 'default', syntax: 'function show(offset: JQuery.CoordinatesPartial): void', content: [
                    '<h4>Show menu\'s dropdown at point that relative to the document.</h4>',
                    '<h2>Parameters</h2>',

                    { _: 'parameter', name: 'offset', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'The position relative to the document.' },
                ]
            }
        ]
    }]
});
// hide
o.push({
    name: 'hide', icon: 'method', id: 'hideDropDown', content: [
        {
            _: 'overloads', overloads: [
                { _: 'default', syntax: 'function hide(): void', content: '<h4>Hide menu\'s dropdown.</h4>' }

            ]
        }
    ]
}); 
// isVisible 
o.push({
    _: 'property', icon: 'property', name: 'isVisible', type: 'boolean', id: 'isVisible', content: [
        'Gets a value indicating whether this menu are shown. This property is read-only.',
        '<h3>Remark</h3>',
        '<h4><mark>true</mark> when menu are shown or in fade out processing. When <mark>false</mark> the menu is completely invisible (display: none). <br/> Here is 4 cases of menu:</h4>',
        {
            _: 'list', content: [
                '<div>Invisible - <mark>false</mark></div>',
                '<div>Visible, Fadeout - <mark>true</mark></div>',
                '<div>Visible, Fadein - <mark>true</mark>(We don\'t have this state, because CSS will do it by set class name as FIRST)</div>',
                '<div>Visible completely - <mark>true</mark></div>'
            ]
        }
    ]
});
//isFadingOut
o.push({
    _: 'property', icon: 'property', name: 'isFadingOut', type: 'boolean', id: 'isFadingOut', content: [
        'Gets a value indicating whether this menu are fading out. This property is read-only.'
    ]
});
//showOnHover
o.push({ _: 'property', icon: 'property', name: 'showOnHover', type: 'boolean', default: 'false', id: 'showOnHover', content: 'Gets or sets a value indicating whether dropdown is displayed(also known as an popup element) when mouse enter.' });
//rootLocations
o.push({
    _: 'sproperty', icon: 'property', name: 'rootLocations', type: 'number[]', default: '[9, 1]', id: 'rootLocations', content: [
        'Gets or sets locations indicating where root dropdown is displayed at.</b>',
        '<h3>Remark</h3>',
        '<h4>This property will be pass to intell.showAt(menu, dropdown, rootLocations, rootOption);</h4>'
    ]
});
//rootOption
o.push({ _: 'property', icon: 'property', name: 'rootOption', type: 'IShowAtOption', type_ref: '/Intell#IShowAtOption', default: '{ space: -1, insideWindow: true }', id: 'rootOption', content: 'Gets the extra option for position of root menu\'s dropdown.' });
//popupLocations
o.push({
    _: 'property', icon: 'property', name: 'popupLocations', type: 'number[]', default: '[4, 12]', id: 'popupLocations', content: [
        '<h4>Gets or sets locations indicating where child\'s dropdown is displayed at.</h4>',
        '<h3>Remark</h3>',
        '<h4>This property will be pass to <mark>intell.showAt(menu, dropdown, popupLocations, popupOption)</mark>.</h4>',
    ]
});
//popupOption
o.push({ _: 'property', icon: 'property', name: 'popupOption', type: 'IShowAtOption', type_ref: '/Intell#IShowAtOption', default: '{ insideWindow: true }', id: 'popupOption', content: 'Gets or sets the extra option for position of child\'s dropdown.' });

// delayHideTime
o.push({
    _: 'property', icon: 'property', name: 'delayHideTime', id: 'delayHideTime', type: 'number', default: 500, content: [
        'Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide \'.X-Menu-Items\'.',
        '<h2>Remark</h2>',
        'This value isn\'t for root.',
    ]
});
// delayHideClass
o.push({
    _: 'property', icon: 'property', name: 'delayHideClass', id: 'delayHideClass', type: 'string', default: 'OUT', content: [
        'Gets or sets the class name that set while waiting before hide. The default is "<b>OUT</b>".'
    ]
});

// rootDelayHideTime
o.push({
    _: 'property', name: 'rootDelayHideTime', icon: 'property', id: 'rootDelayHideTime', type: 'number', default: 0, content: [
        'Gets or sets delay time for root X-Menu-Items.'
    ]
});
// firstActiveClass
o.push({
    _: 'property', name: 'firstActiveClass', icon: 'property', id: 'firstActiveClass', type: 'string', default: '"FIRST"', content: [
        'Gets or sets the class name that set when a X-Menu is opened first.'
    ]
});

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
//  ondropdownopen
o.push({
    _: 'default', icon: 'event', name: 'ondropdownopen', id: 'ondropdownopen', content: [
        '<h4>Occurs when dropdown is opened.</h4>',
        { _: 'code-block', code: 'ondropdownopen(handler: (this: Menu, ev: object) => void): this', language:'typescript' },

        '<h2>Parameters</h2>',
        { _: 'parameter', name: 'this', type: 'Menu', content: 'The source of the event.' },
        {
            _: 'parameter', name: 'event', type: 'object', content: [
                'The event object.',
                {
                    _: 'item-members', content: [
                        { _: 'sproperty', name: 'result', icon: 'field', type: 'Intell.IShowAtResult', type_ref: '/Intell#IShowAtResult', content: 'The result of show destination.' }
                    ]
                }
            ]

        },
        
    ]
});
// ondropdownclose
o.push({
    icon: 'event', name: 'ondropdownclose', id: 'ondropdownclose', content: [
        '<h4>Occurs when dropdown is closed.</h4>',
        { _: 'code-block', code: 'ondropdownclose(handler: (this: Menu) => void): this', language: 'typescript' },

        '<h2>Parameters</h2>',
        { _: 'parameter', name: 'this', type: 'Menu', content: 'The source of the event.' },
    ],
});
// onmenuitemclick
o.push({
    icon: 'event', name: 'onmenuitemclick', id: 'onmenuitemclick', content: [
        '<h4>Occurs when the menu item is clicked.</h4>',
        { _: 'code-block', code: 'onmenuitemclick(handler: (this: Menu, ev: Intell.Event) => void): this', language: 'typescript' },

        '<h2>Parameters</h2>',
        { _: 'parameter', name: 'this', type: 'Menu', content: 'The source of the event.' },
        { _: 'parameter', name: 'event', type: 'Intell.Event', type_ref: '/Intell#Event', content: 'The event object.' },

        
        '<h3>Remark</h3>',
        '<h4>Only occurs when user clicks a \'.X-Menu-Item\' that have zero items. If preventDefault() is called, the dropdown will keep opening instead of close.</h4>',
    ]
});

o.push('<h3>Static Methods</h3>');
// SetArrowDirection
o.push({
    name: 'SetArrowDirection', icon: 'method', id: 'SetArrowDirection', content: [
        {
            _: 'overloads',
            overloads: [
                {
                    _: 'default', 
                    syntax: 'SetArrowDirection(arrow: Element, location: number, offset: JQuery.Coordinates): void',
                    syntax_language: 'typescript',
                    content: [
                        '<h4>Set arrow direction specified by location.</h4>',
                        '<h2>Parameters</h2>',                        
                        { _: 'parameter', name: 'arrow', type: 'Element', content: 'The arrow element.' },
                        { _: 'parameter', name: 'location', type: 'number', content: 'The location menu shown. <br/>The location is same as <mark>rootLocation</mark>.' },
                        { _: 'parameter', name: 'offset', type: 'JQuery.Coordinates', type_ref: '/JQuery#Coordinates', content: 'The target offset.' },

                        '<h3>Remark</h3>',
                        'The arrow element also receives class names as LEFT, TOP, RIGHT and DOWN depend on location.'
                    ]
                }

            ]
        }
    ]
}); 

// Interfaces
o.push('<h3>Interfaces</h3>');
// IMenuItem
o.push({
    _: 'default', icon: 'interface', syntax: 'interface IMenuItem { }', syntax_language: 'typescript', id: 'IMenuItem', content: {
        _: 'item-members', content: [
            { _: 'sproperty', icon: 'field', name: 'icon    ', type: 'string', content: 'The html that place inside ".Label>.Icon".' },
            { _: 'sproperty', icon: 'field', name: 'name    ', type: 'string', content: 'The html that place inside ".Label>.Name".' },
            { _: 'sproperty', icon: 'field', name: 'shortcut', type: 'string', content: 'The html that place inside ".Label>.Shortcut".' },
            { _: 'sproperty', icon: 'field', name: 'items   ', type: 'IMenuItem[]', type_ref: '#IMenuItem', content: 'Array of children item.' },
        ]
    }

});

var oo = {
    _: 'default', icon: 'field', name: 'items', property: [{ name: 'type', value: 'IMenuItem[]', ref: '#IMenuItem' }, { name: 'default', value: 'undefined', ref: '' }], content: 'Array of children item.'
};