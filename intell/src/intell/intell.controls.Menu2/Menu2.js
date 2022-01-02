

intell.controls.Menu2 = new function() {
    if (globalThis.ServiceWorkerGlobalScope) return;

    /** @type {Intell.Controls.Menu2.Namespace} */
    var ns; ns = this;

    var controls = intell.controls;

    var delayHideClass = 'OUT';
    var firstActiveClass = 'FIRST';
    var activeClass = 'ACTIVE';     // can't change due to 

    /** @type Intell.Controls.Menu2.MenuConstructor */
    var Menu = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        Menu = function Menu(element) {
            if (this instanceof Menu == false) return new Menu(element, option);

            if (element == null) element = document.createElement('div');
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__Menu__ != undefined) return element.__Menu__;
            //===========================================================

            /** @type {Intell.Controls.Menu2.Menu} */
            var menu = element.__Menu__ = this;
            var $menu = $(element);
            var $elementChildren = $menu.find('>.Children');
            var $elementItemAbstract = $menu.find('.X-Menu-Item.Abstract').removeClass('Abstract').remove();

            if ($elementChildren.length == 0) $elementChildren = $('<div class="Children"></div>').appendTo($menu);
           

            var rootMenu = new MenuItem(element);

            /** @type Intell.Controls.Menu2.MenuPrivate */
            var __private = menu[privateSymbol] = {};
            __private.element = element;
            __private.elementChildren = $elementChildren[0];
            __private.elementItemAbstract = $elementItemAbstract[0];
            __private.rootMenu = rootMenu;

            __private.showOnHover = false;
            __private.rootLocations = [9, 1];
            __private.rootOption = { insideWindow: true, space: -1 }
            __private.rootDelayHideTime = 0;
            __private.popupLocations = [4, 12];
            __private.popupOption = { insideWindow: true, margin: 0 };
            __private.popupDelayHideTime = 500;
            __private.enableDropdownArrow = false;


            !function() {
                // because MenuItem constructor built-in looking for exist html and create them.
                // rootMenu and all its children didn't set menu

                /** @param {Intell.Controls.Menu2.MenuItem} item */
                function setMenu(item, menu) {
                    var item__private = MenuItem.getPrivate(item);
                    item__private.menu = menu;
                
                    for (var i = 0; i < item.children.length; i++)
                        setMenu(item.children[i], menu);
                }
                
                setMenu(rootMenu, menu)

                // set top parent to null
                for (var i = 0; i < rootMenu.children.length; i++) {
                    var item__private = MenuItem.getPrivate(rootMenu.children[i]);
                    item__private.parent = null;
                }
 
            
            }();


            //events
            var ondropdownopen = this.ondropdownopen = intell.createEventFunction();
            var ondropdownclose = this.ondropdownclose = intell.createEventFunction();
            var onmenuitemclick = this.onmenuitemclick = intell.createEventFunction();

            // handle events
            $menu.on('mouseenter mousedown mouseup mouseleave', '.X-Menu-Item', function(e) {
                // When mouse enter '.X-Menu-Item', mouse also enters its parent, so this block will be called many time
                // 1. Prevent call many time, because we don't want to trigger its parent

                var event = e.originalEvent;
                var $target = $(event.target);
                var $children = $target.closest('.Children');
                var $menuItem = $target.closest('.X-Menu-Item');

                // --1--
                if ($children[0].contains($menuItem[0]) == false || $menuItem.is(this) == false) return;

                // --2-- mouseenter and mouseleave 
                var menuItem = MenuItem.getMenuItem($menuItem[0]);

                handleEvents(menuItem, event);
            });
            $menu.on('mouseleave', '>.Children>.X-Menu-Item', function(e) {

                if (__private.showOnHover == false) return;

                var event = e.originalEvent;
                var $target = $(event.target);
                var $children = $target.closest('.Children');
                var $menuItem = $target.closest('.X-Menu-Item');

                var menuItem = MenuItem.getMenuItem($menuItem[0]);

                if (menuItem != null) { clickoutsite(); }
            });

            $menu.on('mouseleave', '.Children', function(e) {
                var event = e.originalEvent;
                var $target = $(event.target);
                var $children = $target.closest('.Children');
                var $menuItem = $children.closest('.X-Menu-Item');


                if ($menuItem.length == 0) return;
                if ($children.is(this) == false) return;

                // mouseleave the .Children on 2-n levels
                var menuItem = MenuItem.getMenuItem($menuItem[0]);

                menuItem.children.forEach(function(value) {
                    if (value.active == true) {
                        value.active = false;
                        value.childrenVisible = false;
                    }
                });

            });

            $elementChildren.clickoutside(function() { clickoutsite() })


            /** @param {Intell.Controls.Menu2.MenuItem} menuItem @param {MouseEvent} event */
            function handleEvents(menuItem, event) {
                var __private = MenuItem.getPrivate(menuItem);
                var $menuItem = $(menuItem.element);

                //console.log(event.type, menuItem.name, menuItem, event);

                if (event.type == 'mouseover') {
                    var parent = menuItem.parent;

                    if (parent == null) {
                        // item on root

                        var previous = rootMenu.children.find(function(value) { return value.active; });

                        if (menu.showOnHover == true) {
                            if (previous == null) menu.ondropdownopen({ item: menuItem, event: event });

                            menuItem.active = true;
                            menuItem.childrenVisible = true;

                        } else {
                            if (previous != null) {
                                menuItem.active = true;
                                menuItem.childrenVisible = true;
                            }
                        }


                    } else if (parent != null) {

                        // logic
                        menuItem.active = true;
                        menuItem.childrenVisible = true;

                    }

                    
                    
                }
                else if (event.type == 'mousedown') {
                    if (event.buttons != 1) return;

                    if (menuItem.parent == null) {
                        // the top most menuItem
                        if (menuItem.children.length == 0) {
                            // doesn't have children

                        } else {
                            // has children
                            if (menuItem.childrenVisible == false) {
                                menu.ondropdownopen({ item: menuItem, event: event });
                                $(element).addClass('ACTIVE');

                                menuItem.active = true;
                                menuItem.childrenVisible = true;

                                event.preventDefault();
                            } else {
                                clickoutsite();
                            }
                        }
                    }

                }
                else if (event.type == 'mouseup') {
                    if (event.which != 1) return;

                    if (menuItem.children.length == 0) {
                        menu.onmenuitemclick({ item: menuItem, event: event });
                        clickoutsite();
                    }
                    

                }

                else if (event.type == 'mouseout') {

                    
                    if (menuItem.parent == null) {
                        // item on root

                    } else {
                        
                        //menuItem.active = false;
                        //menuItem.childrenVisible = false;
                    }
                    //console.log('mouseout', menuItem, event)

                }
            }

            function clickoutsite() {
                rootMenu.children.forEach(function(item) {
                    if (item.active == true || item.childrenVisible == true) {
                        // logic
                        item.active = false;
                        item.childrenVisible = false;

                        menu.ondropdownclose({ item: item });
                        $(element).removeClass('ACTIVE');
                    }
                })
            }
        }

        !function() {
            var prototype = Menu.prototype;

            // property
            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function(newValue) { throw new Error("'Menu.element' cannot be assigned to -- it is read only") },
                },
                elementChildren: {
                    get: function() { return getPrivate(this).elementChildren },
                    set: function(newValue) { throw new Error("'Menu.elementChildren' cannot be assigned to -- it is read only") }
                },
                elementItemAbstract: {
                    get: function() { return getPrivate(this).elementItemAbstract },
                    set: function(newValue) { throw new Error("'Menu.elementItemAbstract' cannot be assigned to -- it is read only") }
                },
                children: {
                    get: function() { return getPrivate(this).rootMenu.children },
                    set: function(newValue) { throw new Error("'Menu.children' cannot be assigned to -- it is read only") },
                },



                showOnHover: {
                    get: function() { return getPrivate(this).showOnHover },
                    set: function(newValue) { getPrivate(this).showOnHover = newValue },
                },
                rootLocations: {
                    get: function() { return getPrivate(this).rootLocations },
                    set: function(newValue) {
                        if (Array.isArray(newValue) == false) throw new Error("'Menu.rootLocations' must be array");

                        getPrivate(this).rootLocations = newValue;
                    },
                },
                rootOption: {
                    get: function() { return getPrivate(this).rootOption },
                    set: function(newValue) { getPrivate(this).rootOption = newValue },
                },
                rootDelayHideTime: {
                    get: function() { return getPrivate(this).rootDelayHideTime },
                    set: function(newValue) { getPrivate(this).rootDelayHideTime = newValue }
                },
                popupLocations: {
                    get: function() { return getPrivate(this).popupLocations },
                    set: function(newValue) { getPrivate(this).popupLocations = newValue }
                },
                popupOption: {
                    get: function() { return getPrivate(this).popupOption },
                    set: function(newValue) { getPrivate(this).popupOption = newValue }
                },
                popupDelayHideTime: {
                    get: function() { return getPrivate(this).popupDelayHideTime },
                    set: function(newValue) { getPrivate(this).popupDelayHideTime = newValue }
                },
                enableDropdownArrow: {
                    get: function() { return getPrivate(this).enableDropdownArrow },
                    set: function(newValue) {
                        if (typeof newValue != "boolean") throw new Error("'Menu.enableDropdownArrow' must be boolean");

                        getPrivate(this).enableDropdownArrow = newValue
                    },
                }


            });

            // methods
            prototype.add = function() {
                var __private = getPrivate(this);
                var root = __private.rootMenu;

                var result = root.add.apply(root, arguments);

                /** @type Intell.Controls.Menu2.MenuItem */
                var menuItem;

                if (arguments[0] instanceof MenuItem == true) menuItem = arguments[0];
                else menuItem = result;
                

                MenuItem.getPrivate(menuItem).parent = null;

                return result;
            }
            prototype.clear = function() {
                var __private = getPrivate(this);
                __private.rootMenu.clear();
            }
            // menu.show

        }();


        // methods
        Menu.getPrivate = function(menu) { return menu[privateSymbol] }

        var getPrivate = Menu.getPrivate;


        return Menu;
    }() 

    /** @type Intell.Controls.Menu2.MenuItemConstructor */
    var MenuItem = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';
        var $menuItemAbstract =
$(`<div class="X-Menu-Item Abstract">
    <div class="Label">
        <div class="Icon"></div>
        <div class="Name"></div>
    </div>
</div>`)

        MenuItem = function MenuItem(element) {
            if (this instanceof MenuItem == false) return new MenuItem(element);

            if (element == null) element = $menuItemAbstract.clone()[0];
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__MenuItem__ != undefined) return element.__MenuItem__;

            /** @type Intell.Controls.Menu2.MenuItem */
            var _this = element.__MenuItem__ = this;

            var $element = $(element);
            var $label = $element.find('>.Label');
            var $icon =  $label.find('>.Icon');
            var $name =  $label.find('>.Name');
            var $arrow = $label.find('>.Arrow');
            var $children = $element.find('>.Children');
            

            /** @type Intell.Controls.Menu2.MenuItemPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementLabel = $label[0];
            __private.elementIcon = $icon[0];
            __private.elementName = $name[0];
            __private.elementChildren = $children[0];

            __private.icon = '';
            __private.name = '';
            __private.shortcut = '';
            __private.children = [];
            __private.parent = null;
            __private.menu = null;
            __private.active = false;

            __private.childrenVisible = false;
            __private.childrenFadingOut = false;


            !function() {
                var $items = $element.find('>.Children>.X-Menu-Item');

                if ($items.length == 0) return;

                //console.log('need html to object');

                $items.toArray().forEach(function(element) {
                    var menuItem = getMenuItem(element);

                    if (menuItem == null) {
                        menuItem = new MenuItem(element);

                        _this.add(menuItem);
                        //__private.children.push(menuItem);
                    }
                });

                
            }();
            
            
        }

        var prototype = MenuItem.prototype;

        // property
        !function() {
            

            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function() { throw new Error("'MenuItem.element' cannot be assigned to -- it is read only") }
                },
                elementLabel: {
                    get: function() { return getPrivate(this).elementLabel },
                    set: function() { throw new Error("'MenuItem.elementLabel' cannot be assigned to -- it is read only") }
                },
                elementIcon: {
                    get: function() { return getPrivate(this).elementIcon },
                    set: function() { throw new Error("'MenuItem.elementIcon' cannot be assigned to -- it is read only") }
                },
                elementName: {
                    get: function() { return getPrivate(this).elementName },
                    set: function() { throw new Error("'MenuItem.elementName' cannot be assigned to -- it is read only") }
                },
                elementChildren: {
                    get: function() { return getPrivate(this).elementChildren },
                    set: function() { throw new Error("'MenuItem.elementChildren' cannot be assigned to -- it is read only") }
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
                        __private.elementName.textContent = newValue;


                    }
                },
                shortcut: {
                    get: function() { return getPrivate(this).shortcut },
                    set: function(newValue) { getPrivate(this).shortcut = newValue }
                },
                children: {
                    get: function() { return getPrivate(this).children },
                    set: function() { throw new Error("'MenuItem.children' cannot be assigned to -- it is read only") }
                },
                parent: {
                    get: function() { return getPrivate(this).parent },
                    set: function() { throw new Error("'MenuItem.parent' cannot be assigned to -- it is read only") }
                },
                menu: {
                    get: function() { return getPrivate(this).menu },
                    set: function() { throw new Error("'MenuItem.menu' cannot be assigned to -- it is read only") }
                },
                active: {
                    get: function() { return getPrivate(this).active },
                    set: function(newValue) {

                        /** @type Intell.Controls.Menu2.MenuItem */
                        var item = this;
                        var __private = getPrivate(item);
                        
                        if (__private.active == newValue) return;


                        $(__private.element).toggleClass(activeClass, newValue);
                        if (newValue == true) {

                            // before active we must deactive other brothers

                            var parent = __private.parent;
                            var children = parent != null ? parent.children : __private.menu.children;  // our brothers
                            var deactived = false; 

                            children.forEach(function(value) {
                                if (value != item && value.active == true) {
                                    value.active = false;

                                    if (value.childrenVisible == true) deactived = true;
                                }
                            });

                            if (deactived == false) $(__private.element).addClass(firstActiveClass);
                            // ===========end FIRST feature=======

                            if (parent == null) {
                                // root
                            } else {
                                parent.active = true;
                                parent.childrenVisible = true;
                            }
                            
                        } else {
                            // when active = false, children must be false
                            $(__private.element).removeClass(firstActiveClass);
                            __private.children.forEach(function(value) { value.active = false });
                        }

                        __private.active = newValue;

                    },
                },
                childrenVisible: {
                    get: function() { return getPrivate(this).childrenVisible },
                    set: function(newValue) {
                        /** @type Intell.Controls.Menu2.MenuItem */
                        var item = this;
                        var __private = getPrivate(item);

                        //if (__private.children.length == 0) return;
                        if (__private.childrenVisible == newValue) return;
                        
                        if (newValue == true) {
                            // before show children, others menu must be hidden

                            var parent = __private.parent;
                            if (parent != null) {
                                parent.children.forEach(function(value) {
                                    if (value == item) return;
                                    var value__private = MenuItem.getPrivate(value);
                                    

                                    if (__private.children.length == 0) {
                                        // item don't have children
                                        if (value__private.childrenVisible == true) {
                                            value.hideChildren();
                                        }
                                    } else {
                                        // item have children
                                        if (value__private.childrenVisible == true || value__private.childrenFadingOut == true) {
                                            value.hideChildrenImmediately();
                                        }
                                    }
                                });

                            } else {
                                __private.menu.children.forEach(function(value) {
                                    if (value == item) return;
                                    var value__private = MenuItem.getPrivate(value);


                                    if (__private.children.length == 0) {
                                        // item don't have children
                                        if (value__private.childrenVisible == true) {
                                            value.hideChildren();
                                        }
                                    } else {
                                        // item have children
                                        if (value__private.childrenVisible == true || value__private.childrenFadingOut == true) {
                                            value.hideChildrenImmediately();
                                        }
                                    }
                                });
                            }

                            item.showChildren();
                            
                        } else {
                            item.hideChildren();
                            
                        }

                        //__private.childrenVisible = newValue;
                    },
                }
            });
        }()

        // methods 
        !function() {
            prototype.add = function() {
                if (arguments.length == 1 && typeof arguments[0] == "string") return addName.apply(this, arguments);
                if (arguments.length == 1 && arguments[0] instanceof MenuItem == true) return addMenuItem.apply(this, arguments);
                if (arguments.length == 1 && typeof arguments[0] == "object") return addMenuItemOption.apply(this, arguments);

                throw new Error("arguments do not match with any overloads.")
            }


            /** @this {Intell.Controls.Menu2.MenuItem} @param {string} name */
            function addName(name) {
                var element = $(this.menu.elementItemAbstract).clone()[0];
                var menuItem = new MenuItem(element);

                menuItem.name = name;
                addMenuItem.call(this, menuItem);

                return menuItem;
            }
            /** @param {Intell.Controls.Menu2.MenuItemOption} option */
            function addMenuItemOption(option) {
                var element = $(this.menu.elementItemAbstract).clone()[0];
                var menuItem = new MenuItem(element);

                if (option.name) menuItem.name = option.name;
                if (option.icon) menuItem.icon = option.icon;

                addMenuItem.call(this, menuItem);

                return menuItem;
            }
            /** @this {Intell.Controls.Menu2.MenuItem} @param {Intell.Controls.Menu2.MenuItem} node */
            function addMenuItem(node) {
                if (node.parent != null) throw new Error("Cannot add or insert the item '" + node.name + "' in more than one place. You must first remove it from its current location or clone it.");

                var parent__private = getPrivate(this);
                var child__private = getPrivate(node);

                // logic
                parent__private.children.push(node);
                child__private.parent = this;
                setMenu(node, parent__private.menu); // recursive and set menu of children
                
                // we need set menu for sub item too.
                /** @param {Intell.Controls.Menu2.MenuItem} item */
                function setMenu(item, menu) {
                    var item__private = MenuItem.getPrivate(item);
                    item__private.menu = menu;
                
                    for (var i = 0; i < item.children.length; i++) setMenu(item.children[i], menu);
                }
                
                


                // ui/ux
                if (parent__private.elementChildren == null) parent__private.elementChildren = $('<div class="Children"></div>').appendTo(parent__private.element)[0];

                if (node.element.parentElement == parent__private.elementChildren) {
                    // the new node already place inside
                } else {
                    var $element = $(parent__private.element);
                    $(parent__private.elementChildren).append(node.element);
                }

                

                recheck_havechildren.apply(this);
            }



        }(); // prototype.add
        prototype.addSeparator = function() {
            var separator = $('<div class="X-Separator"></div>');
            separator.appendTo(this.elementChildren);
            return separator[0];
        }
        prototype.clear = function() {
            var __private = getPrivate(this);
            var children = __private.children;

            children.slice().forEach(function(value) {
                value.remove();
            });
        }
        prototype.remove = function() {
            var __private = getPrivate(this);

            var parent = __private.parent;
            if (parent == null) {
                var menu__private = Menu.getPrivate(__private.menu);
                menu__private.rootMenu.removeChildren(this);
            } else {
                parent.removeChildren(this);
            }

            
        }
        prototype.removeChildren = function(node) {
            var __private = getPrivate(this);
            var children = __private.children;

            var index = children.indexOf(node);
            if (index == -1) return;

            // logic parent
            children.splice(index, 1);

            // logic child
            var child__private = getPrivate(node);
            child__private.parent = null;
            //child__private.menu = null;
            setMenuRecursive(node, null);

            //child__private



            // ui/ux
            node.element.remove();

            recheck_havechildren.apply(this);
        }

        // methods ui/ux
        !function() {
            prototype.showChildren = function() {
                if (arguments.length == 0) return showChildrenAtElement.apply(this);
                if (arguments.length == 1 && arguments[0] instanceof HTMLElement == true) return showChildrenAtElement.apply(this, arguments);
                if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') return showChildrenAtPoint.apply(this, arguments);

                throw new Error("arguments do not match with any overloads.")
            }
            /** @this {Intell.Controls.Menu2.MenuItem} @param {HTMLElement} target */
            function showChildrenAtElement(target) {
                if (target == null) target = getPrivate(this).elementLabel;

                showChildrenAtTarget.call(this, target);
            }

            function showChildrenAtPoint(x, y) { showChildrenAtTarget.call(this, { left: x, top: y }) }

            /** @this {Intell.Controls.Menu2.MenuItem} 
                @param {number[]} locations @param {Intell.IShowAtOption} option */
            function showChildrenAtTarget(target, locations, option) {
                // Case 
                // 1. Invisible
                // 2. Visible, Fadeout
                // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
                // 4. Visible completely

                var __private = getPrivate(this);
                var element = __private.element;
                var elementChildren = __private.elementChildren;

                if (__private.children.length == 0) return;

                // default value //
                var menu = __private.menu;
                if (locations == null) locations = (__private.parent == null ? menu.rootLocations : menu.popupLocations);
                if (option == null) option = (__private.parent == null ? menu.rootOption : menu.popupOption);
                //===============//

                if (__private.childrenVisible == false) {
                    if (__private.childrenFadingOut == false) {
                        // 1. invisible
                        var result = intell.showAt(target, elementChildren, locations, option);
                        $(elementChildren).addClass(activeClass);
                    }
                    else {
                        // 2. fading out
                        stopFadingOut.call(this)
                    };

                    __private.childrenVisible = true;

                    //this.ondropdownopen({ result: result });
                }
            }

            /** @this {Intell.Controls.Menu2.Menu} */
            function stopFadingOut() {
                var __private = getPrivate(this);
                var $element = $(__private.element);
                var elementChildren = __private.elementChildren;

                // logic
                __private.childrenFadingOut = false;

                // ui/ux: remove "OUT" add "ACTIVE",
                controls.stopHide(elementChildren);
                $(elementChildren).removeClass(delayHideClass).addClass(activeClass);
            }
        }()
        prototype.hideChildren = function() {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely
            //      maybe children maybe fadeout

            var menuItem = this;
            var __private = getPrivate(menuItem);
            var menu = __private.menu;
            var $element = $(__private.element);
            
            if (__private.childrenVisible == false) {
                // 1. invisible 
                // 2. fade out
                
            } else if (__private.childrenVisible == true) {

                // logic
                __private.childrenVisible = false;
                
                // 2. Visible
                var delayHideTime = menuItem.parent == null ? menu.rootDelayHideTime : menu.popupDelayHideTime;




                if (delayHideTime == 0) this.hideChildrenImmediately();
                else {
                    // logic
                    __private.childrenFadingOut = true;

                    // add "OUT", remove "ACTIVE"
                    //$element.addClass(delayHideClass).removeClass(activeClass);

                    var elementChildren = menuItem.elementChildren;


                    $(elementChildren).removeClass(activeClass);
                    controls.startHide(elementChildren, delayHideTime, delayHideClass, function() {
                        __private.childrenFadingOut = false;
                    });

                    // find hide the children of child too.
                    this.children.forEach(function(child) {
                        if (child.childrenVisible == true) child.hideChildren();
                    })

                };
            } 

        }
        prototype.hideChildrenImmediately = function() {

            var __private = getPrivate(this);

            // if menu is ACTIVE, remove class and raise event
            __private.childrenVisible = false;
            __private.childrenFadingOut = false;


            // Stop Fadeout and hide element with class .Children.OUT
            controls.stopHide(__private.elementChildren)
            $(__private.elementChildren).removeClass([activeClass, firstActiveClass, delayHideClass].join(' ')).hide();


            // find hide the children of child too.
            this.children.forEach(function(child) {
                var child__private = MenuItem.getPrivate(child);
                if (child__private.childrenVisible == true || child__private.childrenFadingOut == true) child.hideChildrenImmediately();
            })


            //this.ondropdownclose();
        }

        /** @this Intell.Controls.Menu2.MenuItem */
        function recheck_havechildren() {
            var $element = $(this.element);
            var $children = $element.find('>.Children');
            $element.toggleClass('HAS-CHILDREN', this.children.length != 0);

            if (this.children.length == 0) {
                if (this.childrenVisible == true)
                    this.hideChildrenImmediately();

            }
        }

        // static methods
        MenuItem.getMenuItem = function(element) { return element && element.__MenuItem__ }
        MenuItem.getPrivate = function(menuItem) { return menuItem[privateSymbol] }
        var getPrivate = MenuItem.getPrivate;
        var getMenuItem = MenuItem.getMenuItem;

        
        return MenuItem;
    }()


    // private
    //node__private.parent = null;

    /**@param {Intell.Controls.Menu2.MenuItem} item
     * @param {Intell.Controls.Menu2.Menu} menu */
    function setMenuRecursive(item, menu) {
        var item__private = MenuItem.getPrivate(item);
        item__private.menu = menu;

        for (var i = 0; i < item.children.length; i++)
            setMenuRecursive(item.children[i], menu);
    }


    // class
    ns.Menu = Menu;
    ns.MenuItem = MenuItem;
    
    // static
    Menu.SetArrowDirection = function(arrow, location, offset) {
        var $arrow = $(arrow);

        if (offset instanceof HTMLElement == true) {
            var $target = $(offset);
            offset = $target.offset();
            offset.left += $target.outerWidth() / 2;
            offset.top += $target.outerHeight() / 2;
        }

        $arrow.removeClass('LEFT UP RIGHT DOWN').css({ left: '', top: '' });

        if (location <= 3) $arrow.offset({ left: Math.round(offset.left - $arrow.outerWidth() / 2) }).addClass('DOWN');
        else if (location <= 6) $arrow.offset({ top: Math.round(offset.top - $arrow.outerHeight() / 2) }).addClass('LEFT');
        else if (location <= 9) $arrow.offset({ left: Math.round(offset.left - $arrow.outerWidth() / 2) }).addClass('UP');
        else $arrow.offset({ top: Math.round(offset.top - $arrow.outerWidth() / 2) }).addClass('RIGHT');
    }
    Menu.SetArrowDirectionAuto = function(arrow, offset) {
        var $arrow = $(arrow);

        if (offset instanceof HTMLElement == true) {
            var $target = $(offset);
            offset = $target.offset();
            offset.left += $target.outerWidth() / 2;
            offset.top += $target.outerHeight() / 2;
        }


        var $element = $arrow.offsetParent();
        var offset_element = $element.offset();;
        offset_element.left += $element.outerWidth() / 2;
        offset_element.top += $element.outerHeight() / 2;

        var location = 1;

        if (offset_element.top > offset.top) location = 9;
        else if (offset_element.top < offset.top) location = 3;
        else if (offset_element.left > offset.left) location = 6;
        else if (offset_element.left < offset.left) location = 12;

        if (location <= 3) $arrow.offset({ left: Math.round(offset.left - $arrow.outerWidth() / 2) }).addClass('DOWN');
        else if (location <= 6) $arrow.offset({ top: Math.round(offset.top - $arrow.outerHeight() / 2) }).addClass('LEFT');
        else if (location <= 9) $arrow.offset({ left: Math.round(offset.left - $arrow.outerWidth() / 2) }).addClass('UP');
        else $arrow.offset({ top: Math.round(offset.top - $arrow.outerWidth() / 2) }).addClass('RIGHT');
    }

    



    //return Menu;

    
}();

