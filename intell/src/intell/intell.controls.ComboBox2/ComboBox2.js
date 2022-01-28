/** Jan 27th 2021

 */

intell.controls.ComboBox2 = new function() {
    if (typeof window == 'undefine') return;

    /** @type Intell.Controls.ComboBox2.Namespace */
    var NS = this;

    /** @type Intell.Controls.ComboBox2.ComboBoxConstructor */
    var ComboBox = function () {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';
        var $itemAbstract = $(`<div class="Item">
    <div class="Icon"></div>
    <div class="Name"></div>
</div>`);
        var $groupAbstract = $(`
<div class="Group">
    <header>
        <div class="Name"></div>
    </header>
    <div class="Children"></div>
</div>
`);
        /** @param {HTMLElement} element @type Intell.Controls.ComboBox2.ComboBoxConstructor */
        var constructor = function(element) {
            if (element instanceof jQuery == true) element = element[0];
            if (element.__ComboBox2__) return element.__ComboBox2__;
            if (this instanceof ComboBox == false) return new constructor(element);


            

            var $element = $(element);
            var $elementSelect = $element.find('.Select');
            var $elementChildren = $element.find('.Children');
            var $elementItemAbstract = $elementChildren.find('.Item.abstract');

            if ($elementSelect.length == 0) $elementSelect = $('<div class="Select"></div>').prependTo(element);
            if ($elementChildren.length == 0) $elementChildren = $('<div class="Children"></div>').insertAfter($elementSelect);
            
            /** @type Intell.Controls.ComboBox2.ComboBox */
            var _this = element.__ComboBox2__ = this;
            
            /** @type Intell.Controls.ComboBox2.ComboBoxPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementSelect = $elementSelect[0];
            __private.elementChildren = $elementChildren[0];
            __private.elementItemAbstract = $elementItemAbstract[0];

            __private.popupLocations = [9, 1];
            __private.popupOption = { insideWindow: true, space: -1 }

            __private.childrenVisible = false;
            __private.items = [];
            __private.groups = [];
    
            // events
            _this.onchange = intell.createEventFunction();


            // handle events
            $element.mousedown(function(ev) {
                var e = ev.originalEvent;
                var $target = $(e.target);
                
                if ($target.closest('.Children').length != 0) return;

                _this.toggleChildren();
                e.preventDefault();
                element.focus();
            });
            $element.clickoutside(function(e) {
                /** @type HTMLElement */
                var target = e.target;
            
                if (__private.elementAt && __private.elementAt.contains(target) == false) {
                    _this.hideChildren();
                }
            });
            //$element.focusout(function() { _this.hideChildren() });
            $element.keydown(function (ev) {
                var e = ev.originalEvent;
                if (e.keyCode != 38 && e.keyCode != 40) return;

                e.preventDefault();

                var __private = _this.getPrivate();
                var selectedItem = __private.selectedItem;

                
                var items = $(__private.elementChildren).find('.Item').toArray().map(function(element) {
                    return ComboBoxItem.getItem(element);
                }).filter(function(item) { return item != null });

                var index = selectedItem == null ? -1 : items.indexOf(selectedItem);

                var nextItem = function() {

                    for (var i = 0; i < items.length; i++) {
                        if (e.keyCode == 38) index -= 1;
                        else if (e.keyCode == 40) index += 1;

                        var nextItem = items[index];

                        if (nextItem == null) return;
                        if (nextItem.disabled == false) return nextItem;
                    }

                }();

                if (nextItem != null) {
                    _this.selectedItem = nextItem;
                    _this.onchange({ item: nextItem });
                    var event = new Event('comboboxchange', { bubbles: true });
                    element.dispatchEvent(event);

                    if (__private.childrenVisible == true) {

                        if (e.keyCode == 38) nextItem.element.scrollIntoView({ block: "nearest" });
                        if (e.keyCode == 40) nextItem.element.scrollIntoView({ block: "nearest" }); 

                        
                    }
                }

                
            })
            $elementChildren.on('mouseup', '.Item', function (ev) {
                var e = ev.originalEvent;
                var item = ComboBoxItem.getItem(this);

                if (item == null) return;
                if (item.disabled == true) return;

                if (item == _this.selectedItem) {
                    _this.hideChildren();
                    return;
                }

                _this.selectedItem = item;
                _this.onchange({ item: item });
                var event = new Event('comboboxchange', { bubbles: true });
                element.dispatchEvent(event);

                _this.hideChildren();
            });

            // predefined
            !function() {
                var $items = $elementChildren.find('.Item');
                var $group = $elementChildren.find('.Group');

                $group.toArray().forEach(function(element) {
                    var group = new ComboBoxGroup(element);
                    group.name = group.elementName.innerText.trim();

                    __private.groups.push(group);
                })

                $items.toArray().forEach(function(element) {
                    var item = new ComboBoxItem(element);
                    var item__private = item.getPrivate();

                    //data-value
                    var $element = $(element);
                    if ($element.is('.DISABLED') == true) item.disabled = true;

                    item__private.name = item__private.elementName.innerText.trim();
                    item__private.value = $element.attr('data-value');


                    item__private.parent = _this;
                    __private.items.push(item);


                });
            }();
            
            

        }
        var prototype = constructor.prototype;
        
        // property
        /** @type defineProperties<Intell.Controls.ComboBox2.ComboBox>*/
        var properties = {
            element: {
                get: function () { return this.getPrivate().element },
                set: function (newValue) { throw new Error("'ComboBox.element' cannot be assigned to -- it is read only") }
            },
            elementChildren: {
                get: function () { return this.getPrivate().elementChildren },
                set: function (newValue) { throw new Error("'ComboBox.elementChildren' cannot be assigned to -- it is read only") }
            },
            elementItemAbstract: {
                get: function () { return this.getPrivate().elementItemAbstract },
                set: function (newValue) { throw new Error("'ComboBox.elementItemAbstract' cannot be assigned to -- it is read only") }
            },


            popupLocations: {
                get: function() { return this.getPrivate().popupLocations },
                set: function(newValue) { this.getPrivate().popupLocations = newValue }
            },
            popupOption: {
                get: function() { return this.getPrivate().popupOption },
                set: function(newValue) { this.getPrivate().popupOption = newValue }
            },

            items: {
                get: function () { return this.getPrivate().items },
                set: function (newValue) { throw new Error("'ComboBox.items' cannot be assigned to -- it is read only") }
            },
            selectedItem: {
                get: function () { return this.getPrivate().selectedItem },
                set: function (newValue) {
                    /** @type Intell.Controls.ComboBox2.ComboBoxItem */
                    var newItem = newValue;
                    var __private = this.getPrivate();
                    var oldItem = __private.selectedItem;


                    if (newItem != null && __private.items.indexOf(newItem) == -1) throw new Error('Cannot set selectedItem that do not belong to combobox.');

                    // logic
                    __private.selectedItem = newItem;


                    // ui/ux

                    if (oldItem != null) oldItem.element.classList.remove('ACTIVE');

                    var $select = $(__private.elementSelect).html('');
                    if (newItem == null) {
                        
                    } else {
                        $select.append($(newItem.element).clone());

                        newItem.element.classList.add('ACTIVE');
                    }
                    

                }
            },
            
        }
        Object.defineProperties(prototype, properties);

        // methods
        !function () {
            prototype.add = function () {
                if (arguments.length == 1 && typeof arguments[0] == "string") return addName.apply(this, arguments);
                if (arguments.length == 1 && arguments[0] instanceof ComboBoxItem == true) return addItem.apply(this, arguments);
                if (arguments.length == 1 && typeof arguments[0] == "object") return addOption.apply(this, arguments);

                throw new Error("arguments do not match with any overloads.")
            }


            /** @this {Intell.Controls.ComboBox2.ComboBox} @param {string} name */
            function addName(name) {
                return addOption.call(this, {
                    name: name
                });
            }
            /** @param {Intell.Controls.ComboBox2.ComboBoxItemOption} option */
            function addOption(option) {

                var element;

                if (this.elementItemAbstract == null) {
                    element = $itemAbstract.clone()[0];
                } else {
                    element = $(this.elementItemAbstract).clone()[0];
                }

                var item = new ComboBoxItem(element);

                if (option.name) item.name = option.name;
                if (option.icon) item.icon = option.icon;
                if (option.value) item.value = option.value;
                if (option.group) item.group = option.group;
                if (option.disabled) item.disabled = option.disabled;

                addItem.call(this, item);

                return item;
            }
            /** @this {Intell.Controls.ComboBox2.ComboBox} @param {Intell.Controls.ComboBox2.ComboBoxItem} item */
            function addItem(item) {
                var __private = this.getPrivate();

                if (__private.items.indexOf(item) != -1) throw new Error("The item is already exist.");

                var item__private = item.getPrivate();

                // logic
                item__private.parent = this;
                __private.items.push(item);
                

                // ui/ux
                var $children = $(__private.elementChildren);

                if (item.group) {
                    var group = __private.groups.find(function(value) {
                        return value.name == item.group;
                    });



                    if (group == null) {
                        var elementGroup = $groupAbstract.clone().appendTo(__private.elementChildren)[0];
                        group = new ComboBoxGroup(elementGroup);
                        group.name = item.group;

                        __private.groups.push(group);
                    }
                    group.add(item);

                } else {
                    $children.append(item__private.element);
                }

            }

        }(); // prototype.add
        prototype.remove = function(item) {
            var combo__private = this.getPrivate();
            var item__private = item.getPrivate();
            if (item__private.parent != this) throw new Error("Can't remove item that is not belong to it.");

            // logic
            var items = combo__private.items;
            var index = items.indexOf(item);
            items.splice(index, 1);

            

            // ui/ux
            var group = item__private.parentGroup;

            if (group == null) {
                item.element.remove();
            } else {
                group.remove(item);
                
                if (group.items.length == 0) {
                    var index = combo__private.groups.indexOf(group);
                    combo__private.groups.splice(index, 1);

                    group.element.remove();
                }
            }

        } // prototype.remove
        prototype.clear = function() {

            //var combo__private = this.getPrivate();
            var items = this.items.slice(0);
            var combobox = this;

            items.forEach(function(item) {
                combobox.remove(item);
            });

            //var combo__private = this.getPrivate();
            //
            //// logic
            //var removed = combo__private.items.splice(0);
            //removed.forEach(function(item) {
            //    var __private = item.getPrivate();
            //    __private.parent = null;
            //})
            //
            //// ui/ux;
            //removed.forEach(function(item) {
            //    item.element.remove();
            //})


        }; // prototype.clear
        prototype.getPrivate = function() { return this[privateSymbol] }
        prototype.toggleChildren = function() {
            var __private = this.getPrivate();
            if (__private.childrenVisible == true)
                this.hideChildren();
            else
                this.showChildren();
        }
        prototype.showChildren = function(at) {
            var _this = this;
            var __private = this.getPrivate();

            if (at == null) at = __private.element

            __private.elementAt = at;
            __private.childrenVisible = true;
            __private.sectionSelectedItem = null;
            intell.showAt(__private.elementAt, __private.elementChildren, __private.popupLocations, __private.popupOption);
            __private.elementAt.classList.add('ACTIVE');

            

            if (__private.selectedItem != null) {
                __private.selectedItem.element.scrollIntoView({ block: "nearest" });
            }

            // automatic listen focusout event
            $(__private.elementAt).on('focusout.at', function() {
                _this.hideChildren();
                $(__private.elementAt).off('focusout.at');
            })
        }

        prototype.hideChildren = function() {
            var __private = this.getPrivate();
            __private.childrenVisible = false;
            $(__private.elementChildren).hide();

            if (__private.elementAt) {
                __private.elementAt.classList.remove('ACTIVE');
                __private.elementAt = null;
            }
            
        }

        return constructor;
    }();
    
    /** @type Intell.Controls.ComboBox2.ComboBoxItemConstructor */
    var ComboBoxItem = function () {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        /** @type Intell.Controls.ComboBox2.ComboBoxItemConstructor */
        var constructor = function (element) {
            
            var $element = $(element);
            var $elementIcon = $element.find('.Icon');
            var $elementName = $element.find('.Name');

            /** @type Intell.Controls.ComboBox2.ComboBoxItem */
            var _this = element.__ComboBoxItem__ = this;
            

            /** @type Intell.Controls.ComboBox2.ComboBoxItemPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementIcon = $elementIcon[0];
            __private.elementName = $elementName[0];

            //__private.icon 
            __private.name = '';
            //__private.value
            __private.disabled = false;
        }


        var prototype = constructor.prototype;

        // property
        /** @type defineProperties<Intell.Controls.ComboBox2.ComboBoxItem>*/
        var properties = {
            element: {
                get: function () { return this.getPrivate().element },
                set: function (newValue) { throw new Error("'ComboBoxItem.element' cannot be assigned to -- it is read only") }
            },
            elementIcon: {
                get: function () { return this.getPrivate().elementIcon },
                set: function (newValue) { throw new Error("'ComboBoxItem.elementIcon' cannot be assigned to -- it is read only") }
            },
            elementName: {
                get: function () { return this.getPrivate().elementName },
                set: function (newValue) { throw new Error("'ComboBoxItem.elementName' cannot be assigned to -- it is read only") }
            },

            parent: {
                get: function () { return this.getPrivate().parent },
                set: function (newValue) { throw new Error("'ComboBoxItem.parent' cannot be assigned to -- it is read only") }
            },

            icon: {
                get: function () { return this.getPrivate().icon },
                set: function (newValue) {
                    var __private = this.getPrivate(this);
                    __private.icon = newValue;
                    __private.elementIcon.innerHTML = newValue;
                }
            },
            name: {
                get: function () { return this.getPrivate().name },
                set: function (newValue) {
                    var __private = this.getPrivate();
                    __private.name = newValue;
                    __private.elementName.innerHTML = newValue;

                }
            },
            value: {
                get: function () { return this.getPrivate().value },
                set: function (newValue) { this.getPrivate().value = newValue }
            },
            group: {
                get: function () { return this.getPrivate().group },
                set: function (newValue) {
                    var __private = this.getPrivate();

                    if (__private.group == newValue) return;

                    __private.group = newValue;
                }
            },
            disabled: {
                get: function() { return this.getPrivate().disabled },
                set: function(newValue) {
                    var __private = this.getPrivate();

                    __private.disabled = newValue;

                    __private.element.classList.toggle('DISABLED', __private.disabled);
                }
            },
        }


        Object.defineProperties(prototype, properties);

        // methods
        prototype.getPrivate = function () { return this[privateSymbol] };


        // static methods
        constructor.getItem = function (element) { return element && element.__ComboBoxItem__ }

        return constructor;
    }();

    /** @type Intell.Controls.ComboBox2.ComboBoxGroupConstructor */
    var ComboBoxGroup = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        /** @type Intell.Controls.ComboBox2.ComboBoxGroupConstructor */
        var constructor = function(element) {
            var $element = $(element);
            var $elementName = $element.find('.Name');
            var $elementChildren = $element.find('.Children');

            /** @type Intell.Controls.ComboBox2.ComboBoxGroup */
            var _this = element.__ComboBoxGroup__ = this;

            
            /** @type Intell.Controls.ComboBox2.ComboBoxGroupPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementName = $elementName[0];
            __private.elementChildren = $elementChildren[0];
            __private.items = [];
        }
        var prototype = constructor.prototype;

        // ** property **
        /** @type defineProperties<Intell.Controls.ComboBox2.ComboBoxGroup>*/
        var properties = {
            element: {
                get: function() { return this.getPrivate().element },
                set: function(newValue) { throw new Error("'ComboBoxGroup.element' cannot be assigned to -- it is read only") }
            },
            elementName: {
                get: function() { return this.getPrivate().elementName },
                set: function(newValue) { throw new Error("'ComboBoxGroup.elementName' cannot be assigned to -- it is read only") }
            },
            elementChildren: {
                get: function() { return this.getPrivate().elementChildren },
                set: function(newValue) { throw new Error("'ComboBoxGroup.elementChildren' cannot be assigned to -- it is read only") }
            },

            name: {
                get: function() { return this.getPrivate().name },
                set: function(newValue) {
                    var __private = this.getPrivate();

                    // logic
                    __private.name = newValue;

                    // ui/ux
                    __private.elementName.innerHTML = newValue;
                }
            },
            items: {
                get: function() { return this.getPrivate().items },
                set: function(newValue) { throw new Error("'ComboBoxGroup.items' cannot be assigned to -- it is read only") }
            },
        }
        Object.defineProperties(prototype, properties);

        // ** methods **
        prototype.add = function(item) {
            var group__private = this.getPrivate();
            var item__private = item.getPrivate();

            // logic 
            group__private.items.push(item);
            item__private.parentGroup = this;
            

            group__private.elementChildren.append(item.element)
        }
        prototype.remove = function(item) {
            var index = this.items.indexOf(item);
            if (index == -1) return;

            // logic
            this.items.splice(index, 1);

            // ui/ux
            item.element.remove();
        }

        prototype.getPrivate = function() { return this[privateSymbol] }

        constructor.getItem = function(element) { return element.__ComboBoxGroup__ }

        return constructor;
    }();


    NS.ComboBox = ComboBox;
    NS.ComboBoxItem = ComboBoxItem;

}();