/** @type {docObjContent[]} */
var o = [];


//value
o.push({
    _: 'property', id: 'value', name: 'value', type: 'array', default: '[]', icon: 'property', content: [
        'Gets or sets the values of tagsinput.',
        '<h3>Remark</h3>',
        '<h4>When gets value, control find elements with class name \'tag\' and return new array every time the method call. Repeating getter waste cpu and resource.</h4>'
    ]
});
//confirmKeys
o.push({
    _: 'property', id: 'confirmKeys', name: 'confirmKeys', type: 'array', default: '[9, 13]', icon: 'property', content: 'Gets or sets the confirm keys in keycode that will add new tag when press.'
});
//insertBeforeInput
o.push({
    id: 'insertBeforeInput', name: 'insertBeforeInput', icon: 'method', content: [
        '<h4>Inserts a tag specified by text into the postion before input.</h4>',
        {
            _: 'overloads', overloads: [{
                syntax: 'insertBeforeInput(tag: string): boolean', content: [
                    '<h4>Inserts a tag specified by text into the postion before input.</h4>',
                    '<h2>Parameters</h2>',
                    { _: 'parameter', name: 'tag', type: 'string', content: 'The new tag.' },

                    
                    '<h2>Return</h2>',
                    { _: 'parameter', type: 'boolean', content: '<mark>true</mark> if adding completes, <mark>false</mark> contains the name of an existing tag.' }
                ]
            }]
        }
    ]
});


//event onchange
o.push({
    id: 'onchange', name: 'onchange', icon: 'property', content: [
        '<h4>Occurs when the value of tag input has changed.</h4>',
        { _: 'code-block', code: 'onchange(handler: ((this: TagsInput) => void)): TagsInput', language: 'typescript' },

        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'TagsInput', type_ref: '#TagsInput', content: 'The source of the event.' }
                        
                    ]
                }
            ]
        },
    ]
});