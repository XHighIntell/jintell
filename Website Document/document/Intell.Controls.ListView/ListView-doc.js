/** @type {docObjContent[]} */
var o = [];



var treeview = {
    id: 'TreeView', name: 'TreeView', icon: 'class', content: [
        '<h4>Displays a hierarchical collection of labeled items, each represented by a TreeNode.</h4>',
        { _: 'item-members', content: [] }
    ]
};
/** @type {docObjContent[]} */
var treeview_members = treeview.content[1].content;
// new TreeView
treeview_members.push({
    _: 'property', id: 'TreeView.constructor', syntax: 'new', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'new TreeView(): TreeView', content: [
                    '<h4>Initializes a new instance of the TreeView class.</h4>',

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeView', type_ref: '#TreeView', content: 'Return the new TreeView.' }
                ]
            },
            {
                syntax: 'new TreeView(element: HTMLElement): TreeView', content: [
                    '<h4>Initializes a new instance of the TreeView class with specified element.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The element have been created before.' },

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeView', type_ref: '#TreeView', content: 'Return the new TreeView.' }
                ]
            },
        ]

    }
});
// TreeView.element
treeview_members.push({
    _: 'property', id: 'TreeView.element', name: 'element', type: 'HTMLElement', icon: 'property', content: [
        'Gets the element of TreeView.'
    ]
});
// TreeView.selectedNode
treeview_members.push({
    _: 'property', id: 'TreeView.selectedNode', name: 'selectedNode', type: 'TreeNode', type_ref: '#TreeNode', icon: 'property', content: [
        'Gets or sets the tree node that is currently selected in the tree view control.'
    ]
});
// TreeView.children
treeview_members.push({
    _: 'property', id: 'TreeView.children', name: 'children', type: 'TreeNode[]', type_ref: '#TreeNode[]', icon: 'property', content: [
        'Gets the collection of tree nodes that are assigned to the tree view control.'
    ]
});

// TreeView.add
treeview_members.push({
    id: 'TreeView.add', name: 'add', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    syntax: 'add(name: string): TreeNode', content: [
                        '<h4>Adds a new tree node with the specified label text to the end of the current tree node collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'name', type: 'string', content: 'The label text displayed by the TreeNode.' },
                        
                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'Return the new TreeNode added.' }
                    ]
                },
                {
                    syntax: 'add(node: TreeNode): void', content: [
                        '<h4>Adds a previously created tree node to the end of the tree node collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'node', type: 'TreeNode', type_ref: '#TreeNode', content: 'The TreeNode to add to the collection.' },
                    ]
                },
                {
                    syntax: 'add(option: TreeNodeOption): TreeNode', content: [
                        '<h4>Adds a new tree node with the specified properties to the end of the current tree node collection.</h4>',
                        '<h2>Parameters</h2>',
                        { _: 'parameter', name: 'option', type: 'TreeNodeOption', type_ref: '#TreeNodeOption', content: 'The specified properties to create TreeNode.' },

                        '<h2>Return</h2>',
                        { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'TreeNode that represents the tree node being added to the collection.' }
                    ]
                }

            ]
        }
    ]
});
// TreeView.clear
treeview_members.push({
    id: 'TreeView.clear', name: 'clear', icon: 'method', content: [
        {
            _: 'overloads', overloads: [
                {
                    syntax: 'clear(): void', content: [
                        '<h4>Removes all tree nodes from the collection.</h4>',
                    ]
                }
            ]
        }
    ]
});

// TreeView.onnodeclick
treeview_members.push({
    id: 'TreeView.onnodeclick', name: 'onnodeclick', icon: 'event', content: [
        '<h4> Occurs when the user clicks a TreeNode with the mouse.</h4>',

        { _: 'code-block', code: 'onnodeclick(handler: (this: TreeView, e: object) => void): TreeView', language:'typescript' },
        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'TreeView', type_ref: '#TreeView', content: 'The source of the event.' },
                        {
                            _: 'parameter', name: 'e', type: 'object', content: {
                                _: 'item-members', content: [
                                    { _: 'parameter', name: 'node', type: 'TreeNode', type_ref: '#TreeNode', content: 'The source of the event.' },
                                    { _: 'parameter', name: 'event', type: 'MouseEvent', content: 'The source of the event.' }
                                ]
                            }
                        }

                    ]
                }
            ]
        },
    ]
});
// TreeView.onnodeexpand
treeview_members.push({
    id: 'TreeView.onnodeexpand', name: 'onnodeexpand', icon: 'event', content: [
        '<h4>Occurs before the tree node is expanded.</h4>',

        { _: 'code-block', code: 'onnodeexpand(handler: (this: TreeView, e: object) => void): TreeView', language: 'typescript' },
        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'TreeView', type_ref: '#TreeView', content: 'The source of the event.' },
                        {
                            _: 'parameter', name: 'e', type: 'object', content: {
                                _: 'item-members', content: [
                                    { _: 'parameter', name: 'node', type: 'TreeNode', type_ref: '#TreeNode', content: 'The source of the event.' },
                                    { _: 'parameter', name: 'event', type: 'MouseEvent', content: 'The source of the event.' }
                                ]
                            }
                        }

                    ]
                }
            ]
        },
    ]
});

o.push(treeview);


var treenode = {
    id: 'TreeNode', name: 'TreeNode', icon: 'class', content: [
        '<h4>Represents a node of a TreeNode.</h4>',
        { _: 'item-members', content: [] }
    ]
};
/** @type {docObjContent[]} */
var treenode_members = treenode.content[1].content;
// new TreeNode
treenode_members.push({
    _: 'property', id: 'TreeNode.constructor', syntax: 'new', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'new TreeNode(): TreeNode', content: [
                    '<h4>Initializes a new instance of the TreeNode class.</h4>', 

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'Return the new TreeNode.' }
                ]
            },
            {
                syntax: 'new TreeNode(element: HTMLElement): TreeNode', content: [
                    '<h4>Initializes a new instance of the TreeNode class with specified element.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The element have been created before.' },

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'Return the new TreeNode.' }
                ]
            },
        ]
        
    }
});

// treenode.element
treenode_members.push({
    _: 'property', id: 'TreeNode.element', name: 'element', type: 'HTMLElement', icon: 'property', content: [
        'Gets the element of TreeView.'
    ]
});
// treenode.icon
treenode_members.push({
    _: 'property', id: 'TreeNode.icon', name: 'icon', type: 'string', icon: 'property', content: [
        'Gets or sets the icon of TreeNode.'
    ]
});

// treenode.name
treenode_members.push({
    _: 'property', id: 'TreeNode.name', name: 'name', type: 'string', icon: 'property', content: [
        'Gets or sets the name of TreeNode.'
    ]
});
// treenode.children
treenode_members.push({
    _: 'property', id: 'TreeNode.children', name: 'children', type: 'TreeNode[]', type_ref: '#TreeNode', icon: 'property', content: [
        'Gets the children node.'
    ]
});
// treenode.parent
treenode_members.push({
    _: 'property', id: 'TreeNode.parent', name: 'parent', type: 'TreeNode', type_ref: '#TreeNode', icon: 'property', content: [
        'Gets the parent tree node of the current tree node.'
    ]
});

// treenode.add
treenode_members.push({
    id: 'TreeNode.add', name: 'add', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'add(name: string): TreeNode', content: [
                    '<h4>Adds a new tree node with the specified label text to the end of the current tree node collection.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'name', type: 'string', content: 'The label text displayed by the TreeNode.' },

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'Return the new TreeNode added.' }
                ]
            },
            {
                syntax: 'add(node: TreeNode): void', content: [
                    '<h4>Adds a previously created tree node to the end of the tree node collection.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'node', type: 'TreeNode', content: 'The TreeNode to add to the collection.' },
                ]
            },
            {
                syntax: 'add(option: TreeNodeOption): TreeNode', content: [
                    '<h4>Adds a new tree node with the specified properties to the end of the current tree node collection.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'option', type: 'TreeNodeOption', content: 'The specified properties to create TreeNode.' },

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeNode', type_ref: '#TreeNode', content: 'TreeNode that represents the tree node being added to the collection.' }
                ]
            }

        ]
    }
});
// treenode.clear
treenode_members.push({
    id: 'TreeNode.clear', name: 'clear', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'clear(): void', content: [
                    '<h4>Removes all tree nodes from the collection.</h4>',
                ]
            }
        ]
    }
});
// treenode.remove
treenode_members.push({
    id: 'TreeNode.remove', name: 'remove', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'remove(): void', content: [
                    '<h4>Removes the current tree node from the tree view control.</h4>',
                ]
            }
        ]
    }
});
// treenode.removeChildren
treenode_members.push({
    id: 'TreeNode.removeChildren', name: 'removeChildren', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'removeChildren(node: TreeNode): void', content: [
                    '<h4>Removes a specified child node.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'node', type: 'TreeNode', type_ref: '#TreeNode', content: 'The TreeNode to remove from collection.' },
                ]
            }
        ]
    }
});

// TreeNode.showExpandButton
treenode_members.push({
    id: 'TreeNode.showExpandButton', name: 'showExpandButton', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'showExpandButton(): void', content: [
                    '<h4>Show expand button.</h4>'
                ]
            }
        ]
    }
});

// TreeNode.hideExpandButton
treenode_members.push({
    id: 'TreeNode.hideExpandButton', name: 'hideExpandButton', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'hideExpandButton(): void', content: [
                    '<h4>Hide expand button.</h4>'
                ]
            }
        ]
    }
});

o.push(treenode);


o.push('<h3>Static Methods</h3>');
// create
o.push({
    id: 'create', name: 'create', icon: 'method', content: {
        _: 'overloads', overloads: [
            {
                syntax: 'create(): TreeView', content: [
                    '<h4>Initializes a new instance of the TreeView class.</h4>',

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeView', type_ref: '#TreeView', content: 'Return the new TreeView created.' }
                ]
            },
            {
                syntax: 'create(element: HTMLElement): TreeView', content: [
                    '<h4>Initializes a new instance of the TreeView class.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'the element of TreeView.' },

                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'TreeView', type_ref: '#TreeView', content: 'Return the new TreeView created.' }
                ]
            }
        ]
    }
});




// Interfaces
o.push('<h3>Interfaces</h3>');
// TreeNodeOption
o.push({
    _: 'default', icon: 'interface', syntax: 'interface TreeNodeOption', syntax_language: 'typescript', id: 'TreeNodeOption', content: {
        _: 'item-members', content: [
            { _: 'sproperty', icon: 'field', name: 'icon    ', type: 'string', content: 'The html that place inside ".Label>.Icon".' },
            { _: 'sproperty', icon: 'field', name: 'name    ', type: 'string', content: 'The html that place inside ".Label>.Name".' },
        ]
    }

});