intell.controls.Menu = new function() {
    
    //var ns = this;

    var controls = intell.controls;

    /** @type Intell.Controls.Menu.MenuConstructor */
    var Menu = function(element, option) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__Menu__ != undefined) return element.__Menu__;
        if (this instanceof Menu == false) return new Menu(element, option);
        //////////////////////////////////////////////

        /** @type {Intell.Controls.Menu.Menu} */
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

                this.ondropdownopen({ result: result });
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
        var ondropdownopen = this.ondropdownopen = intell.createEventFunction();
        var ondropdownclose = this.ondropdownclose = intell.createEventFunction();
        var onmenuitemclick = this.onmenuitemclick = intell.createEventFunction();

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
                    var children = Menu.createMenuItemsElement(item.items);
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

    return Menu;
}();

