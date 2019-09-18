/** @type {docObjContent[]} */
var o = [];
//Constructor
o.push({
    _: 'default', id: 'Constructor', name: 'Constructor', icon: 'method', content: [
        '<h4>Create a new NumericUpDown or get if it is created before.</h4>',
        {
            _: 'overloads',
            overloads:
                [
                    {
                        syntax: '(element: HTMLElement, option?: Intell.Controls.NumericUpDownOption): Intell.Controls.NumericUpDown', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.NumericUpDownOption', type_ref: '#NumericUpDownOption', content: 'Option.' }
                        ]
                    },
                    {
                        syntax: 'new (element: HTMLElement, option?: Intell.Controls.NumericUpDownOption): Intell.Controls.NumericUpDown', syntax_language: 'typescript', content: [
                            '<h4></h4>',
                            '<h2>Parameters</h2>',
                            { _: 'parameter', name: 'element', type: 'HTMLElement', content: 'The menu element.' },
                            { _: 'parameter', name: 'option', type: 'Intell.Controls.NumericUpDownOption', type_ref: '#NumericUpDownOption', content: 'Option.' }
                        ]
                    }
                ]
        }
    ]
});

//value
o.push({
    _: 'property', id: 'value', icon: 'property', name: 'value', type: 'number', default: 0, content: [
        'Gets or sets the value for the spin box. The default is parsed from <mark>input.value</mark> or <mark>0</mark>.',
        '<h3>Remark</h3>',
        '<h4>Try to parse value property of element input as default value; otherwise 0.</h4>'
    ]
});
//min
o.push({
    _: 'property', id: 'min', icon: 'property', name: 'min', type: 'number', default: 'undefined', content: [
        'Gets or sets the minimum value for the spin box. If undefined, there is no minimum enforced.',
        '<h3>Remark</h3>',
        '<h4>When the min property is set, the other properties may be set in cases. If the Minimum property is greater than the new Maximum property, the Maximum property value is set equal to the Minimum value. If the current Value is smaller than the new Minimum value. the Value property value is set equal to the Minimum value.</h4>'
    ]
});
//max
o.push({
    _: 'property', id: 'max', icon: 'property', name: 'max', type: 'number', default: 'undefined', content: [
        'Gets or sets the maximum value for the spin box. If undefined, there is no maximum enforced.',
        '<h3>Remark</h3>',
        '<h4>When the max property is set, the other properties may be set in cases. If the Minimum property is greater than the new Maximum property, the Minimum property value is set equal to the Maximum value. If the current Value is greater than the new Maximum value.the Value property value is set equal to the Maximum value.</h4>'
    ]
});
//increment
o.push({ _: 'property', id: 'increment', icon: 'property', name: 'increment',  type: 'number', default: 1,  content: 'Gets or sets the value to increment or decrement the spin box (also known as an up-down control) when the up or down buttons are clicked.' });
//unit
o.push({ _: 'property', id: 'unit', icon: 'property', name: 'unit', type: 'string', default: '""', content: 'Gets or sets the unit display for the spin box.' });

//decimalPlaces
o.push({ _: 'property', id: 'decimalPlaces', icon: 'property', name: 'decimalPlaces', type: 'string', default: '"."', content: 'Gets or sets the decimal place character of the spin box.' });
//separate
o.push({ _: 'property', id: 'separate', icon: 'property', name: 'separate', type: 'string', default: '","', content: 'Gets or sets the separate character for thousands of the spin box.' });



//event onchange
o.push({
    _: 'property', id: 'onchange', icon: 'event', name: 'onchange', content: [
        '<h4>Occurs when the value of the spinner has changed and the input is no longer focused.</h4>',

        { _: 'code-block', language: 'typescript', code: 'onchange(handler: (this: NumericUpDown, ev: NumericUpDownOnchangeEvent) => void): NumericUpDown' },

        '<h2>Parameters</h2>',
        {
            _: 'parameter', name: 'handler', type: 'function', content: [
                'The handler to add.',
                {
                    _: 'item-members', content: [
                        { _: 'parameter', name: 'this', type: 'NumericUpDown', content: 'The source of the event.' },
                        {
                            _: 'parameter', name: 'event', type: 'Intell.Event', type_ref: '/Intell#Event', content: [
                                'The event object.',
                                {
                                    _: 'item-members', content: [
                                        { _: 'sproperty', name: 'oldValue', icon: 'field', type: 'number', content: 'The old value for the spin box.' },
                                        { _: 'sproperty', name: 'newValue', icon: 'field', type: 'number', content: 'The new value for the spin box.' }
                                    ]
                                }
                            ]

                        }
                    ]
                }
            ]
        },

        '<h2>Returns</h2>',
        { _: 'parameter', type: 'NumericUpDown', content: 'The NumericUpDown control.' },

        '<h2>Remark</h2>',
        'If preventDefault() is called, the NumericUpDown will keep oldValue.'
    ]
});
