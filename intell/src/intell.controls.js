'use strict';

!(function () {
    if (window.intell == undefined) window.intell = {};

    /** @type {intell2} */
    var intell = window.intell;

       

    var controls = intell.controls = {};


    controls.hide = function (element) {
        var elementcomputedStyle = window.getComputedStyle(element);
        if (elementcomputedStyle.display != 'none') element.style.display = 'none';        
    }
    function startHide(element, timeout, delayHideClass, oncomplete) {

        //controls.stopHide(element);

        var $element = $(element);
        $element.addClass(delayHideClass);


        var timerHander = setTimeout(function () {
            //$element.removeClass(delayHideClass);
            controls.stopHide(element);

            controls.hide(element);

            if (typeof oncomplete === "function") oncomplete();
        }, timeout);

        startHide.items.push({ element: element, timerHander: timerHander, delayHideClass: delayHideClass });

        return timerHander;
    }
    startHide.items = [];
    controls.startHide = startHide;
    controls.stopHide = function(element) {
        
        for (var i = 0; i < startHide.items.length; i++) {
            var item = startHide.items[i];
            if (item.element == element) {
                $(item.element).removeClass(item.delayHideClass);
                clearTimeout(item.timerHander);

                startHide.items.splice(i, 1)
                return;
            } 
        }
    }


    /**
     * @this Intell.Controls.Menu
     * @param {HTMLElement} element
     * @param {Intell.Controls.MenuOption} option
     */
    function Menu(element, option) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__Menu__ != undefined) return element.__Menu__;
        if (this instanceof Menu == false) return new Menu(element, option);
        //////////////////////////////////////////////

        /** @type {Intell.Controls.Menu} */
        var menu = element.__Menu__ = this;
        var $menu = $(element);
        //properties
        var showOnHover = false;
        var rootLocations = [9, 1];
        var rootOption = { insideWindow: true, space: -1 }
        var popupLocations = [4, 12];
        var popupOption = { insideWindow: true }
        var enableDropdownArrow = false;

        var delayHideTime = 500;    // this is not apply for root
        var delayHideClass = 'OUT';
        var rootDelayHideTime = 0;


        var activeClass = 'ACTIVE'; // can't change due to 
        var firstActiveClass = 'FIRST'; 
        //private
        var isVisible = false; 
        var isFadingOut = false;

        Object.defineProperties(this, {
            isVisible: {
                get: function() { return isVisible },
            },
            isFadingOut: {
                get: function() { return isFadingOut },
            },

            showOnHover: {
                get: function() { return showOnHover },
                set: function(newValue) { showOnHover = newValue }
            },
            rootLocations: {
                get: function() { return rootLocations },
                set: function(newValue) { rootLocations = newValue },
            },
            rootOption: {
                get: function() { return rootOption },
                set: function(newValue) { rootOption = newValue },
            },

            popupLocations: {
                get: function() { return popupLocations },
                set: function(newValue) { popupLocations = newValue },
            },
            popupOption: {
                get: function() { return popupOption },
                set: function(newValue) { popupOption = newValue },
            },

            delayHideTime: {
                get: function() { return delayHideTime },
                set: function(newValue) { delayHideTime = newValue }
            },
            delayHideClass: {
                get: function() { return delayHideClass },
                set: function(newValue) { delayHideClass = newValue }
            },
            rootDelayHideTime: {
                get: function() { return rootDelayHideTime },
                set: function(newValue) { rootDelayHideTime = newValue }
            },
            firstActiveClass: {
                get: function() { return firstActiveClass },
                set: function(newValue) { firstActiveClass = newValue }
            },
            enableDropdownArrow: {
                get: function() { return enableDropdownArrow },
                set: function(newValue) {
                    if (typeof newValue == "boolean") enableDropdownArrow = newValue
                    else console.warn("Cannot implicitly convert value to 'bool'");
                }
            },
        });


        //methods
        this.setItems = function(items) {
            $menu.find('>.X-Menu-Items').remove();
            $menu.append(Menu.createMenuItemsElement(items));
        }
        this.show = function(arg1, arg2, arg3) {
            //show(element?: HTMLElement): void
            //show(offset: JQuery.CoordinatesPartial): void

            if (arg1 == undefined || arg1 instanceof HTMLElement == true) return showAtElement.apply(this, arguments);
            else return showAtPoint.apply(this, arguments);
        }
        this.hide = function() {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely
            //      maybe children maybe fadeout

            if (isVisible == false) {
                // 1. Invisible 
            } else if (isVisible == true && isFadingOut == true) {
                // 2. Visible, Fadeout
            } else {
                // 4. Visible completely

                if (rootDelayHideTime == 0) this.hideDropDownImmediately();
                else {
                    isFadingOut = true;

                    // add "OUT", remove "ACTIVE"
                    $menu.addClass(delayHideClass).removeClass(activeClass); 

                    // find all active
                    $menu.find('.X-Menu-Item.ACTIVE>.X-Menu-Items').removeClass('ACTIVE').each(function() {
                        controls.startHide(this, rootDelayHideTime, delayHideClass);
                    });

                    var rootElement = $menu.find('>.X-Menu-Items').removeClass('ACTIVE')[0];
                    controls.startHide(rootElement, rootDelayHideTime, delayHideClass, function() {
                        isVisible = false;
                        isFadingOut = false;


                        $menu.removeClass([firstActiveClass, delayHideClass].join(' ')).find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
                        menu.ondropdownclose();
                    });
                };
            }

        }
        this.hideDropDownImmediately = function() {
            // if menu is ACTIVE, remove class and raise event
            isVisible = false;
            isFadingOut = false;

            // Stop Fadeout and hide element with class .X-Menu-Items.OUT
            $menu.find('.X-Menu-Items').each(function() {
                controls.stopHide(this)
            }).removeClass('ACTIVE').hide();

            $menu.removeClass([activeClass, firstActiveClass, delayHideClass].join(' ')).find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
            this.ondropdownclose();
        }

        //methods overloads
        function showAtElement(target) {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely


            if (isVisible == false) {
                // 1. Invisible
                isVisible = true;

                var result = intell.showAt(target || element, $menu.find('>.X-Menu-Items')[0], rootLocations, rootOption);
                $menu.addClass(activeClass); // element only
                $menu.find('>.X-Menu-Items').addClass('ACTIVE');

                this.ondropdownopen({ result: result });
            }
            else if (isVisible == true && isFadingOut == true) {
                //2. Visible, Fadeout
                stopFadingOut();
            }
        }
        function showAtPoint(offset) {
            if (isVisible == false) {
                // 1. Invisible
                isVisible = true;
                var result = intell.showAt(offset, $menu.find('>.X-Menu-Items')[0], rootLocations, rootOption);
                $menu.find('>.X-Menu-Items').addClass('ACTIVE');
               
                this.ondropdownopen({ result: result});
            }
            else if (isVisible == true && isFadingOut == true) {
                //2. Visible, Fadeout
                stopFadingOut();
            }
        }

        function stopFadingOut() {
            //2. Visible, Fadeout
            isFadingOut = false;

            // add "ACTIVE", remove "OUT"
            $menu.addClass(activeClass).removeClass(delayHideClass);

            // stop FadeOut processing: only stop ">.X-Menu-Items" and ".X-Menu-Item.ACTIVE>.X-Menu-Items"
            $menu.find('>.X-Menu-Items').add($menu.find('.X-Menu-Item.ACTIVE>.X-Menu-Items')).each(function() {
                controls.stopHide(this);
            }).addClass('ACTIVE');
        }


        //events
        var ondropdownopen = this.ondropdownopen = $$.createEventFunction();
        var ondropdownclose = this.ondropdownclose = $$.createEventFunction();
        var onmenuitemclick = this.onmenuitemclick = $$.createEventFunction();

        $menu.mousedown(function(e) {
            // In this block, we need to showDropDown or HideDropDown
            // 1. only allow left button to do the action
            // 2. find the closest element X-Menu-Item or X-Menu, 
            //    if the element is X-Menu-Item, nothing
            //    if the element is X-Item, do

            // --1--
            var event = e.originalEvent;
            if (event.buttons != 1) return;
            
            // --2--
            var $closest = $(event.target).closest('.X-Menu-Item,.X-Menu');

            if ($closest.is('.X-Menu-Item') == true) { }
            else if ($closest.is('.X-Menu') == true) {
                if (isVisible == true && isFadingOut == false && showOnHover == false) menu.hide();
                else {
                    $menu.addClass(firstActiveClass);
                    menu.show();
                }
                //prevent default, so user can hold down and up to select
                event.preventDefault();
            }
        });
        $menu.mouseup(function(e) {
            // In this block: when left click on X-Menu-Item raise onmenuitemclick if it doesn't have any child
            // 
            // 1. only allow left button
            // 2. Find the closest X-Menu-Item, raise event if it doesn't have any child.

            // -- 1 --
            var originalEvent = e.originalEvent;
            if (originalEvent.button != 0) return;

            // -- 2 --
            var $menu_item = $(originalEvent.target).closest('.X-Menu-Item');
            if ($menu_item.length > 0 && $menu_item.find('>.X-Menu-Items>.X-Menu-Item').length == 0) {
                var event = intell.Event();
                event.target = $menu_item[0];
                
                onmenuitemclick(event);

                if (event.defaultPrevented == false) menu.hideDropDownImmediately()
            }

        });
        $menu.mouseenter(function() {
            // check is there a opened menu before us?
            var hasPreviousMenu = false;

            //1. find another active menu (not this) & hide it.

            var $othersMenus = $menu.parent().find('>.X-Menu').not(element);
            $othersMenus.each(function() {
                var activedMenu = this.__Menu__;
                if (activedMenu == undefined) return;

                if (activedMenu.isVisible == true) {
                    activedMenu.hideDropDownImmediately();
                    hasPreviousMenu = true;
                    return false;
                }
            });


            if (showOnHover == false) {
                if (hasPreviousMenu == true) menu.show();
            } else {
                if (hasPreviousMenu == false) $menu.addClass(firstActiveClass);
                menu.show();
            }
        })
        $menu.mouseleave(function() { if (showOnHover == true) menu.hide() });
        $menu.mousedownoutside(function() { if (isVisible == true) menu.hide() });
        $menu.on('mouseenter', '.X-Menu-Item', function() {
            // find previous .X-Menu-Item.ACTIVE and hide previous
            // Case
            // 1. Previous .X-Menu-Item do not have children items
            // 2. Previous .X-Menu-Item have children items

            var $current = $(this);

            var $previous = $(this).parent().find('>.X-Menu-Item.ACTIVE');
            if ($previous.is(this) == false) {
                //when enter another menu-item;
                $previous.removeClass('ACTIVE').find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
                $previous.find('>.X-Menu-Items').removeClass('ACTIVE');

                //stop hide timer and hide previous .X-Menu-Items immediately
                var $needHide = $previous.find('.X-Menu-Items:visible');
                for (var i = 0; i < $needHide.length; i++) controls.stopHide($needHide[i]);
                $needHide.hide();

                var $items = $current.find('>.X-Menu-Items');
                $items.addClass('ACTIVE'); // XYZ

                if ($items.length > 0) {
                    controls.stopHide($items[0]);
                    intell.showAt(this, $items[0], popupLocations, popupOption);
                }
                $current.addClass('ACTIVE');
            }
        });
        $menu.on('mouseleave', '.X-Menu-Items', function(e) {
            // In this block, 
            // When mouse leave '.X-Menu-Items', we will find ">.X-Menu-Item.ACTIVE" and hide its ".X-Menu-Items" (This mean we don't hide itself but its child).
            // There is a problem, when mouse leave '.X-Menu-Items', it may leave everything (X-Menu) so this block will be called many time.
            //
            // 1. Prevent call many time, because we don't want to hide every thing
            // 2. Find .X-Menu-Item.ACTIVE and hide it .X-Menu-Items if exist

            // --1--
            var $closest = $(e.originalEvent.target).closest('.X-Menu-Items');
            if ($closest[0] != this) return; // this keyword change every call

            // --2--
            var $active = $(this).find('.X-Menu-Item.ACTIVE');
            var $active_items = $active.find('>.X-Menu-Items').removeClass('ACTIVE'); 

            $active_items.each(function() {
                controls.startHide(this, delayHideTime, delayHideClass);
            });
            $active.removeClass('ACTIVE');
        });
        
        this.ondropdownopen(function(e) {
            if (enableDropdownArrow == false) return;
            var $arrow1 = $menu.find('>.Label>.Arrow');
            var $arrow2 = $menu.find('>.X-Menu-Items>.Arrow');

            if ($arrow1.length == 0) return;
            if ($arrow2.length == 0) return;

            var offset = $arrow1.offset();
            offset.left += $arrow1.outerWidth() / 2;
            offset.top += $arrow1.outerHeight() / 2;

            Menu.SetArrowDirection($arrow2, e.result.location, offset);
        });
        

        if (option != undefined) {
            if (option.showOnHover != undefined) menu.showOnHover = option.showOnHover;
            if (option.rootLocations != undefined) menu.rootLocations = option.rootLocations;
            if (option.rootOption != undefined) menu.rootOption = option.rootOption;
            if (option.popupLocations != undefined) menu.popupLocations = option.popupLocations;
            if (option.popupOption != undefined) menu.popupOption = option.popupOption;
            if (option.delayHideTime != undefined) menu.delayHideTime = option.delayHideTime;
            if (option.delayHideClass != undefined) menu.delayHideClass = option.delayHideClass;

            if (option.rootDelayHideTime != undefined) menu.rootDelayHideTime = option.rootDelayHideTime;
            if (option.firstActiveClass != undefined) menu.firstActiveClass = option.firstActiveClass;
            if (option.enableDropdownArrow != undefined) menu.enableDropdownArrow = option.enableDropdownArrow;
        }
    }
    Menu.createMenuItemsElement = function(items) {

        if (items == undefined || items.length == 0) return;

        var elements = [];

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            var $X_Menu_Item;

            if (item == '-') $X_Menu_Item = $('<div class="X-Separator"></div>');
            else {
                $X_Menu_Item = $('<div class="X-Menu-Item"><div class="Label"><div class="Icon"></div><div class="Name"></div></div></div>');
                var $label = $X_Menu_Item.find('>.Label');
                var $icon = $X_Menu_Item.find('>.Label>.Icon');
                var $name = $X_Menu_Item.find('>.Label>.Name');

                if (item.icon != undefined) { $icon.html(item.icon) }
                if (item.name != undefined) { $name.html(item.name) }
                if (item.shortcut != undefined) $label.append('<div class="Shortcut">' + item.shortcut + '</div>');

                if (item.items != undefined) {
                    var children = intell.controls.Menu.createMenuItemsElement(item.items);
                    if (children != undefined) {

                        $X_Menu_Item.append(children);

                        $X_Menu_Item.find('>.Label').append('<div class="Arrow"></div>');

                    }

                }
            }
            elements.push($X_Menu_Item);

        }

        if (elements.length == 0) return;
        else return $('<div class="X-Menu-Items"></div>').append(elements)[0];

    }
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
    intell.controls.Menu = Menu


    intell.controls.ContextMenu = function ContextMenu(element, option) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__ContextMenu__ != undefined) return element.__ContextMenu__;
        if (this instanceof ContextMenu == false) return new ContextMenu(element, option);

        //////////////////////////////////////////////
        var contextMenu = element.__ContextMenu__ = this;
        var $contextMenu = $(element);

        var popupLocations = [4, 12];
        var popupOption = { insideWindow: true }

        var delayHideTime = 500;
        var delayHideClass = 'OUT';
        var rootDelayHideTime = 0;


        var activeClass = 'ACTIVE'; // can't change due to 
        var firstActiveClass = 'FIRST'; 
        //private
        var isVisible = false;
        var isFadingOut = false;

        Object.defineProperties(this, {
            isVisible: {
                get: function() { return isVisible },
            },
            isFadingOut: {
                get: function() { return isFadingOut },
            },

        });

        var isVisible = false;
        this.show = function(argument1, argument2) {
            //show(element: HTMLElement): void;
            //show(position: JQuery.CoordinatesPartial): void;

            var fn;

            if (argument1.left != undefined && argument1.top != undefined) { show_offset.apply(this, arguments); }
            else if (argument1 instanceof HTMLElement) show_target.apply(this, arguments);
            else throw "Unknow overload";
        }

        function show_offset(offset) {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely

            if (isVisible == false) {
                // 1. Invisible

                //1. prevent flicker - set left and hidden
                $contextMenu.css({ left: '-900px', visibility: 'hidden' })
                    .show()
                    .offset(offset)
                    .css({ visibility: '' });

                isVisible = true;
                $contextMenu.addClass(activeClass);
                $contextMenu.find('>.X-Menu-Items').addClass(activeClass); // XYZ
                
                //this.ondropdownopen({ result: result });

            } else if (isVisible == true && isFadingOut == true) {
                //2. Visible, Fadeout
                isFadingOut = false;

                // add "ACTIVE", remove "OUT"
                $menu.addClass(activeClass).removeClass(delayHideClass);

                // stop FadeOut processing: only stop ">.X-Menu-Items" and ".X-Menu-Item.ACTIVE>.X-Menu-Items"
                $menu.find('>.X-Menu-Items').add($menu.find('.X-Menu-Item.ACTIVE>.X-Menu-Items')).each(function() {
                    controls.stopHide(this);
                }).addClass('ACTIVE');

            }
            //else {
            //    // 4. Visible completely
            //}

        }
        function show_target(target, rootLocations, rootOption) {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely

            //aa.apply arguments

            if (isVisible == false) {
                // 1. Invisible
                var result = intell.showAt(target, element, rootLocations, rootOption);

                isVisible = true;
                $menu.addClass(activeClass);
                $menu.find('>.X-Menu-Items').addClass('ACTIVE'); // XYZ



                this.ondropdownopen({ result: result });

            }
            else if (isVisible == true && isFadingOut == true) {
                //2. Visible, Fadeout
                isFadingOut = false;

                // add "ACTIVE", remove "OUT"
                $menu.addClass(activeClass).removeClass(delayHideClass);

                // stop FadeOut processing: only stop ">.X-Menu-Items" and ".X-Menu-Item.ACTIVE>.X-Menu-Items"
                $menu.find('>.X-Menu-Items').add($menu.find('.X-Menu-Item.ACTIVE>.X-Menu-Items')).each(function() {
                    controls.stopHide(this);
                }).addClass('ACTIVE');

            }
            //else {
            //    // 4. Visible completely
            //}
        }

        this.hide = function() {
            // Case 
            // 1. Invisible
            // 2. Visible, Fadeout
            // 3. Visible, Fadein (We don't have this state, because CSS will do it by set class name as FIRST)
            // 4. Visible completely
            //      maybe children maybe fadeout

            if (isVisible == false) {
                // 1. Invisible 
            } else if (isVisible == true && isFadingOut == true) {
                // 2. Visible, Fadeout
            } else {
                // 4. Visible completely

                if (rootDelayHideTime == 0) this.hideImmediately();
                else {
                    isFadingOut = true;

                    // add "OUT", remove "ACTIVE"
                    $menu.addClass(delayHideClass).removeClass(activeClass);

                    // find all active
                    $menu.find('.X-Menu-Item.ACTIVE>.X-Menu-Items').removeClass('ACTIVE').each(function() {
                        controls.startHide(this, rootDelayHideTime, delayHideClass);
                    });

                    var rootElement = $menu.find('>.X-Menu-Items').removeClass('ACTIVE')[0];
                    controls.startHide(rootElement, rootDelayHideTime, delayHideClass, function() {
                        isVisible = false;
                        isFadingOut = false;


                        $menu.removeClass([firstActiveClass, delayHideClass].join(' ')).find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
                        menu.ondropdownclose();
                    });
                };
            }

        }
        this.hideImmediately = function() {
            // if menu is ACTIVE, remove class and raise event
            isVisible = false;
            isFadingOut = false;

            // Stop Fadeout and hide element with class .X-Menu-Items.OUT
            $contextMenu.find('.X-Menu-Items').add($contextMenu).each(function() {
                controls.stopHide(this)
            }).removeClass('ACTIVE').hide();

            $contextMenu.removeClass([activeClass, delayHideClass].join(' ')).find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
            //this.ondropdownclose();
        }

        $contextMenu.on('mouseenter', '.X-Menu-Item', function() {
            // find previous .X-Menu-Item.ACTIVE and hide previous
            // Case
            // 1. Previous .X-Menu-Item do not have children items
            // 2. Previous .X-Menu-Item have children items

            var $previous = $(this).parent().find('>.X-Menu-Item.ACTIVE');
            if ($previous.is(this) == false) {
                //when enter another menu-item;
                $previous.removeClass('ACTIVE').find('.X-Menu-Item.ACTIVE').removeClass('ACTIVE');
                $previous.find('>.X-Menu-Items').removeClass('ACTIVE');

                //stop hide timer and hide previous .X-Menu-Items immediately
                var $needHide = $previous.find('.X-Menu-Items:visible');
                for (var i = 0; i < $needHide.length; i++) controls.stopHide($needHide[i]);
                $needHide.hide();

                var $items = $(this).find('>.X-Menu-Items');
                $items.addClass('ACTIVE'); // XYZ

                if ($items.length > 0) {
                    controls.stopHide($items[0]);
                    intell.showAt(this, $items[0], popupLocations, popupOption);
                }
                $(this).addClass('ACTIVE');
            }
        });
        $contextMenu.on('mouseleave', '.X-Menu-Items', function(e) {
            // In this block, 
            // When mouse leave '.X-Menu-Items', we will find ">.X-Menu-Item.ACTIVE" and hide its ".X-Menu-Items" (This mean we don't hide itself but its child).
            // There is a problem, when mouse leave '.X-Menu-Items', it may leave everything (X-Menu) so this block will be called many time.
            //
            // 1. Prevent call many time, because we don't want to hide every thing
            // 2. Find .X-Menu-Item.ACTIVE and hide it .X-Menu-Items if exist

            // --1--
            var $closest = $(e.originalEvent.target).closest('.X-Menu-Items');
            if ($closest[0] != this) return; // this keyword change every call

            // --2--
            var $active = $(this).find('.X-Menu-Item.ACTIVE');
            var $active_items = $active.find('>.X-Menu-Items').removeClass('ACTIVE');

            $active_items.each(function() {
                controls.startHide(this, delayHideTime, delayHideClass);
            });
            $active.removeClass('ACTIVE');
        });
        $contextMenu.mousedownoutside(function() {
            if (isVisible == true) contextMenu.hide();
            //if ($menu.is('.' + activeClass)) menu.hideDropDown()
        });
    }
    intell.controls.NumericUpDown = function NumericUpDown(element, option) {
        ///<param name='element' type='Element'/> 
        ///<glyph>vs:GlyphDialogId</glyph>
        if (element instanceof jQuery == true) element = element[0];
        if (element.__NumericUpDown__ != undefined) return element.__NumericUpDown__;
        if (this instanceof NumericUpDown == false) return new NumericUpDown(element, option);
        ////////////////////
        var control = element.__NumericUpDown__ = this;
        var _$element = $(element);
        var _$input = _$element.find('input');
        var _input = _$input[0];
        var _$up = _$element.find('.X-Up');
        var _$down = _$element.find('.X-Down');

        control.element = element;

        //properties
        var value = parseFloat(_$input[0].value.replace(/[, ]/g, '')); if (isNaN(value)) value = 0;
        var session_value = value;
        var increment = 1;
        var unit = '';
        var min = undefined;
        var max = undefined;
        var decimalPlaces = 0;

        //define property
        Object.defineProperties(this, {
            'value': {
                get: function () { return value },
                set: function (newValue, e) {
                    if (value != newValue && typeof newValue == 'number') {
                        value = newValue;
                        if (value < min) value = min;
                        if (value > max) value = max;

                        updateString(value);

                    }
                }
            },
            'increment': {
                get: function () { return increment },
                set: function (value) { if (typeof value == 'number') increment = value; }
            },
            'unit': {
                get: function () { return unit },
                set: function (newValue) {
                    if (newValue != unit && typeof newValue == 'string') {
                        unit = newValue; updateString(value);
                    }

                }
            },
            'min': {
                get: function () { return min },
                set: function (newValue) {
                    if (newValue == undefined) min = undefined;
                    else if (min != newValue && typeof newValue == 'number') {
                        min = newValue;
                        if (min > max) max = min;
                        if (value < min) value = min;
                        updateString(value);
                    }

                }
            },
            'max': {
                get: function () { return max },
                set: function (newValue) {
                    if (newValue == undefined) max = undefined;
                    else if (max != newValue && typeof newValue == 'number') {
                        max = newValue;
                        if (max < min) min = max;
                        if (value > max) value = max;
                        updateString(value);
                    }

                }
            },
            'decimalPlaces': {
                get: function() { return decimalPlaces },
                set: function(newValue) {
                    if (decimalPlaces != newValue) {
                        decimalPlaces = newValue;
                        updateString(value);
                    }
                }
            },
            'input': {
                get: function () { return _input }
            }
        });
        //events
        this.onchange = $$.createEventFunction()

        function updateString(value) {
            _$input.val(value.formatNumber({ decimals: decimalPlaces }) + unit);
        }
        function session_increaseBy(number) {
            session_value += number;
            if (min != null && session_value < min) session_value = min;
            if (max != null && session_value > max) session_value = max;

            updateString(session_value);
        }


        _$input.keyup(function() {
            session_value = parseFloat(_input.value.replace(/[, ]/g, ''));
            if (isNaN(session_value)) session_value = 0;

        });
        _$input.on('mousewheel', function (event) {
            var e = event.originalEvent;
            if (document.activeElement != _$input[0]) return;
            if (e.wheelDelta > 0) session_increaseBy(increment);
            else session_increaseBy(-increment);
            e.preventDefault(); //prevent scroll
        });
        _$up.click(function () { session_increaseBy(increment) });
        _$down.click(function () { session_increaseBy(-increment); });
        _$input.focus(function() {
            _$element.addClass('ACTIVE');
            session_value = parseFloat(_$input[0].value.replace(/[, ]/g, ''))
        });
        _$input.focusout(function() {
            _$element.removeClass('ACTIVE');
            if (min && session_value < min) session_value = min;
            if (max && session_value > max) session_value = max;

            if (session_value != value) {

                var event = intell.Event();
                Object.defineProperties(event, {
                    oldValue: { value: value },
                    newValue: { value: session_value }
                });
                value = session_value;
                control.onchange(event);

                if (event.defaultPrevented == true) value = event.oldValue;
            }

            updateString(value);
        });

        // non-important
        _$input.keypress(function (event) {
            var key = event.originalEvent.key;
            if ('1234567890., '.indexOf(key) == -1) { return false }
        })
        _$up.add(_$down).mousedown(function (e) {
            // When user click on up/down button, set focus to textbox.
            if (document.activeElement != _$input[0]) _$input.focus();
            e.originalEvent.preventDefault()
        });

        if (option != undefined) {
            //if (option.value != undefined) value = option.value;
            
            if (option.min != undefined) control.min = option.min;
            if (option.max != undefined) control.max = option.max;
            if (option.increment != undefined) control.increment = option.increment;
            if (option.unit != undefined) control.unit = option.unit;
            if (option.decimalPlaces != undefined) control.decimalPlaces = option.decimalPlaces;
            
        }
        updateString(value);

        
    }
    intell.controls.Slideshow = function Slideshow(element, option) {
        ///<param name='element' type='Element'/> 
        ///<glyph>vs:GlyphDialogId</glyph>
        if (element instanceof jQuery == true) element = element[0];
        if (element.__Slideshow__ != undefined) return element.__Slideshow__;
        if (this instanceof Slideshow == false) return new Slideshow(element, option);
        //////////////////////////////////////////////

        //if (_$element.find('.X-Slideshow-Item').length > 0) console.warn('.X-Slideshow-Items ')

        //////////////////////////////////////////////
        var control = element.__Slideshow__ = this;
        var _$element = $(element);
        var _$items = _$element.find('.X-Slideshow-Items');

        //properties
        var index = -1;
        var interval = 5000;

        var delayHideTime = 1000;           // delayHideTime
        var delayHideClass = 'OUT';         // delayHideClass
        var activeClass = 'ACTIVE';         // activeClass
        var inClass = 'IN';                 // inClass
        var nextInClass = 'NEXT-IN';        // 
        var prevInClass = 'PREV-IN';        // 
        var scrollEnabled = false;           // Gets or sets a value indicating whether the slider uses scroll bar.

        //private 
        var delayHide_hTimer = 0; // delayHide_hTimer private: the handle timer
        var previousSlider; //prevSliderElement
        var currentSlider;  //currSliderElement
        var interval_hTimer = 0; // the hTimer that is used by auto slideshow

        //define properties
        Object.defineProperties(this, {
            count: {
                get: function() { return _$items.find('>.X-Slideshow-Item').length },
            },
            index: {
                get: function() { return index },
                set: function(newValue) { this.setIndex(newValue) }
            },
            interval: {
                get: function() { return interval },
                set: function(newValue) { interval = newValue }
            },
            delayHideTime: {
                get: function() { return delayHideTime },
                set: function(newValue) { delayHideTime = newValue }
            },
            delayHideClass: {
                get: function() { return delayHideClass },
                set: function(newValue) { delayHideClass = newValue }
            },
            activeClass: {
                get: function() { return activeClass },
                set: function(newValue) { activeClass = newValue }
            },
            inClass: {
                get: function() { return inClass },
                set: function(newValue) { inClass = newValue }
            },
            nextInClass: {
                get: function() { return nextInClass },
                set: function(newValue) { nextInClass = newValue }
            },
            prevInClass: {
                get: function() { return prevInClass },
                set: function(newValue) { prevInClass = newValue }
            },
            scrollEnabled: {
                get: function () { return scrollEnabled },
                set: function (newValue) {

                    // only refreshScroll when value change is changed
                    if (newValue != scrollEnabled) {
                        scrollEnabled = newValue
                        this.refreshScroll();
                    }
                }
            }
        });

        //methods
        this.next = function() { return this.setIndex(index + 1 >= control.count ? 0 : index + 1, 'next'); }
        this.prev = function() { return this.setIndex(index - 1 < 0 ? control.count - 1 : index - 1, 'prev'); }
        this.setIndex = function(newIndex, action) {
            if (newIndex == index) return;

            if (delayHide_hTimer != 0) {
                //previous timer is running, stop and hide it immediately
                var $previous = $(previousSlider).hide();
                $previous.removeClass([activeClass, prevInClass, nextInClass, inClass, delayHideClass].join(' '));
                clearTimeout(delayHide_hTimer); delayHide_hTimer = 0;
            }

            // when code reach here:
            // previous need to hide
            // current need to show
            previousSlider = currentSlider;
            index = newIndex;
            currentSlider = _$items.find('>.X-Slideshow-Item')[index];

            if (previousSlider != undefined) {
                var $previous = $(previousSlider);
                $previous.removeClass(inClass).addClass(delayHideClass).removeClass(activeClass);

                delayHide_hTimer = setTimeout(function() {
                    var $previous = $(previousSlider);
                    $previous.hide().removeClass([activeClass, prevInClass, nextInClass, inClass, delayHideClass].join(' '));
                    delayHide_hTimer = 0;
                }, delayHideTime);
            }
            if (currentSlider != undefined) {
                var actionClass = '';
                if (action == 'next') actionClass = nextInClass;
                else if (action == 'prev') actionClass = prevInClass;
                else if (newIndex > index) actionClass = nextInClass;
                else actionClass = prevInClass;


                var $current = $(currentSlider).show();
                currentSlider.offsetHeight;
                $current.addClass([activeClass, inClass, actionClass].join(' '));

                
                $(_$element.find('>.X-Scrolls>.X-Scroll').removeClass('ACTIVE')[index]).addClass('ACTIVE');

                control.onchange({ target: currentSlider });
            }

            return currentSlider;
        }
        this.start = function() {
            if (interval_hTimer != 0) return;
            start();
        }
        this.stop = function() {
            if (interval_hTimer != 0) {
                var $current = $(_$element.find('.X-Scroll')[index]).removeClass('RUNNING');
                clearTimeout(interval_hTimer); interval_hTimer = 0;
            }
        }

        this.refreshScroll = function () {
            if (scrollEnabled == true) {
                var $scrolls = _$element.find('>.X-Scrolls').show();
                if ($scrolls.length == 0) {
                    $scrolls = $('<div class="X-Scrolls"></div>');
                    _$element.append($scrolls);
                }

                var $scroll = $scrolls.find('>.X-Scroll');
                if ($scroll.length != this.count) {
                    if ($scroll.length > this.count)
                        for (var i = this.count; i < $scroll.length; i++) $scroll[i].remove()
                    else {
                        for (var i = $scroll.length; i < this.count; i++) $scrolls.append('<div class="X-Scroll"></div>');
                    }


                }

            } else {
                _$element.find('>.X-Scrolls').hide();
            }
        }
        function start() {
            if (scrollEnabled == true) {
                var $current = $(_$element.find('.X-Scroll')[index]).addClass('ACTIVE');
                $current[0].offsetHeight;
                $current.addClass('RUNNING');
                $current.css('transition-duration', interval + 'ms');
            }
            

            interval_hTimer = setTimeout(function () {
                if (scrollEnabled == true && $current != undefined) {
                    $current.removeClass('RUNNING');
                    $current.css('transition-duration', '');
                }
                control.next(true);
                start();
            }, interval);
        }

        //events
        this.onchange = $$.createEventFunction();

        _$element.on('click', '.X-Prev', function() { control.stop(); control.prev(true) });
        _$element.on('click', '.X-Next', function() { control.stop(); control.next(true) });
        _$element.on('click', '.X-Scroll', function() { control.stop(); control.index = $(this).index(); });

        if (_$element.find('.X-Scrolls').length > 0) {
            scrollEnabled = true;

            // need to add a number of <div class="X-Scroll"></div> 
            this.refreshScroll();
        }

        if (option != undefined) {
            if (option.index != undefined) control.index = option.index;
            if (option.interval != undefined) control.interval = option.interval;
            if (option.delayHideTime != undefined) control.delayHideTime = option.delayHideTime;
            if (option.delayHideClass != undefined) control.delayHideClass = option.delayHideClass;
            if (option.activeClass != undefined) control.activeClass = option.activeClass;
            if (option.inClass != undefined) control.inClass = option.inClass;
            if (option.nextInClass != undefined) control.nextInClass = option.nextInClass;
            if (option.prevInClass != undefined) control.prevInClass = option.prevInClass;
            //if (option.scrollEnabled != undefined) control.scrollEnabled = option.scrollEnabled;
        }
        
        if (this.index == -1) this.next();
    }
    intell.controls.TagsInput = function TagsInput(element, option) {
        ///<param name='element' type='Element'/> 
        ///<glyph>vs:GlyphDialogId</glyph>
        if (element instanceof jQuery == true) element = element[0];
        if (element.__TagsInput__ != undefined) return element.__TagsInput__;
        if (this instanceof TagsInput == false) return new TagsInput(element, option);
        //////////////////////////////////////////////
        var control = element.__TagsInput__ = this;
        var _$element = $(element);
        var _$input = _$element.find('input'), _input = _$input[0];
        var _$tag_BASE = $('<div class="tag"><div class="tag-value"></div><span class="X-Remove"></span></div>');

        ///properties
        var confirmKeys = [9, 13]; // tab, enter

        ///events
        this.onchange = $$.createEventFunction();

        ///module
        this.getTagElementByValue = function (value) {
            var _$tags = _$element.find('>.tag')

            for (var i = 0; i < _$tags.length; i++) {
                if (_$tags.eq(i).find('.tag-value')[0].innerText.localeCompare(value, 'en', { sensitivity: 'accent' }) == 0) return _$tags[i]
            }
        }
        this.insertBeforeInput = function (text) {
            if (text == '') return false;

            var _tag = this.getTagElementByValue(text);
            if (_tag != undefined) {
                $(_tag).find('.tag-value').text(text);
                _tag.style.animation = 'none';
                setTimeout(function () { _tag.style.animation = '' }, 16);
                return false;
            }

            var _clone_tag = _$tag_BASE.clone();
            _clone_tag.find('.tag-value').text(text);
            _clone_tag.insertBefore(_input);

            return true;
        }

        //define property
        Object.defineProperties(control, {

            'value': {
                get: function () {
                    var values = [];
                    _$element.find('.tag .tag-value').each(function (index, item) {
                        values.push(item.innerText);
                    });

                    return values;
                },
                set: function (newValue) {
                    if (Array.isArray(newValue) == false) throw 'Parameter is not an array.';

                    _$element.find('.tag').remove();
                    for (var i = 0; i < newValue.length; i++) this.insertBeforeInput(newValue[i]);
                }
            },
            'confirmKeys': {
                get: function () { return confirmKeys; },
                set: function (newValue) {
                    if (Array.isArray(newValue) == false) throw 'Parameter is not an array.';
                    confirmKeys = newValue;
                }
            },


            'input': { get: function () { return _input } }
        });


        _$element.on('click', '.X-Remove', function () {
            $(this).parent('.tag').remove();
            control.onchange();
        });
        _$element.click(function (e) {
            if ($(e.originalEvent.target).is(_$element)) _input.focus()
        });
        _$input.keypress(function (e) {
            this.setAttribute('size', this.value.length + 2);
        });
        _$input.keydown(function (e) {
            var event = e.originalEvent;
            if (event.keyCode == 27) this.value = '';
            else if (confirmKeys.indexOf(event.keyCode) != -1) {
                var tag = this.value.trim();
                if (tag != '') {
                    event.preventDefault();
                    if (control.insertBeforeInput(tag)) control.onchange();
                    this.value = ''; _input.setAttribute('size', 1);
                }
            }
            else if (event.keyCode == 37 && this.value == '') {
                _$input.insertBefore(_$input.prev()); _input.focus();
            }

            else if (event.keyCode == 39 && this.value == '') {
                _$input.insertAfter(_$input.next()); _input.focus();
            }

        });
        _$input.focusout(function () {
            var newTag = this.value.trim();
            if (control.insertBeforeInput(newTag)) control.onchange();

            this.value = ''; _input.setAttribute('size', 1);
        });

        /// startup property
        if (option != undefined) {
            if (option.value != undefined) this.value = option.value;
            if (option.confirmKeys != undefined) this.confirmKeys = option.confirmKeys;
        }
        
    }

    /** @class */
    intell.controls.TargetPopup = function TargetPopup(element, overrideOption) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__TargetPopup__ != undefined) return element.__TargetPopup__;
        if (this instanceof TargetPopup == false) return new TargetPopup(element, overrideOption);
        //////////////////////////////////////////////
        var popup = element.__TargetPopup__ = this;
        
        this.element = element;
        var $element = this.$element = $(element);
        //properties
        var target;
        var autoHide = true;
        var locations = [1, 3, 9, 7];
        var option = {  insideWindow: true, space: 5, margin: 4 };
        var previousSolution;

        var delayHideTime = 500;
        var delayHideClass = 'OUT';
        var activeClass = 'ACTIVE';
        var targetActiveClass = 'ACTIVE';
        //private 
        var isVisible = false;
        var isFadingOut = false;

        Object.defineProperties(this, {
            target: {
                get: function () { return target },
                set: function (newValue) { this.setTarget(newValue) }
            },
            autoHide: {
                get: function () { return autoHide },
                set: function (newValue) { autoHide = newValue }
            },
            locations: {
                get: function () { return locations },
                set: function (newValue) { locations = newValue }
            },
            option: {
                get: function () { return option },
                set: function (newValue) { option = newValue }
            },
            previousSolution: { get: function () { return previousSolution } },

            delayHideTime: {
                get: function () { return delayHideTime },
                set: function (newValue) { delayHideTime = newValue }
            },
            delayHideClass: {
                get: function () { return delayHideClass },
                set: function (newValue) { delayHideClass = newValue }
            },
            activeClass: {
                get: function () { return activeClass },
                set: function (newValue) { activeClass = newValue }
            },
            targetActiveClass: {
                get: function () { return targetActiveClass },
                set: function (newValue) { targetActiveClass = newValue }
            }
        });

        // methods
        this.setTarget = function (newValue) {
            if (newValue != undefined && newValue instanceof Element == false) throw 'Parameter must be element or null';
            //if (newValue == target) return;
            if (target != undefined && target != newValue) $(target).removeClass(targetActiveClass); // remove active for previous target

            target = newValue;

            if (target == undefined) popup.hide();
            else {
                this.show(target);
                $(target).addClass(targetActiveClass);
            }

            return previousSolution;
        }
        this.show = function(arg1, arg2, arg3) {
            //show(element?: HTMLElement): void
            //show(offset: JQuery.CoordinatesPartial): void

            var previous_isVisible = isVisible;

            if (isFadingOut == true) controls.stopHide(element);
            isFadingOut = false;
            isVisible = true;

            previousSolution = intell.showAt(arg1, element, locations, option);
            $element.addClass(activeClass);

            if (previous_isVisible == false) popup.onshow();
        }

        this.hide = function() {
            if (isVisible == false) {
                // 1. Invisible 
            } else if (isVisible == true && isFadingOut == true) {
                // 2. Visible, Fadeout
            } else {
                // 4. Visible completely

                isFadingOut = true;

                $element.removeClass(activeClass);
                controls.startHide(element, delayHideTime, delayHideClass, function() {
                    isVisible = false
                    isFadingOut = false;
                    popup.onhide();
                })
            }
        }

        //events
        this.onshow = intell.createEventFunction();
        this.onhide = intell.createEventFunction();

        $element.clickoutside(function (event) {
            if (autoHide == false) return;
            if (target == undefined) return;
            if ($(event.target).closest(target).length > 0) return;

            popup.target = undefined;
        });

        
        if (overrideOption != undefined) {

            if (overrideOption.autoHide != undefined) this.autoHide = overrideOption.autoHide;
            if (overrideOption.locations != undefined) this.locations = overrideOption.locations;

            if (overrideOption.delayHideTime != undefined) this.delayHideTime = overrideOption.delayHideTime;
            if (overrideOption.delayHideClass != undefined) this.delayHideClass = overrideOption.delayHideClass;
            if (overrideOption.activeClass != undefined) this.activeClass = overrideOption.activeClass;
            if (overrideOption.targetActiveClass != undefined) this.targetActiveClass = overrideOption.targetActiveClass;
            


            var showOption = overrideOption.option;
            if (showOption != undefined) {
                if (showOption.insideRect != undefined) this.option.insideRect = showOption.insideRect;
                if (showOption.space != undefined) this.option.space = showOption.space;
                if (showOption.margin != undefined) this.option.margin = showOption.margin;
                if (showOption.insideWindow != undefined) this.option.insideWindow = showOption.insideWindow;
                if (showOption.insideOffsetParent != undefined) this.option.insideOffsetParent = showOption.insideOffsetParent;
            }


            

        }
    };




})();
