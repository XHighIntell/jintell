
!function() {



    /** @type {docObjContent[]} */
    var o = window.o = [];



    var menu = {
        id: 'Menu', name: 'Menu', icon: 'class', content: [
            '<h4>Displays a hierarchical collection of labeled items, each represented by a Menu.</h4>',
            { _: 'item-members', content: [] }
        ]
    };
    /** @type {docObjContent[]} */
    var treeview_members = menu.content[1].content;
    // new Menu
    treeview_members.push({
        _: 'property', id: 'Menu.constructor', syntax: 'new', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'new Menu(): Menu', content: [
                        '<h4>Initializes a new instance of the TreeView class.</h4>',

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Menu', type_ref: '#Menu', content: 'Return the new TreeView.' }
                    ]
                },
                {
                    syntax: 'new Menu(element: HTMLElement): Menu', content: [
                        '<h4>Initializes a new instance of the TreeView class with specified element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The element have been created before.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'Menu', type_ref: '#Menu', content: 'Return the new TreeView.' }
                    ]
                },
            ]

        }
    });
    // Menu.element
    treeview_members.push({
        _: 'property', id: 'Menu.element', name: 'element', type: 'HTMLElement', icon: 'property', content: [
            'Gets the element of Menu.'
        ]
    });
    // Menu.elementChildren
    treeview_members.push({
        _: 'property', id: 'Menu.elementChildren', name: 'elementChildren', type: 'HTMLElement', icon: 'property', content: [
            'Gets the children element of menu.'
        ]
    });
    // Menu.elementItemAbstract
    treeview_members.push({
        _: 'property', id: 'Menu.elementItemAbstract', name: 'elementItemAbstract', type: 'HTMLElement', default: 'null', icon: 'property', content: [
            'Gets the default element that will be used to clone for new MenuItem of menu.'
        ]
    });
    // Menu.children
    treeview_members.push({
        _: 'property', id: 'Menu.children', name: 'children', type: 'MenuItem', type_ref: '#MenuItem', default: 'null', icon: 'property', content: [
            'Gets all the items that belong to <a href="#Menu">Menu</a>.'
        ]
    });
    // Menu.showOnHover
    treeview_members.push({
        _: 'property', id: 'Menu.showOnHover', name: 'showOnHover', type: 'boolean', default: 'false', icon: 'property', content: [
            'Gets or sets a value indicating whether dropdown is displayed (also known as an popup element) when mouse enter.'
        ]
    });
    
    treeview_members.push({
        _: 'property', id: 'Menu.rootLocations', name: 'rootLocations', type: 'number[]', default: '[9, 1]', icon: 'property', content: [
            'Gets or sets locations indicating where root <mark>".Children"</mark> is placed when popup.'
        ]
    }); // Menu.rootLocations
    treeview_members.push({
        _: 'property', id: 'Menu.rootOption', name: 'rootOption', type: '/Intell#IShowAtOption', default: '{ insideWindow: true, space: -1 }', icon: 'property', content: [
            'Gets the extra option for position of root menu\'s dropdown.'
        ]
    }); // Menu.rootOption
    treeview_members.push({
        _: 'property', id: 'Menu.rootDelayHideTime', name: 'rootDelayHideTime', type: 'number', default: '0', icon: 'property', content: [
            'Gets or sets delay time for elementChildren at root level.',
        ]
    }); // Menu.rootDelayHideTime

    treeview_members.push({
        _: 'property', id: 'Menu.popupLocations', name: 'popupLocations', type: 'number[]', default: '[4, 12]', icon: 'property', content: [
            'Gets or sets locations indicating where <mark>".Children"</mark> is placed when popup.'
        ]
    }); // Menu.popupLocations
    treeview_members.push({
        _: 'property', id: 'Menu.popupOption', name: 'popupOption', type: '/Intell#IShowAtOption', default: '{ insideWindow: true, margin: 0 }', icon: 'property', content: [
            "Gets or sets the extra option for position of elementChildren is placed when popup."
        ]
    }); // Menu.popupOption
    treeview_members.push({
        _: 'property', id: 'Menu.popupdelayHideTime', name: 'popupdelayHideTime', type: 'number', default: '500', icon: 'property', content: [
            'Gets or sets delay time for elementChildren.',
        ]
    }); // Menu.popupdelayHideTime


    treeview_members.push({
        id: 'Menu.add', name: 'add', icon: 'method', content: [
            {
                _: 'overloads', overloads: [
                    {
                        syntax: 'add(name: string): MenuItem', content: [
                            '<h4>Adds a new MenuItem with the specified label text to the end of the collection.</h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'name', type: 'string', content: 'The label text displayed by the MenuItem.' },

                            '<h2>Return</h2>',
                            { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'Return the new MenuItem added.' }
                        ]
                    },
                    {
                        syntax: 'add(item: MenuItem): void', content: [
                            '<h4>Adds a previously created menu item to the end of the collection.</h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'item', type: 'MenuItem', type_ref: '#MenuItem', content: 'The MenuItem to add to the collection.' },
                        ]
                    },
                    {
                        syntax: 'add(option: MenuItemOption): MenuItem', content: [
                            '<h4>Adds a new menu item with the specified properties to the end of the current collection.</h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'option', type: 'MenuItemOption', type_ref: '#MenuItemOption', content: 'The specified properties to create MenuItem.' },

                            '<h2>Return</h2>',
                            { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'MenuItem that being added to the Menu.' }
                        ]
                    }

                ]
            }
        ]
    }); // Menu.add
    treeview_members.push({
        id: 'Menu.clear', name: 'clear', icon: 'method', content: [
            {
                _: 'overloads', overloads: [
                    {
                        syntax: 'clear(): void', content: [
                            '<h4>Removes all menu items from the collection.</h4>',
                        ]
                    }
                ]
            }
        ]
    }); // Menu.clear

    
    treeview_members.push({
        id: 'Menu.ondropdownopen', name: 'ondropdownopen', icon: 'event', content: [
            '<h4> Occurs when dropdown is opened.</h4>',

            { _: 'code-block', code: 'ondropdownopen(handler: (this: Menu, e: object) => void): Menu', language: 'typescript' },
            '<h2>Parameters</h2>',
            {
                _: 'parameter', name: 'handler', type: 'function', content: [
                    'The handler to add.',
                    {
                        _: 'item-members', content: [
                            { _: 'parameter', name: 'this', type: 'Menu', type_ref: '#Menu', content: 'The source of the event.' },
                            {
                                _: 'parameter', name: 'e', type: 'object', content: {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'item', type: 'MenuItem', type_ref: '#MenuItem', content: 'The source of the event.' },
                                        { _: 'parameter', name: 'event', type: 'MouseEvent', content: 'The source of the event.' }
                                    ]
                                }
                            }

                        ]
                    }
                ]
            },
        ]
    }); // Menu.ondropdownopen
    treeview_members.push({
        id: 'Menu.ondropdownclose', name: 'ondropdownclose', icon: 'event', content: [
            '<h4>Occurs when dropdown is closed.</h4>',

            { _: 'code-block', code: 'ondropdownclose(handler: (this: Menu, e: object) => void): Menu', language: 'typescript' },
            '<h2>Parameters</h2>',
            {
                _: 'parameter', name: 'handler', type: 'function', content: [
                    'The handler to add.',
                    {
                        _: 'item-members', content: [
                            { _: 'parameter', name: 'this', type: 'Menu', type_ref: '#Menu', content: 'The source of the event.' },
                            {
                                _: 'parameter', name: 'e', type: 'object', content: {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'node', type: 'MenuItem', type_ref: '#MenuItem', content: 'The source of the event.' },
                                        { _: 'parameter', name: 'event', type: 'MouseEvent', content: 'The source of the event.' }
                                    ]
                                }
                            }

                        ]
                    }
                ]
            },
        ]
    }); // Menu.ondropdownclose
    treeview_members.push({
        id: 'Menu.onmenuitemclick', name: 'onmenuitemclick', icon: 'event', content: [
            '<h4>Occurs when the menu item is clicked.</h4>',

            { _: 'code-block', code: 'onmenuitemclick(handler: (this: Menu, e: object) => void): Menu', language: 'typescript' },
            '<h2>Parameters</h2>',
            {
                _: 'parameter', name: 'handler', type: 'function', content: [
                    'The handler to add.',
                    {
                        _: 'item-members', content: [
                            { _: 'parameter', name: 'this', type: 'Menu', type_ref: '#Menu', content: 'The source of the event.' },
                            {
                                _: 'parameter', name: 'e', type: 'object', content: {
                                    _: 'item-members', content: [
                                        { _: 'parameter', name: 'node', type: 'MenuItem', type_ref: '#MenuItem', content: 'The source of the event.' },
                                        { _: 'parameter', name: 'event', type: 'MouseEvent', content: 'The source of the event.' }
                                    ]
                                }
                            }

                        ]
                    }
                ]
            },
        ]
    }); // Menu.onmenuitemclick




    o.push(menu);


    var menuItem = {
        id: 'MenuItem', name: 'MenuItem', icon: 'class', content: [
            '<h4>Represents a node of a TreeNode.</h4>',
            { _: 'item-members', content: [] }
        ]
    };
    /** @type {docObjContent[]} */
    var menuItem_members = menuItem.content[1].content;
    
    menuItem_members.push({
        _: 'property', id: 'MenuItem.constructor', syntax: 'new', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'new MenuItem(): MenuItem', content: [
                        '<h4>Initializes a new instance of the MenuItem class.</h4>',

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'Return the new MenuItem.' }
                    ]
                },
                {
                    syntax: 'new MenuItem(element: HTMLElement): MenuItem', content: [
                        '<h4>Initializes a new instance of the MenuItem class with specified element.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The element have been created before.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'Return the new MenuItem.' }
                    ]
                },
            ]

        }
    }); // new MenuItem

    
    menuItem_members.push({
        _: 'property', id: 'MenuItem.element', name: 'element', type: 'HTMLElement', icon: 'property', content: [
            'Gets the element of MenuItem.'
        ]
    }); // MenuItem.element
    menuItem_members.push({
        _: 'property', id: 'MenuItem.elementLabel', name: 'elementLabel', type: 'HTMLElement', icon: 'property', content: [
            'Gets the elementLabel of MenuItem.'
        ]
    }); // MenuItem.elementLabel
    menuItem_members.push({
        _: 'property', id: 'MenuItem.elementIcon', name: 'elementIcon', type: 'HTMLElement', icon: 'property', content: [
            'Gets the elementIcon of MenuItem.'
        ]
    }); // MenuItem.elementIcon
    menuItem_members.push({
        _: 'property', id: 'MenuItem.elementName', name: 'elementName', type: 'HTMLElement', icon: 'property', content: [
            'Gets the elementName of MenuItem.'
        ]
    }); // MenuItem.elementName
    menuItem_members.push({
        _: 'property', id: 'MenuItem.elementChildren', name: 'elementChildren', type: 'HTMLElement', icon: 'property', content: [
            'Gets the elementChildren of MenuItem.'
        ]
    }); // MenuItem.elementChildren


    menuItem_members.push({
        _: 'property', id: 'MenuItem.icon', name: 'icon', type: 'string', icon: 'property', content: [
            'Gets or sets the icon of MenuItem.'
        ]
    }); // MenuItem.icon
    menuItem_members.push({
        _: 'property', id: 'MenuItem.name', name: 'name', type: 'string', icon: 'property', content: [
            'Gets or sets the name of MenuItem.'
        ]
    }); // MenuItem.name
    menuItem_members.push({
        _: 'property', id: 'MenuItem.children', name: 'children', type: 'MenuItem[]', type_ref: '#MenuItem', icon: 'property', content: [
            'Gets the children of MenuItem.'
        ]
    }); // MenuItem.children
    menuItem_members.push({
        _: 'property', id: 'MenuItem.parent', name: 'parent', type: 'MenuItem', type_ref: '#MenuItem', icon: 'property', content: [
            'Gets the parent of the MenuItem.'
        ]
    }); // MenuItem.parent

    menuItem_members.push({
        _: 'property', id: 'MenuItem.menu', name: 'parent', type: 'Menu', type_ref: '#Menu', icon: 'property', content: [
            'Gets the parent menu that the menu item is assigned to.'
        ]
    }); // MenuItem.menu
    menuItem_members.push({
        _: 'property', id: 'MenuItem.active', name: 'active', type: 'boolean', icon: 'property', content: [
            'Gets or set active state of MenuItem.',

            '<h3>Remark</h3>',

            'When set to true, other menuItem.active is set to false, its parent.active = true and parent.childrenVisible = true',
            '<br/>',
            'When set to false, its children.active will be set to false.'
        ]
    }); // MenuItem.active
    menuItem_members.push({
        _: 'property', id: 'MenuItem.childrenVisible', name: 'childrenVisible', type: 'boolean', icon: 'property', content: [
            'Gets or set visible state of elementChildren.',

            '<h3>Remark</h3>',

            'When set to true, other menuItem.childrenVisible will be set to false.',
            '<br/>',
            'When set to false, children of children will be hide too.'
        ]
    }); // MenuItem.childrenVisible

    // methods
    menuItem_members.push({
        id: 'MenuItem.add', name: 'add', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'add(name: string): MenuItem', content: [
                        '<h4>Adds a new menu item with the specified label text to the end of the current children collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'name', type: 'string', content: 'The label text displayed by the MenuItem.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'Return the new MenuItem added.' }
                    ]
                },
                {
                    syntax: 'add(item: MenuItem): void', content: [
                        '<h4>Adds a previously created menu item to the end of the menu item collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'item', type: 'MenuItem', content: 'The MenuItem to add to the collection.' },

                    ]
                },
                {
                    syntax: 'add(option: MenuItemOption): MenuItem', content: [
                        '<h4>Adds a new menu item with the specified properties to the end of the current collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'option', type: 'MenuItemOption', content: 'The specified properties to create MenuItem.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'MenuItem', type_ref: '#MenuItem', content: 'MenuItem that represents the menu item being added to the collection.' }
                    ]
                }

            ]
        }
    }); // MenuItem.add
    menuItem_members.push({
        id: 'MenuItem.clear', name: 'clear', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'clear(): void', content: [
                        '<h4>Removes all menu items from the collection.</h4>',
                    ]
                }
            ]
        }
    }); // MenuItem.clear
    menuItem_members.push({
        id: 'MenuItem.remove', name: 'remove', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'remove(): void', content: [
                        '<h4>Removes the current menu item from the menu control.</h4>',
                    ]
                }
            ]
        }
    }); // MenuItem.remove
    menuItem_members.push({
        id: 'MenuItem.removeChildren', name: 'removeChildren', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'removeChildren(item: MenuItem): void', content: [
                        '<h4>Removes a specified child menu item.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'item', type: 'MenuItem', type_ref: '#MenuItem', content: 'The MenuItem to remove from collection.' },
                    ]
                }
            ]
        }
    }); // MenuItem.removeChildren

    
    menuItem_members.push({
        id: 'MenuItem.showChildren', name: 'showChildren', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'showChildren(): void', content: [
                        '<h4>Show the elementChildren with target is elementLabel.</h4>'
                    ]
                },
                {
                    syntax: 'showChildren(target: HTMLElement): void', content: [
                        '<h4>Positions the Menu relative to the specified control location.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'target', type: 'HTMLElement', content: 'The target element.' },
                    ]
                },
                {
                    syntax: 'showChildren(x: number, y: number): void', content: [
                        '<h4>Positions the elementChildren to the specified page coordinates.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'x', type: 'number', content: 'The x-coordinate relative to page.' },
                        { _: 'parameter', name: 'y', type: 'number', content: 'The y-coordinate relative to page.' },
                    ]
                }
            ]
        } 
    }); // MenuItem.showChildren
    menuItem_members.push({
        id: 'MenuItem.hideChildren', name: 'hideChildren', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'hideChildren(): void', content: [
                        '<h4>Hide childrenElement.</h4>'
                    ]
                }
            ]
        }
    }); // MenuItem.hideChildren
    menuItem_members.push({
        id: 'MenuItem.hideChildrenImmediately', name: 'hideChildrenImmediately', icon: 'method', content: {
            _: 'overloads', overloads: [
                {
                    syntax: 'hideChildrenImmediately(): void', content: [
                        '<h4>Hide childrenElement immediately without "OUT" state class.</h4>'
                    ]
                }
            ]
        }
    }); // MenuItem.hideChildrenImmediately

    o.push(menuItem);


    //o.push('<h3>Static Methods</h3>');



    // Interfaces
    o.push('<h3>Interfaces</h3>');
    // MenuItemOption
    o.push({
        _: 'default', icon: 'interface', syntax: 'interface MenuItemOption', syntax_language: 'typescript', id: 'MenuItemOption', content: {
            _: 'item-members', content: [
                { _: 'sproperty', icon: 'field', name: 'icon    ', type: 'string', content: '.' },
                { _: 'sproperty', icon: 'field', name: 'name    ', type: 'string', content: '.' },
                { _: 'sproperty', icon: 'field', name: 'shortcut', type: 'string', content: '.' },
            ]
        }

    });


}();