/*! intell.js | https://github.com/XHighIntell/jintell */

'use strict';


(function() {
    var intell = window.intell = {};
    if (window.$$ == undefined) window.$$ = intell;
       
    
    
    intell.Rectangle = function Rectangle(left, top, width, height) {
        if (Rectangle.int == undefined) {
            Rectangle.int = true;

            Rectangle.prototype.x = 0;
            Rectangle.prototype.y = 0;
            Rectangle.prototype.width = 0;
            Rectangle.prototype.height = 0;

            Object.defineProperties(Rectangle.prototype, {
                left: {
                    get: function() { return this.x },
                    set: function(newValue) { this.x = newValue }
                },
                top: {
                    get: function() { return this.y },
                    set: function(newValue) { this.y = newValue }
                },
                right: {
                    get: function() { return this.x + this.width },
                    set: function(newValue) { this.x = newValue - this.width }
                },
                bottom: {
                    get: function() { return this.y + this.height },
                    set: function(newValue) { this.y = newValue - this.height }
                }
            });

            Rectangle.prototype.intersectsWith = function(rect) {
                var rLeft = rect.left;
                var rTop = rect.top;
                var rWidth = rect.width;
                var rHeight = rect.height;

                if (rWidth == undefined) rWidth = 0;
                if (rHeight == undefined) rHeight = 0;

                return (rLeft < this.left + this.width) && (this.left < rLeft + rWidth) &&
                      (rTop < this.top + this.height) && (this.top < rTop + rHeight);

            }
            Rectangle.prototype.contains = function(rect) {
                
                return (this.left <= rect.left) && (this.top + this.width >= rect.top + rect.width) &&
                    (this.top <= rect.top) && (this.top + this.height >= rect.top + rect.height);
            }
        }

        this.x = left || 0;
        this.y = top || 0;
        this.width = width || 0;
        this.height = height || 0;
    }
    intell.Event = function Event() {
        if (Event.int == undefined) {
            Event.prototype.preventDefault = function () { this.defaultPrevented = true }
            Event.int = true;
        }
        if (this instanceof Event == false) return new Event();
        ////////////////////////////////////////////////

        Object.defineProperties(this, {
            defaultPrevented: { value: false, writable: true }
        });
    }

    intell.createOnFunction = function (target) {
        return function on(type, handler, option) {
            if (target == undefined) target = this;
            target.addEventListener.apply(target, arguments)

            return this;
        }
    }
    intell.createEventFunction = function (onlyFire1time) {
        var fn = function (callback) {
            if (typeof callback == "function") {
                if (onlyFire1time && fn.called == true) callback.apply(this, fn.calledArguments)
                else fn.events.push(callback);
            } else {
                for (var i = 0; i < fn.events.length; i++) fn.events[i].apply(this, arguments);
                fn.called = true;
                fn.calledArguments = arguments;
            }
            return this;
        };
        fn.events = [];
        return fn;
    };

    intell.get = function(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url);

        request.on = intell.createOnFunction();
        request.loadstart = function(callback) { return this.on('loadstart', callback) }
        request.readystatechange = function(callback) { return this.on('readystatechange', callback) }
        request.progress = function(callback) { return this.on('progress', callback) }
        request.load = function(callback) { return this.on('load', callback) }
        request.loadend = function(callback) { return this.on('loadend', callback) }
        request.error = function(callback) { return this.on('error', callback) }

        return request;
    };
    intell.post = function(url) {
        var request = new XMLHttpRequest();
        request.open('POST', url);

        request.on = intell.createOnFunction();
        request.loadstart = function(callback) { return this.on('loadstart', callback) }
        request.progress = function(callback) { return this.on('progress', callback) }
        request.error = function(callback) { return this.on('error', callback) }
        request.load = function(callback) { return this.on('load', callback) }
        request.loadend = function(callback) { return this.on('loadend', callback) }
        request.readystatechange = function(callback) { return this.on('readystatechange', callback) }


        request.upload.on = intell.createOnFunction();
        request.upload.loadstart = function(callback) { return this.on('loadstart', callback) }
        request.upload.progress = function(callback) { return this.on('progress', callback) }
        request.upload.error = function(callback) { return this.on('error', callback) }
        request.upload.timeout = function(callback) { return this.on('timeout', callback) }
        request.upload.load = function(callback) { return this.on('load', callback) }
        request.upload.loadend = function(callback) { return this.on('loadend', callback) }



        return request;
    };

    // 2 overloads: rectangle and point
    intell.getRectWhenShowAt = function(targetRect, elementRect, location, option) {

        // handle overloads
        var targetRect_Left = targetRect.left;
        var targetRect_Top = targetRect.top;
        var targetRect_Width = (targetRect.width == undefined ? 0 : targetRect.width);    // cover point to rectangle
        var targetRect_Height = (targetRect.height == undefined ? 0 : targetRect.height); // cover point to rectangle


        var result = { location: location };

        var position = new $$.Rectangle(0, 0, elementRect.width, elementRect.height);
        var perfect = true;
        var canSeeTarget = true;

        option = (option == undefined ? {} : option);
        var insideRect = option.insideRect;
        var space = option.space | 0;
        var margin = option.margin | 0;

        switch (location) {
            case 1: case 9:
                position.left = targetRect_Left; break;
            case 2: case 8:
                position.left = targetRect_Left + (targetRect_Width - position.width) / 2; break;
            case 3: case 7:
                position.left = targetRect_Left + targetRect_Width - position.width; break;
            case 4: case 5: case 6:
                position.left = targetRect_Left + targetRect_Width + space; break;
            case 10: case 11: case 12:
                position.left = targetRect_Left - position.width - space; break;
        }
        switch (location) {
            case 1: case 2: case 3:
                position.top = targetRect_Top - position.height - space; break;
            case 4: case 12:
                position.top = targetRect_Top; break;
            case 5: case 11:
                position.top = targetRect_Top + (targetRect_Height - position.height) / 2; break;
            case 6: case 10:
                position.top = targetRect_Top + targetRect_Height - position.height; break;
            case 7: case 8: case 9:
                position.top = targetRect_Top + targetRect_Height + space; break;
        }


        if (insideRect != undefined) {
            
            //#regionCheck Left
            //if popup.Width greater insideRect
            if (position.width > insideRect.width) {
                position.left = insideRect.left;
                perfect = false;
            }
            else if (position.width + 2 * margin > insideRect.width) {
                position.left = insideRect.left + (insideRect.width - position.width) / 2;
                perfect = false;
            }
            else {
                // if position is outside left Bound
                if (position.left < insideRect.left + margin) {
                    position.left = insideRect.left + margin;
                    if ([1, 2, 3, 7, 8, 9].indexOf(location) == -1) perfect = false
                }
                // if position is outside right Bound
                if (position.right > insideRect.left + insideRect.width - margin) {
                    position.right = insideRect.left + insideRect.width - margin;
                    if ([1, 2, 3, 7, 8, 9].indexOf(location) == -1) perfect = false
                }
            }
            //#endregion

            if (position.height > insideRect.height) { position.top = insideRect.top; perfect = false; }
            else if (position.height + 2 * margin > insideRect.height) {
                position.top = insideRect.top + (insideRect.height - position.height) / 2;
                perfect = false;
            }
            else {
                // if position is outside top Bound
                if (position.top < insideRect.top + margin) {
                    position.top = insideRect.top + margin;
                    if ([4, 5, 6, 10, 11, 12].indexOf(location) == -1) perfect = false;
                }
                // if position is outside bottom Bound
                if (position.bottom > insideRect.top + insideRect.height - margin) {
                    position.bottom = insideRect.top + insideRect.height - margin;
                    if ([4, 5, 6, 10, 11, 12].indexOf(location) == -1) perfect = false;
                }
            }

            // check if intersectsWith targetRect
            if (position.intersectsWith(targetRect) == true) { canSeeTarget = false; }
        }

        result.position = position;
        result.perfect = perfect;
        result.canSeeTarget = canSeeTarget;
        
        return result;
    };
    // 2 overloads: rectangle and point
    intell.findPlaceToShow = function (targetRect, elementRect, locations, option) {
        // 
        // locations= [1, 2, 3, 4, 5, 6, 7]

        var o = {};
        var results = o.results = [];



        for (var i = 0; i < locations.length; i++) {
            var result = results[i] = intell.getRectWhenShowAt(targetRect, elementRect, locations[i], option);
            result.location = locations[i];

            if (result.perfect == true) {
                o.location = result.location;
                o.position = result.position;
                o.canSeeTarget = result.canSeeTarget;
                return o;
            }
        }

        o.location = results[0].location;
        o.position = results[0].position;
        o.canSeeTarget = results[0].canSeeTarget;
        return o;
    }


    intell.showAt = function(target, popup, locations, option) {
        //findPlaceToShow(targetRect: Intell.Rectangle, elementRect: Intell.Rectangle, locations: number[], option?: Intell.IGetRectWhenShowAtOption): Intell.IShowAtResult;
        //findPlaceToShow(targetPoint: JQuery.Coordinates, elementRect: Intell.Rectangle, locations: number[], option ?: Intell.IGetRectWhenShowAtOption): Intell.IShowAtResult;
        if (target instanceof HTMLElement == true) return showAtElement.apply(this, arguments);
        else return showAtPoint.apply(this, arguments);
    }
    function showAtElement(target, popup, locations, option) {
        if (option != undefined) {
            var option = Object.assign({}, option)

            //if option.insideRect == null, we will help to create them from options
            if (option.insideRect == undefined) {
                if (option.insideOffsetParent == true) {
                    var offsetParent = target.offsetParent;
                    var inside_offset = $(offsetParent).innerOffset();

                    option.insideRect = new intell.Rectangle(inside_offset.left, inside_offset.top, offsetParent.clientWidth, offsetParent.clientHeight);
                } else if (option.insideWindow == true) {
                    option.insideRect = new intell.Rectangle(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight);
                }
            }
        }

        var $popup = $(popup);
        //1. prevent flicker - set left and hidden
        $popup.css({ left: '-900px', visibility: 'hidden' });

        //2. Try to show popup to DOM.
        tryToShow(popup);

        //3. Get targetRect and elementRect for findPlaceToShow() function
        var targetRect;
        var $target = $(target);
        var target_offset = $target.offset();
        targetRect = { left: target_offset.left, top: target_offset.top, width: target.offsetWidth, height: target.offsetHeight };

        var elementRect = { left: 0, top: 0, width: popup.offsetWidth, height: popup.offsetHeight };

        //4. get position and show
        var goodPlace = intell.findPlaceToShow(targetRect, elementRect, locations, option);
        $(popup).offset(goodPlace.position);
        $popup.css({ visibility: '' });

        return goodPlace;
    }
    function showAtPoint(point, popup, locations, option) {
        if (option != undefined) {
            var option = Object.assign({}, option)
            
            //if option.insideRect == null, we will help to create them from options
            if (option.insideRect == undefined) {
                if (option.insideWindow == true) option.insideRect = new intell.Rectangle(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight);
                
            }
        }

        var $popup = $(popup);
        //1. prevent flicker - set left and hidden
        $popup.css({ left: '-900px', visibility: 'hidden' });

        //2. Try to show popup to DOM.
        tryToShow(popup);
        
        //3. Get targetRect and elementRect for findPlaceToShow() function
        //var $target = $(target);
        var target_offset = point; //$target.offset();
        var elementRect = { left: 0, top: 0, width: popup.offsetWidth, height: popup.offsetHeight };
        //var targetRect = { left: target_offset.left, top: target_offset.top, width: target.offsetWidth, height: target.offsetHeight };

        //4. get position and show
        var goodPlace = intell.findPlaceToShow(target_offset, elementRect, locations, option);
        $popup.offset(goodPlace.position).css({ visibility: '' });

        return goodPlace;
    }


    function tryToShow(element) {
        var elementcomputedStyle = window.getComputedStyle(element);
        if (element.style.display == 'none') element.style.display = '';
        if (elementcomputedStyle.display == 'none') element.style.display = 'block';
    }

    intell.qs = function (search) {
        ///<signature>
        ///<summary>Parse the location.search, constructing the JavaScript value or object described by the string.</summary>
        ///<returns type="Object"/>
        ///</signature>

        ///<signature>
        ///<summary>Parse a query string, constructing the JavaScript value or object described by the string.</summary>
        ///<param name='search' type='String'/>
        ///<returns type="Object"/>
        ///</signature>
        search = search || window.location.search.substr(1);
        var o = search.split('&');

        var r = {};
        for (var i = 0; i < o.length; i++) {
            if (o[i] == "") continue;

            var p = o[i].split('=');
            p[0] = decodeURIComponent(p[0]);
            p[1] = decodeURIComponent(p[1] == undefined ? '' : p[1]);
            r[p[0]] = p[1];
        };
        return r;
    };


})();

/*********   String Extension   *********/
!function () {
    String.prototype.between = function (startWith, endWith, include) {
        ///<signature>  
        ///<summary>returns the part of the string between the start and end string.</summary>
        ///<param name='startWith' type="String">.</param>
        ///<param name='endWith' type="String">.</param>
        ///<param name='include' type="Boolean">.</param>
        ///<returns type="String"/>
        ///</signature>
        
        var index_start = this.indexOf(startWith);
        if (index_start == -1) return null;


        var index_end = this.indexOf(endWith, index_start + startWith.length);
        if (index_end == -1) return null;

        if (include == true)
            return this.substring(index_start, index_end + endWith.length);
        else
            return this.substring(index_start + startWith.length, index_end);

    }
}();
/*********   Number Extension   *********/
!function () {
    function splitWithoutDelimiter(input) {
        //input = '-212';
        //output = ['-','212']

        var array = [];
        var i = input.length;

        for (var i = 1; i < 100; i++) {

            if (input.length - i * 3 > 0) {
                array.unshift(input.substr(input.length - i * 3, 3));
            } else {
                array.unshift(input.substr(0, input.length - i * 3 + 3));
                break;
            }
        }

        return array;

    };


    Number.prototype.formatNumber = function (option) {
        ///<signature>  
        ///<summary>Format number into string; 1,000,000.12;</summary>
        ///<returns type="String"/>
        ///</signature>
        ///<glyph>vs:GlyphGroupTemplate</glyph>

        if (option == undefined) option = {};

        var separate = (option.separate == null ? ',' : option.separate);
        var decimal_point = option.decimal_point || '.';
        var decimals = option.decimals;

        var text;
        if (decimals) text = this.toFixed(decimals); // "-100.230"
        else text = this.toString(); // "-100.23"
        
        var array = text.split('.');
        var left = array[0];  // "-100"
        var right = array[1]; // "23"
        
        var left = splitWithoutDelimiter(left); // ['-', 100] 
        if (left[0] == '-') {
            left[0] = '';
            left[1] = '-' + left[1];
            left.splice(0, 1);
        }

        left = left.join(separate); 
        
        if (right) return left + decimal_point + right;
        else return left;

        
    }
}();

/*********   Jquery Extension   *********/
!function() {
    var _registered_clickout_items = [];
    $.fn.clickoutside = function(callback) {
        for (var i = 0; i < this.length; i++) {
            _registered_clickout_items.push({ element: this[i], event: callback });
        }
        return this;
    }
    window.addEventListener('click', function(e) {
        var path = e.path || $(e.target).parentsUntil().toArray();
        for (var i = 0; i < _registered_clickout_items.length; i++) {
            var item = _registered_clickout_items[i];

            if (path.indexOf(item.element) == -1) item.event.call(item.element, e);
        }
    }, { capture: true });


    var mousedownoutside_items = [];
    $.fn.mousedownoutside = function(callback) {
        for (var i = 0; i < this.length; i++)
            mousedownoutside_items.push({ element: this[i], event: callback });
        return this;
    }
    window.addEventListener('mousedown', function(e) {

        var path = e.path || $(e.target).parentsUntil().toArray();
        for (var i = 0; i < mousedownoutside_items.length; i++) {
            var item = mousedownoutside_items[i];

            if (path.indexOf(item.element) == -1) item.event.call(item.element, e);
        }
    }, { capture: true });

    $.fn.innerOffset = function() {
        var offset = this.offset();
        var styles = getComputedStyle(this[0]);
        offset.left += parseFloat(styles.borderLeftWidth.replace('px'));
        offset.top += parseFloat(styles.borderTopWidth.replace('px'));

        return offset;
    }
    $.fn.centerOffset = function() {
        var offset = this.offset();
        offset.left += this.outerWidth() / 2;
        offset.top += this.outerHeight() / 2;

        return offset;
    }

    $.fn.positionOfOffset = function(offset) {
        var current_offset = this.offset();
        var current_postion = this.position();

        var position = { left: 0, top: 0 };

        position.left = current_postion.left + offset.left - current_offset.left;
        position.top = current_postion.top + offset.top - current_offset.top;

        return position;
    }
}();


if (Object.assign == undefined) {
    Object.assign = $.extend;
}﻿'use strict';

!(function () {
    if (window.intell == undefined) window.intell = {};

    /** @type {intell} */
    var intell = window.intell;
    
       
    /** @type Intell.Controls */
    var controls = intell.controls = {};

    controls.hide = function(element) {
        var elementcomputedStyle = window.getComputedStyle(element);
        if (elementcomputedStyle.display != 'none') element.style.display = 'none';        
    }
    controls.startHide = function(element, timeout, delayHideClass, oncomplete) {

        //controls.stopHide(element);

        var $element = $(element);
        $element.addClass(delayHideClass);


        var timerHander = setTimeout(function () {
            //$element.removeClass(delayHideClass);
            controls.stopHide(element);

            controls.hide(element);

            if (typeof oncomplete === "function") oncomplete();
        }, timeout);

        controls.startHide.items.push({ element: element, timerHander: timerHander, delayHideClass: delayHideClass });

        return timerHander;
    }
    controls.startHide.items = [];
    controls.stopHide = function(element) {
        
        for (var i = 0; i < controls.startHide.items.length; i++) {
            var item = controls.startHide.items[i];
            if (item.element == element) {
                $(item.element).removeClass(item.delayHideClass);
                clearTimeout(item.timerHander);

                controls.startHide.items.splice(i, 1)
                return;
            } 
        }
    }


    !function() {
        /** @type Intell.Controls.MenuConstructor */
        var Menu = controls.Menu = function(element, option) {
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

    }();
   

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

        // NumericUpDown can work even without div
        if (element instanceof HTMLInputElement) {
            _$input = _$element;
            _input = element;
        }

        //properties
        var value = parseFloat(_$input[0].value.replace(/[, ]/g, '')); if (isNaN(value)) value = 0;
        var session_value = value;
        var increment = 1;
        var unit = '';
        var min = undefined;
        var max = undefined;
        var decimalPlaces = 0;
        var separate = undefined;

        //define property
        Object.defineProperties(this, {
            'value': {
                get: function () { return value },
                set: function(newValue, e) {
                    if (typeof newValue == 'string') newValue = parseFloat(newValue);
                    

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
                set: function(value) {
                    if (typeof value == 'number') increment = value;
                    else if (typeof value == 'string') {
                        value = parseInt(value);
                        if (isNaN(value) == false) increment = value;
                        else throw "increment can't be NaN";
                    }
                    else throw "increment is invalid";
                }
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
            'separate': {
                get: function() { return separate },
                set: function(newValue) {
                    if (separate != newValue) {
                        separate = newValue;
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
            _$input.val(value.formatNumber({ decimals: decimalPlaces, separate: separate }) + unit);
        }
        function session_increaseBy(number) {
            session_value += number;
            if (min != null && session_value < min) session_value = min;
            if (max != null && session_value > max) session_value = max;

            updateString(session_value);
        }


        _$input.keyup(function(e) {
            session_value = parseFloat(_input.value.replace(/[, ]/g, ''));
            if (isNaN(session_value)) session_value = 0;
        });
        _$input.keydown(function(e) {
            if (e.originalEvent.keyCode == 27) {
                session_value = value;
                _$input[0].blur(); return;
            }
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
            if (option.value != undefined) value = parseFloat(option.value);
            
            if (option.min != undefined) control.min = option.min;
            if (option.max != undefined) control.max = option.max;
            if (option.increment != undefined) control.increment = option.increment;
            if (option.unit != undefined) control.unit = option.unit;
            if (option.decimalPlaces != undefined) control.decimalPlaces = option.decimalPlaces;
            if (option.separate != undefined) control.separate = option.separate;
            
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
    intell.controls.ComboBox = function ComboBox(element, option) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__ComboBox__ != undefined) return element.__ComboBox__;
        if (this instanceof ComboBox == false) return new ComboBox(element, option);
        //////////////////////////////////////////////

        /** @type {Intell.Controls.ComboBox} */
        var control = element.__ComboBox__ = this;
        var $element = $(element);

        var optionsElement = $element.find('.Options')[0];
        var $options = $element.find('.Options');
        control.element = element;
        

        var selectedIndex = -1;
        var selectedElement = undefined;
        var popupLocations = [9, 1];
        var popupOption = { insideWindow: true, space: -1 };
            
        // properties
        Object.defineProperties(this, {
            selectedIndex: {
                get: function() { return selectedIndex  },
                set: function(newValue) {
                    // In this block, when user set a value to selectedIndex
                    // Display html of selected item, 

                    // 1. ignore if new nalue is same current value
                    // 2. if newValue is outside range [0, childElementCount], set selectedIndex to -1
                    // 3. display label base on selectedIndex
                    // 4. raise onlabel event to get some information.


                    // --1--
                    if (newValue == selectedIndex) return;

                    // --2--
                    var options_element = $options[0];
                    if (newValue < 0 || options_element.childElementCount <= newValue) selectedIndex = -1;
                    else selectedIndex = newValue;

                    // --3--
                    if (selectedIndex == -1) {
                        $element.find('.Selected-Option').html('');
                    } else {
                        // --4--
                        var e_onlabel = new intell.Event();
                        var target = e_onlabel.target = $options[0].children[selectedIndex];
                        control.onlabel(e_onlabel);

                        $options.find('>div').removeClass('ACTIVE');
                        target.classList.add('ACTIVE');

                        if (e_onlabel.defaultPrevented == false) {
                            

                            $element.find('.Selected-Option').html(target.outerHTML);
                        }
                            
                    }

                }
            },
            selectedElement: {
                get: function() { return $options[0].children[selectedIndex]; }
            },
            popupLocations: {
                get: function() { return popupLocations },
                set: function(newValue) {
                    if (Array.isArray(newValue) == false) throw "newValue must be Array";

                    popupLocations = newValue;
                }
            },
            popupOption: {
                get: function() { return popupOption },
                set: function(newValue) { popupOption = newValue; }
            },
            optionsElement: {
                get: function() { return optionsElement }
            }
        });

        // events
        control.onlabel = intell.createEventFunction();
        control.onchange = intell.createEventFunction();

        // methods

        $element.mousedown(function(e) {
            // show dropdown menu when click on control but not from ".Options"

            var ev = e.originalEvent;
            if (ev.button != 0) return;

            if ($(ev.target).parentsUntil(element, '.Options').length == 0) {

                if ($options.is(':visible') == false) {
                    e.preventDefault();
                    intell.showAt(element, $options[0], popupLocations, popupOption);

                    //ev.preventDefault();
                }
                else
                    $options.hide();
            }
            
        });
        $element.mouseup(function(e) {
            var originalEvent = e.originalEvent;
            if (originalEvent.button != 0) return;

            var $target = $(originalEvent.target)
            if ($target.closest('.Selected-Option', element).length != 0) return;

            var $item = $target.closest('.Options>*', element);
            var index = $item.index();

            if (selectedIndex == index) {

            } else {
                control.selectedIndex = index;
                control.onchange();
            }
            $options.hide();
        });
        
        $element.mousedownoutside(function() { $options.hide() });
        //$element.on('mouseenter', '.Options>*', function() { $(this).addClass('ACTIVE') });
        //$element.on('mouseleave', '.Options>*', function() {
        //    $(this).removeClass('ACTIVE')
        //})


        if (option) {
            if (option.selectedIndex != undefined) control.selectedIndex = option.selectedIndex;
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
