

intell.controls.ListView = new function() {
    if (globalThis.ServiceWorkerGlobalScope) return;

    /** @type Intell.Controls.ListView.Namespace  */
    var ns = this;

    /** @type Intell.Controls.ListView.ListViewConstructor */
    var ListView = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        ListView = function ListView(element) {
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__ListView__ != undefined) return element.__ListView__;
            if (this instanceof ListView == false) return new ListView(element);
            // ===============================================================//
            

            /** @type Intell.Controls.ListView.ListView */
            var _this = element.__ListView__ = this;
            var $element = $(element);
            var $elementItems = $element.find('>.Items');
            var $elementItemAbstract = $elementItems.find('.Item.abstract').removeClass('abstract').remove();

            if ($elementItems.length == 0) $elementItems = $('<div class="Items"></div>').appendTo($element);
            

            /** @type Intell.Controls.ListView.ListViewPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementItems = $elementItems[0];
            __private.elementItemAbstract = $elementItemAbstract[0];
            __private.items = [];
            __private.multiSelect = false;



            // events
            _this.onitemclick = intell.createEventFunction();
            _this.onitemmousedown = intell.createEventFunction();
            _this.onitemmouseup = intell.createEventFunction();
            _this.onitemdblclick = intell.createEventFunction();
            
            $element.on('mousedown mouseup click dblclick', '.Item-Wrap', function(ev) {
                var e = ev.originalEvent;
                
                var $item_element = $(this).closest('.Item', element);
                var item_element = $item_element[0];
                var item = ListViewItem.getListViewItem(item_element);

                
                if (e.type == 'click') {
                    _this.onitemclick({ item: item, event: e });


                    if (__private.multiSelect == true) {
                        // allow multiselect
                        // 1. when ctrl is down: toggle selected property of item
                        // 2. when ctrl is not down:
                        //     selected property of item to true and others to false

                        if (e.ctrlKey == true) {
                            // ==1==
                            item.selected = !item.selected
                        } else {
                            item.selected = true;
                            // ==2==
                            __private.items.forEach(function(value) {
                                if (value.selected == true && value != item) value.selected = false;
                            });
                        }
                    } else {
                        // control don't allow multiselect
                        item.selected = true
                    }

                    
                }
                else if (e.type == 'mousedown') 
                    _this.onitemmousedown({ item: item, event: e });
                else if (e.type == 'mouseup') 
                    _this.onitemmouseup({ item: item, event: e });
                else if (e.type == 'dblclick')
                    _this.onitemdblclick({ item: item, event: e });
                
                
            });


            $element.on('click', function(e) {
                var e = e.originalEvent;

                var $target = $(e.target);
                if (e.ctrlKey == true) return;

                if ($target.is('.Item-Height') == true) {
                    __private.items.forEach(function(value) {
                        if (value.selected == true) value.selected = false;
                    });

                    return;
                }

                var $item = $target.closest('.Item', element);
                if ($item.length == 0) {
                    __private.items.forEach(function(value) {
                        if (value.selected == true) value.selected = false;
                    });
                }
            })
        }

        !function() {
            var prototype = ListView.prototype;

            // property
            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function(newValue) { throw new Error("'ListView.element' cannot be assigned to -- it is read only") },
                },
                multiSelect: {
                    get: function() { return getPrivate(this).multiSelect },
                    set: function(newValue) { getPrivate(this).multiSelect = newValue }
                },
                items: {
                    get: function() { return getPrivate(this).items },
                    set: function(newValue) { throw new Error("'ListView.items' cannot be assigned to -- it is read only") }
                },
                selectedItems: {
                    get: function() { return getPrivate(this).items.filter(function(value) { return value.selected }) },
                    set: function(newValue) { throw new Error("'ListView.selectedItems' cannot be assigned to -- it is read only") }
                }
            });

            // methods
            !function() {
                prototype.add = function() {
                    if (arguments.length == 1 && arguments[0] instanceof ListViewItem == true) return addItem.apply(this, arguments);
                    if (arguments.length == 1 && typeof arguments[0] == "string") return addName.apply(this, arguments);
                    if (arguments.length == 1 && typeof arguments[0] == "object") return addItemOption.apply(this, arguments);

                    throw new Error("arguments do not match with any overloads.")
                }

                /** @param {Intell.Controls.ListView.ListViewItem} item */
                function addItem(item) {
                    var item__private = ListViewItem.getPrivate(item);
                    if (item__private.listView != null) throw new Error("Cannot add or insert the item '" + item.name + "' in more than one place. You must first remove it from its current location or clone it.");

                    item__private.listView = this;

                    var __private = getPrivate(this);
                    __private.items.push(item);
                    __private.elementItems.append(item.element);
                }
                function addName(name) {
                    var __private = getPrivate(this);
                     
                    var item = new ListViewItem($(__private.elementItemAbstract).clone()[0]);
                    addItem.call(this, item);
                    item.name = name;

                    return item;
                }
                /** @param {Intell.Controls.ListView.ListViewItemOption} option */
                function addItemOption(option) {
                    var item = new ListViewItem();
                    addItem.call(this, item);

                    if (option.name != null) item.name = option.name;
                    if (option.icon != null) item.icon = option.icon;
                }
            }();
            prototype.clear = function() {
                var __private = getPrivate(this);

                for (var i = 0; i < __private.items.length; i++) {
                    var item = __private.items[i];

                    // logic listviewitem
                    var item__private = ListViewItem.getPrivate(item);
                    item__private.listView = null;

                    // ui/ux
                    item.element.remove();
                }

                __private.items.splice(0, __private.items.length);
            }
            prototype.removeChild = function(item) {

                var __private = getPrivate(this);

                var index = __private.items.indexOf(item);
                if (index == -1) return;

                // logic listview
                __private.items.splice(index, 1);

                // logic listviewitem
                var item__private = ListViewItem.getPrivate(item);
                item__private.listView = null;

                // ui/ux
                item__private.element.remove();
            }
        }();
        
        /**@param {Intell.Controls.ListView.ListView} listview @returns {Intell.Controls.ListView.ListViewPrivate} */
        function getPrivate(listview) { return listview[privateSymbol] }      

        ListView.getPrivate = getPrivate;
        return ListView;
    }();

    /** @type Intell.Controls.ListView.ListViewItemConstructor */
    var ListViewItem = function() {
        var privateSymbol = Symbol("__private"); // "__private"
        var $itemAbstract = $(
`<div class="Item">
    <div class="Item-Height">
        <div class="Item-Wrap">
            <div class="Icon"></div>
            <div class="Name"></div>
        </div>
    </div>
</div>`);

        ListViewItem = function ListViewItem(element) {
            if (element == null) element = $itemAbstract.clone();
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__ListViewItem__ != undefined) return element.__ListViewItem__;
            if (this instanceof ListViewItem == false) return new ListViewItem(element);

            /** @type Intell.Controls.ListView.ListViewItem */
            var _this = this;
            var $element = $(element);
            var $icon = $element.find('.Icon');
            var $name = $element.find('.Name');


            /** @type Intell.Controls.ListView.ListViewItemPrivate */
            var __private = _this[privateSymbol] = {}
            __private.element = element;
            __private.elementIcon = $icon[0];
            __private.elementName = $name[0];
            __private.icon = '';
            __private.name = '';
            __private.selected = false;
            __private.element.__ListViewItem__ = _this;
        }

        // prototype
        !function() {
            var prototype = ListViewItem.prototype;
            
            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function(newValue) { throw new Error("'ListViewItem.element' cannot be assigned to -- it is read only") },
                },
                elementIcon: {
                    get: function() { return getPrivate(this).elementIcon },
                    set: function(newValue) { throw new Error("'ListViewItem.elementIcon' cannot be assigned to -- it is read only") },
                },
                elementName: {
                    get: function() { return getPrivate(this).elementName },
                    set: function(newValue) { throw new Error("'ListViewItem.elementName' cannot be assigned to -- it is read only") },
                },
                icon: {
                    get: function() { return getPrivate(this).icon },
                    set: function(newValue) {

                        var __private = getPrivate(this);
                        __private.icon = newValue;


                        if (newValue.length <= 1) {
                            __private.elementIcon.textContent = newValue;
                            __private.elementIcon.style.backgroundImage = '';
                        }
                        else {
                            __private.elementIcon.textContent = '';
                            __private.elementIcon.style.backgroundImage = 'url(' + newValue + ')';
                        }
                    }
                },
                name: {
                    get: function() { return getPrivate(this).name },
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        __private.name = newValue;

                        var $line = $('<div class="Line"></div>').text(newValue)
                        $(__private.elementName).html('').append($line);
                    }
                },
                selected: {
                    get: function() { return getPrivate(this).selected },
                    set: function(newValue) {
                        var item = this;
                        var __private = getPrivate(this);

                        if (typeof newValue != "boolean") throw new Error("'seleted' is not boolean");
                        if (__private.selected == newValue) return;

                        
                        var listView = __private.listView;
                        var $element = $(__private.element);
                        __private.selected = newValue;


                        $element.toggleClass('SELECTED', newValue)

                        // set all others selected to false
                        if (newValue == true && listView != null && listView.multiSelect == false) {

                            listView.items.forEach(function(value) {
                                if (value.selected == true && value != item) value.selected = false;
                            });
                        }
                        

                    },
                },
                listView: {
                    get: function() { return getPrivate(this).listView },
                    set: function(newValue) { throw new Error("'ListViewItem.listView' cannot be assigned to -- it is read only") },
                }
            });

            prototype.remove = function() {
                var __private = getPrivate(this);

                if (__private.listView != null) __private.listView.removeChild(this);
            }
            prototype.refreshName = function(max_lines) {
                var __private = getPrivate(this);

                var $name = $(__private.elementName);
                var innerWidth = $name.innerWidth();
                var font = window.getComputedStyle(__private.elementName).getPropertyValue('font');
                var remaining = __private.name;
                
                if (max_lines == null) max_lines = 2;
                if (innerWidth == 0) return;

                $name.html('');
                measurer.font = font;
                
                for (var i = 1; i <= max_lines; i++) {
                    var line = '';

                    if (i == max_lines) {
                        line = remaining;
                        remaining = '';
                    } else {
                        var length = measurer.getNumberOfCharacter(remaining, innerWidth);
                        var line = remaining.substr(0, length);

                        remaining = remaining.substr(length);
                    }

                    if (!line) break;


                    var $line = $('<div class="Line"></div>');
                    $line.html(line);

                    if (measurer.measureText(line).width > innerWidth) $line.addClass('Overflow');


                    $name.append($line);
                }
            }

            

            /** @type Intell.Controls.ListView.Measurer */
            var measurer = new function() {
                measurer = this;

                /** @type HTMLCanvasElement */
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");

                Object.defineProperty(measurer, 'font', {
                    get: function() { return context.font },
                    set: function(newValue) { context.font = newValue }  
                })

                // methods
                measurer.measureText = function(text) {
                    return context.measureText(text);
                }
                measurer.getNumberOfCharacter = function(text, box_width) {
                    var width = measurer.measureText(text).width;

                    if (width < box_width) return text.length;

                    var lowest = 0;
                    var heighest = text.length
                    var part = '';


                    while (true) {
                        //debugger;
                        var length = Math.round((lowest + heighest) / 2);
                        part = text.substr(0, length);

                        width = measurer.measureText(part).width;

                        if (width < box_width) {
                            if (Math.abs(length - heighest) <= 1) return length;

                            lowest = length;
                            //heighest = heighest;
                        } else {
                            //lowest = lowest;
                            heighest = length;
                        }

                        if (heighest - lowest <= 3) {
                            for (var i = lowest + 1; i <= heighest; i++) {
                                part = text.substr(0, i);

                                width = measurer.measureText(part).width;
                                if (width > box_width) return i - 1;
                            }

                            return heighest;
                        }

                    }
                }
            };


        }();

        /**@param {Intell.Controls.ListView.ListViewItem} item @returns {Intell.Controls.ListView.ListViewItemPrivate} */
        function getPrivate(item) { return item[privateSymbol] }        


        ListViewItem.getPrivate = getPrivate;
        ListViewItem.getListViewItem = function(element) {
            return element.__ListViewItem__;
        }

        return ListViewItem;
    }();

    

    ns.ListView = ListView;
    ns.ListViewItem = ListViewItem;
    ns.create = function(element) {
        return new ListView(element);
    }
}();