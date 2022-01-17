


intell.controls.Numeric = new function() {
    /** @type Intell.Controls.Numeric.Namespace */
    var NS; NS = this;

    
    var localeDecimalSeparator = (0.1).toLocaleString().substr(1, 1);   // "." in en-US
    var localeThousandSeparator = (1000).toLocaleString().substr(1, 1); // "," in en-US

    var Numeric = function() {

        var privateSymbol = Symbol ? Symbol('__private') : '__private';
        /** @param {HTMLElement} element @type Intell.Controls.Numeric.NumericConstructor */
        var constructor = function(element) {

            if (element instanceof jQuery == true) element = element[0];
            if (element.__Numeric__) return element.__Numeric__;
            if (this instanceof constructor == false) return new constructor(element);

            /** @type Intell.Controls.Numeric.Numeric */
            var _this = element.__Numeric__ = this;
            var $element = $(element);
            var $elementUp = $element.find('.Up-Button')
            var $elementDown = $element.find('.Down-Button')
            var $elementInput = $element.find('input').addBack('input');

            /** @type Intell.Controls.Numeric.NumericPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementInput = $elementInput[0];
            __private.elementUp = $elementUp[0];
            __private.elementDown = $elementDown[0];

            __private.min = null;
            __private.max = null;
            __private.minimumFractionDigits = 0;
            __private.maximumFractionDigits = 2;
            __private.decimalSeparator = localeDecimalSeparator;
            __private.thousandSeparator = localeThousandSeparator;
            __private.nullable = false;
            __private.value = null;            
            __private.increment = 1;

            // predefine
            _this.value = NS.parseFloat(__private.elementInput.value, __private);



            // handle events
            $elementInput.focus(function(e) {
                __private.session_skiped = false;
            });
            $elementInput.keydown(function(ev) {
                var e = ev.originalEvent;
                var keyCode = e.keyCode;

                if (keyCode == 27) {
                    __private.session_skiped = true;
                    __private.elementInput.value = NS.formatNumber(__private.value, __private);
                    __private.elementInput.blur();
                }
                else if (keyCode == 38) {
                    _this.increaseSessionBy(__private.increment); e.preventDefault();
                }
                else if (keyCode == 40) {
                    _this.increaseSessionBy(-__private.increment); e.preventDefault();
                }


                
            })
            $elementInput.keypress(function(ev) {
                var e = ev.originalEvent;
                if ('1234567890.,-'.indexOf(e.key) == -1) return false;
            });
            $elementInput.focusout(function(ev) {
                var e = ev.originalEvent;
                var newValue = NS.parseFloat(__private.elementInput.value, __private);

                if (__private.session_skiped == true) return;
                if (__private.value == newValue) {
                    __private.elementInput.value = NS.formatNumber(__private.value, __private);
                    return;
                }

                var oldValue = __private.value;

                _this.value = newValue;

                if (_this.value == oldValue) {
                    // can't set
                    __private.elementInput.value = NS.formatNumber(__private.value, __private);
                } else {
                    var event = new Event('numericchange', { cancelable: false, bubbles: true });
                    event.numeric = _this;
                    __private.elementInput.dispatchEvent(event);
                }
            });

            $elementUp.click(function() { _this.increaseSessionBy(_this.increment) });
            $elementDown.click(function() { _this.increaseSessionBy(-_this.increment) });
            $elementUp.add($elementDown).mousedown(function(ev) {
                __private.elementInput.focus();

                ev.originalEvent.preventDefault()
            })
            $element.on('mousewheel', function(ev) {
                if (__private.elementInput != document.activeElement) return;

                var e = ev.originalEvent;

                if (e.deltaY > 0) _this.increaseSessionBy(-_this.increment)
                else _this.increaseSessionBy(_this.increment)

                e.preventDefault();
            })
        }
        var prototype = constructor.prototype;

        // properties
        /** @type defineProperties<Intell.Controls.Numeric.Numeric>*/
        var properties = {
            element: {
                get: function() { return this.getPrivate().element },
                set: function() { throw new Error("'Numeric.element' cannot be assigned to -- it is read only") }
            },
            elementUp: {
                get: function() { return this.getPrivate().elementUp },
                set: function() { throw new Error("'Numeric.elementUp' cannot be assigned to -- it is read only") }
            },
            elementDown: {
                get: function() { return this.getPrivate().elementDown },
                set: function() { throw new Error("'Numeric.elementDown' cannot be assigned to -- it is read only") }
            },
            elementInput: {
                get: function() { return this.getPrivate().elementInput },
                set: function() { throw new Error("'Numeric.elementInput' cannot be assigned to -- it is read only") }
            },

            min: {
                get: function() { return this.getPrivate().min },
                set: function(newValue) { this.getPrivate().min = newValue },
            },
            max: {
                get: function() { return this.getPrivate().max },
                set: function(newValue) { this.getPrivate().max = newValue },
            },
            minimumFractionDigits: {
                get: function() { return this.getPrivate().minimumFractionDigits },
                set: function(newValue) { this.getPrivate().minimumFractionDigits = newValue }
            },
            maximumFractionDigits: {
                get: function() { return this.getPrivate().maximumFractionDigits },
                set: function(newValue) { this.getPrivate().maximumFractionDigits = newValue }
            },
            decimalSeparator: {
                get: function() { return this.getPrivate().decimalSeparator },
                set: function(newValue) {
                    var __private = this.getPrivate();

                    __private.decimalSeparator = newValue;
                    __private.elementInput.value = NS.formatNumber(__private.value, __private);
                },
            },
            thousandSeparator: {
                get: function() { return this.getPrivate().thousandSeparator },
                set: function(newValue) {
                    var __private = this.getPrivate();

                    __private.thousandSeparator = newValue;
                    __private.elementInput.value = NS.formatNumber(__private.value, __private);
                }
            },
            nullable: {
                get: function() { return this.getPrivate().nullable },
                set: function(newValue) { this.getPrivate().nullable = newValue }
            },
            value: {
                get: function() { return this.getPrivate().value },
                set: function(newValue) {

                    var __private = this.getPrivate();
                    var oldValue = __private.value;

                    if (isNaN(newValue) == true) newValue = null;
                    if (newValue == oldValue) return; // exit because nothing was changed
                    if (newValue == null && __private.nullable == false) return; // exit because we are not allow null
                    if (newValue != null && typeof newValue != 'number') return;
                    

                    if (newValue != null && __private.min != null && newValue < __private.min) newValue = __private.min;
                    if (newValue != null && __private.max != null && newValue > __private.max) newValue = __private.max;
                    if (newValue != null) {
                        var scale = Math.pow(10, __private.maximumFractionDigits);
                        newValue = Math.round(newValue * scale) / scale;
                    }


                    __private.value = newValue;
                    __private.elementInput.value = NS.formatNumber(newValue, __private);
                    
                    return true;
                }
            },

            increment: {
                get: function() { return this.getPrivate().increment },
                set: function(newValue) { this.getPrivate().increment = newValue }
            },
        }
        

        Object.defineProperties(prototype, properties);

        // public methods
        prototype.getPrivate = function() { return this[privateSymbol] }
        prototype.increaseSessionBy = function(increment) {
            var __private = this.getPrivate();



            var newValue = NS.parseFloat(__private.elementInput.value, __private);
            if (newValue == null || isNaN(newValue) == true) newValue = 0;

            newValue += increment;

            if (__private.min != null && newValue < __private.min) newValue = __private.min;
            if (__private.max != null && newValue > __private.max) newValue = __private.max;

            __private.elementInput.value = NS.formatNumber(newValue, __private);
        }



        return constructor;
    }();


    NS.Numeric = Numeric
    NS.parseFloat = function(string, option) {

        if (option.thousandSeparator != null) {
            var regExp = option.thousandSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            string = string.replace(new RegExp(regExp, 'g'), '');
        }

        string = string.replace(option.decimalSeparator, '.');

        return parseFloat(string);
    }
    NS.formatNumber = function(number, option) {
        if (number == null) return '';
        if (isNaN(number)) return '';
        if (typeof number != 'number') throw new Error('value is not number.');
        
        var text = Intl.NumberFormat('en-US', { minimumFractionDigits: option.minimumFractionDigits, maximumFractionDigits: option.maximumFractionDigits }).format(number); // // 1,000,000.14

        text = text.replace(/,/g, 'a').replace('.', 'b'); // => 1a000a000b14

        text = text.replace(/a/g, option.thousandSeparator ?? '').replace('b', option.decimalSeparator);

        

        //text

        return text;
    }


    return NS;
}();