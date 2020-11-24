/*! intell.js | https://github.com/XHighIntell/jintell */

'use strict';


(function() {
    var intell = window.intell = {};
    if (window.intell == undefined) window.intell = intell;
       
    
    
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

        var position = new intell.Rectangle(0, 0, elementRect.width, elementRect.height);
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
                //if (option.insideWindow == true) option.insideRect = new intell.Rectangle(0, 0, document.documentElement.scrollWidth, document.documentElement.scrollHeight);
                //if (option.insideWindow == true) option.insideRect = new intell.Rectangle(window.pageXOffset, window.pageYOffset, window.innerWidth, window.innerHeight);
                if (option.insideWindow == true) option.insideRect = new intell.Rectangle(window.pageXOffset, window.pageYOffset, document.documentElement.clientWidth, document.documentElement.clientHeight);
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



    intell.controls.NumericUpDown = function NumericUpDown(element, option) {
        if (element instanceof jQuery == true) element = element[0];
        if (element.__NumericUpDown__ != undefined) return element.__NumericUpDown__;
        if (this instanceof NumericUpDown == false) return new NumericUpDown(element, option);
        ////////////////////
        /** @type Intell.Controls.NumericUpDown */
        var _this = element.__NumericUpDown__ = this;
        var $element = $(element);
        var $input = $element.find('input');
        var $up = $element.find('.X-Up');
        var $down = $element.find('.X-Down');

        var _input = $input[0];
        

        _this.element = element;

        // NumericUpDown can work even without div
        if (element instanceof HTMLInputElement) {
            $input = $element;
            _input = element;
        }

        // fields
        var session_value;

        // properties
        var value;
        var increment = 1;
        var unit = '';
        var min = undefined;
        var max = undefined;
        var decimalPlaces = 0;
        var separate = undefined;
        var nullable = false;

        // define property
        Object.defineProperties(_this, {
            'value': {
                get: function() { return value },
                set: function(newValue) {
                    if (value == newValue) return;

                    _this.setValueInternal(newValue);
                    _this.setTextInternal(newValue);
                }
            },
            'increment': {
                get: function() { return increment },
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
                get: function() { return unit },
                set: function(newValue) {
                    if (newValue == unit) return;
                    if (typeof newValue != 'string') throw new Error("The 'unit' must be string.");

                    unit = newValue;
                    _this.setTextInternal(value);
                }
            },
            'min': {
                get: function() { return min },
                set: function(newValue) {
                    if (newValue == min) return;
                    if (newValue == null) min = undefined;
                    if (typeof newValue != 'number') throw new Error("The 'min' must be number or null.");

                    min = newValue;
                    if (min > max) max = min;
                    if (value < min) value = min;
                    _this.setTextInternal(value);

                }
            },
            'max': {
                get: function() { return max },
                set: function(newValue) {
                    if (newValue == undefined) max = undefined;
                    else if (max != newValue && typeof newValue == 'number') {
                        max = newValue;
                        if (max < min) min = max;
                        if (value > max) value = max;
                        _this.setTextInternal(value);
                    }

                }
            },
            'decimalPlaces': {
                get: function() { return decimalPlaces },
                set: function(newValue) {
                    if (decimalPlaces != newValue) {
                        decimalPlaces = newValue;
                        _this.setTextInternal(value);
                    }
                }
            },
            'separate': {
                get: function() { return separate },
                set: function(newValue) {
                    if (separate != newValue) {
                        separate = newValue;
                        _this.setTextInternal(value);
                    }
                }
            },
            'nullable': {
                get: function() { return nullable },
                set: function(newValue) {
                    if (nullable == newValue) return;
                    if (typeof nullable != 'boolean') throw new Error("The 'nullable' must be boolean.");

                    nullable = newValue;
                }
            },
            'input': {
                get: function() { return _input }
            }
        });

        // methods
        _this.setValueInternal = function(newValue) {
            var oldValue = value;
            var newValue = parseFloat(newValue);

            if (isNaN(newValue) == true) newValue = null;
            if (newValue == oldValue) return;                  // exit because nothing was changed
            if (newValue == null && nullable == false) return; // exit because we are not allow null

            if (newValue != null && min != null && newValue < min) newValue = min;
            if (newValue != null && max != null && newValue > max) newValue = max;

            value = newValue;
            return true;
        }
        _this.setTextInternal =  function(value) {
            if (value == null) $input.val('')
            else $input.val(value.formatNumber({ decimals: decimalPlaces, separate: separate }) + unit);
        }
        function increaseSessionBy(number) {
            //if (session_value

            if (typeof session_value != 'number') { session_value = 0; }

            session_value += number;
            if (min != null && session_value < min) session_value = min;
            if (max != null && session_value > max) session_value = max;

            _this.setTextInternal(session_value);
        }

        // events
        _this.onchange = intell.createEventFunction()

        // handle events
        $input.focus(function() {
            $element.addClass('ACTIVE');
            session_value = value;
        });
        $input.on('mousewheel', function(event) {
            var e = event.originalEvent;
            if (document.activeElement != $input[0]) return;
            if (e.wheelDelta > 0) increaseSessionBy(increment);
            else increaseSessionBy(-increment);
            e.preventDefault(); //prevent scroll
        });
        $input.keydown(function(e) {
            if (e.originalEvent.keyCode == 27) {
                session_value = value;
                $input[0].blur(); return;
            }
        });
        $input.keyup(function(e) {
            var newValue = parseFloat(_input.value.replace(/[, ]/g, ''));

            if (isNaN(newValue) == true) newValue = null;
            session_value = newValue;
        });
        $input.focusout(function() {
            $element.removeClass('ACTIVE');

            var oldValue = value;

            if (_this.setValueInternal(session_value) == true) {
                var newValue = value;

                var event = intell.Event();
                Object.defineProperties(event, {
                    oldValue: { value: oldValue },
                    newValue: { value: newValue }
                });
                _this.onchange(event);

                if (event.defaultPrevented == true) value = oldValue;
                else _this.setTextInternal(value);
            } else {
                _this.setTextInternal(value);
            };
        });

        $up.click(function() { increaseSessionBy(increment) });
        $down.click(function() { increaseSessionBy(-increment); });

        // non-important
        $input.keypress(function(event) {
            var key = event.originalEvent.key;
            if ('1234567890., '.indexOf(key) == -1) { return false }
        })
        $up.add($down).mousedown(function(e) {
            // When user click on up/down button, set focus to textbox.
            if (document.activeElement != $input[0]) $input.focus();
            e.originalEvent.preventDefault()
        });


        !function() {
            var start_value = $input.val();


            if (option != undefined) {
                if (option.min != undefined) _this.min = option.min;
                if (option.max != undefined) _this.max = option.max;
                if (option.increment != undefined) _this.increment = option.increment;
                if (option.unit != undefined) _this.unit = option.unit;
                if (option.decimalPlaces != undefined) _this.decimalPlaces = option.decimalPlaces;
                if (option.separate != undefined) _this.separate = option.separate;
                if (option.nullable != undefined) _this.nullable = option.nullable;
                if (option.value !== undefined) start_value = option.value;

                if (nullable == false) _this.value = 0;
            }

            _this.setValueInternal(start_value);
            _this.setTextInternal(value);
           
            
        }();
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
        this.onchange = intell.createEventFunction();

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
        this.onchange = intell.createEventFunction();

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
        $element.mouseup(function(ev) {
            var e = ev.originalEvent;
            if (e.button != 0) return;

            var $target = $(e.target)
            var $item = $target.closest('.Options>*', element);
            if ($item.length == 0) return;

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
﻿intell.controls.Menu = new function() {
    
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

﻿

intell.controls.Menu2 = new function() {
    /** @type {Intell.Controls.Menu2.Namespace} */
    var ns = this;

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
            $menu.on('mouseleave', '.Children', function(e) {
                var event = e.originalEvent;
                var $target = $(event.target);
                var $children = $target.closest('.Children');
                var $menuItem = $children.closest('.X-Menu-Item');

                
                if (__private.showOnHover == true) {
                    clickoutsite();
                } else {
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
                }

                //if ($menuItem.length == 0) {
                //    // mouseleave the .Children on top most
                //    if (__private.showOnHover == true) clickoutsite();
                //    
                //    return; 
                //} else {
                //    
                //}

                

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

                console.log('need html to object');

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

﻿
intell.controls.TreeView = new function() {
    /** @type {Intell.Controls.TreeView.Namespace} */
    var ns = this;


    /** @type Intell.Controls.TreeView.TreeViewConstructor */
    var TreeView = function() {
        var privateSymbol = Symbol ? Symbol('__private') : '__private';

        TreeView = function TreeView(element) {
            if (this instanceof TreeView == false) return new TreeView(element);

            if (element == null) element = document.createElement('div');
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__TreeView__ != undefined) return element.__TreeView__;
            
            /** @type Intell.Controls.TreeView.TreeView */
            var _this = element.__TreeView__ = this;
            var $element = $(element);
            var $elementItemAbstract = $element.find('.Item.abstract').remove().removeClass('abstract');
            var rootNode = new TreeNode(element);

            TreeNode.getPrivate(rootNode).treeView = this;

            /** @type Intell.Controls.TreeView.TreeViewPrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.elementItemAbstract = $elementItemAbstract[0];
            __private.rootNode = rootNode;
            __private.children = [];


            // events
            _this.onnodeclick = intell.createEventFunction();
            _this.onnodeexpand = intell.createEventFunction();
            _this.onnodemousedown = intell.createEventFunction();
            _this.onnodemouseup = intell.createEventFunction();

            // handle events
            $element.on('click', '.Item .Label', function(e) {

                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;
                    e.stopImmediatePropagation();

                    _this.selectedNode = node;
                    _this.onnodeclick({ node: node, event: e.originalEvent });

                }
            });
            $element.on('mousedown', '.Item .Label', function(e) {
                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;

                    _this.onnodemousedown({ node: node, event: e.originalEvent });

                }
            });
            $element.on('mouseup', '.Item .Label', function(e) {
                var $element = $(this).closest('.Item');
                var element = $element[0];
                var target = e.originalEvent.target;
                var $target = $(target);
                var $arrow = $target.closest('.Arrow', element);


                if ($arrow.length == 0) {
                    /** @type Intell.Controls.TreeView.TreeNode */
                    var node = element.__TreeNode__;

                    _this.onnodemouseup({ node: node, event: e.originalEvent });

                }
            });
            $element.on('click', '.Item .Arrow', function(e) {

                var $item = $(this).closest('.Item');
                $item.toggleClass('EXPANDED');
                var element = $item[0];
                var node = element.__TreeNode__;

                if ($item.is('.EXPANDED') == true) {
                    _this.onnodeexpand({ node: node, event: e.originalEvent });
                }

                //e.stopImmediatePropagation();
            });
        }

        // prototype
        !function() {
            var prototype = TreeView.prototype;
            
            // property
            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function() { throw new Error("'ListView.element' cannot be assigned to -- it is read only") }
                },
                elementItemAbstract: {
                    get: function() { return getPrivate(this).elementItemAbstract },
                    set: function(newValue) { throw new Error("'ListView.elementItemAbstract' cannot be assigned to -- it is read only") }
                },
                
                selectedNode: {
                    get: function() { return getPrivate(this).selectedNode },
                    /** @param {Intell.Controls.TreeView.TreeNode} newValue */
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        var selectedNode = __private.selectedNode;

                        if (newValue == selectedNode) return;
                        if (newValue.treeView != this) throw new Error("can't select a node that is not belong to TreeView.");

                        // ux/ui for previous 
                        if (selectedNode != null) $(selectedNode.element).removeClass('SELECTED');

                        // ux/ui for current
                        selectedNode = __private.selectedNode = newValue;
                        if (selectedNode != null) $(selectedNode.element).addClass('SELECTED');
                    }
                },
                children: {
                    get: function() { return getPrivate(this).rootNode.children },
                    set: function(newValue) { throw new Error("'TreeNode.children' cannot be assigned to -- it is read only") }
                }
            });

            // methods
            prototype.add = function() {
                var rootNode = getPrivate(this).rootNode;
                return rootNode.add.apply(rootNode, arguments);
            }
            prototype.clear = function() { getPrivate(this).rootNode.clear(); }

        }();

        // static

        /** @param {Intell.Controls.TreeView.TreeView} node @returns {Intell.Controls.TreeView.TreeViewPrivate} */
        function getPrivate(treeview) { return treeview[privateSymbol] }
        
        TreeView.getPrivate = getPrivate;

        return TreeView;
    }();

    //intell.controls.TreeView.TreeNode.

    /** @type Intell.Controls.TreeView.TreeNodeConstructor */
    var TreeNode = function() {
        var privateSymbol = Symbol("__private"); // "__private"
        var $itemAbstract = $(`
<div class="Item">
    <div class="Label">
        <div class="Arrow"></div>
        <div class="Icon"></div>
        <div class="Name"></div>
    </div>
</div>`);
        TreeNode = function TreeNode(element) {
            if (this instanceof TreeNode == false) return new TreeNode(element);
            if (element == null) element = $itemAbstract.clone()[0];


            /** @type Intell.Controls.TreeView.TreeNode */
            var _this = element.__TreeNode__ = this;
            var $element = $(element);
            var $label = $element.find('>.Label');
            var $arrow = $label.find('>.Arrow');
            var $icon = $label.find('>.Icon');
            var $name = $label.find('>.Name');
            var $children = $element.find('>.Children');

            /** @type Intell.Controls.TreeView.TreeNodePrivate */
            var __private = _this[privateSymbol] = {};
            __private.element = element;
            __private.name = '';
            __private.icon = '';
            __private.children = [];
            __private.parent = undefined;
            __private.elementLabel = $label[0];
            __private.elementArrow = $arrow[0];
            __private.elementIcon = $icon[0];
            __private.elementName = $name[0];
            __private.elementLabel = $name[0];
            __private.elementChildren = $children[0];

        }

        // prototype
        !function() {
            var prototype = TreeNode.prototype;


            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element },
                    set: function() { throw new Error("'TreeNode.element' cannot be assigned to -- it is read only") }
                },
                name: {
                    get: function() { return getPrivate(this).name },
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        __private.name = newValue;
                        __private.elementName.textContent = newValue;
                    }
                },
                icon: {
                    get: function() { return getPrivate(this).icon },
                    set: function(newValue) {

                        var __private = getPrivate(this);
                        __private.icon = newValue;


                        if (newValue.length <= 1)
                            __private.elementIcon.textContent = newValue;
                        else
                            __private.elementIcon.style.backgroundImage = 'url(' + newValue + ')';

                        //$(__private.elementIcon).css('background-image', 'url(' + newValue + ')');
                    }
                },
                children: {
                    get: function() { return getPrivate(this).children },
                    set: function() { throw new Error("'TreeNode.children' cannot be assigned to -- it is read only") }
                },
                parent: {
                    get: function() { return getPrivate(this).parent },
                    set: function() { throw new Error("'TreeNode.parent' cannot be assigned to -- it is read only") }
                },
                treeView: {
                    get: function() { return getPrivate(this).treeView },
                    set: function(newValue) { throw new Error("'TreeNode.treeView' cannot be assigned to -- it is read only") }
                }
            });


            !function() {
                prototype.add = function() {
                    if (arguments.length == 1 && typeof arguments[0] == "string") return addName.apply(this, arguments);
                    if (arguments.length == 1 && arguments[0] instanceof TreeNode == true) return addNode.apply(this, arguments);
                    if (arguments.length == 1 && typeof arguments[0] == "object") return addNodeOption.apply(this, arguments);

                    throw new Error("arguments do not match with any overloads.")
                }
                /** @param {string} name 
                 * @this Intell.Controls.TreeView.TreeNode */
                function addName(name) {
                    var element = this.treeView != null ? $(this.treeView.elementItemAbstract).clone()[0] : undefined;
                    var node = new TreeNode(element);
                    node.name = name;
                   
                    addNode.call(this, node);

                    return node;
                }

                /** @param {Intell.Controls.TreeView.TreeNodeOption} option
                 * @this Intell.Controls.TreeView.TreeNode */
                function addNodeOption(option) {
                    var element = this.treeView != null ? $(this.treeView.elementItemAbstract).clone()[0] : undefined;
                    var node = new TreeNode(element);
                    if (option.name != null) node.name = option.name;
                    if (option.icon != null) node.icon = option.icon;

                    addNode.call(this, node);

                    return node;
                }
                /** @param {Intell.Controls.TreeView.TreeNode} node 
                 *  @this Intell.Controls.TreeView.TreeNode
                 */
                function addNode(node) {
                    if (node.parent != null) throw new Error("Cannot add or insert the item '" + node.name + "' in more than one place. You must first remove it from its current location or clone it.");

                    var parent__private = getPrivate(this);
                    var child__private = getPrivate(node);

                    // logic
                    parent__private.children.push(node);
                    child__private.parent = this;
                    child__private.treeView = parent__private.treeView;

                    // ui/ux
                    if (parent__private.elementChildren == null) parent__private.elementChildren = $('<div class="Children"></div>').appendTo(parent__private.element)[0];
                    
                    var $element = $(parent__private.element);
                    $(parent__private.elementChildren).append(node.element);


                    recheck_havechildren.apply(this);
                }
            }();
            prototype.remove = function() {
                var __private = getPrivate(this);

                var parent = __private.parent;
                if (parent == null) return;

                parent.removeChildren(this);
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
                child__private.treeView = null;

                // ui/ux
                node.element.remove();

                recheck_havechildren.apply(this);
            }
            prototype.clear = function() {
                var __private = getPrivate(this);
                var children = __private.children;

                for (var i = 0; i < children.length; i++) {
                    var node = children[i];
                    // logic
                    var node__private = getPrivate(node);
                    node__private.parent = null;

                    // ui/ux
                    node.element.remove();
                }
                children.splice(0, children.length);

                recheck_havechildren.apply(this);
            }
            prototype.showExpandButton = function() {
                $(this.element).addClass('HAS-CHILDREN');
            }
            prototype.hideExpandButton = function() {
                $(this.element).removeClass('HAS-CHILDREN');
            }

            /** @this Intell.Controls.TreeView.TreeNode */
            function recheck_havechildren() {
                var $element = $(this.element);
                var $children = $element.find('>.Children');
                $element.toggleClass('HAS-CHILDREN', $children.children().length != 0);
            }

        }();

        //methods

        /** @param {Intell.Controls.TreeView.TreeNode} node @returns {Intell.Controls.TreeView.TreeNodePrivate} */
        function getPrivate(node) { return node[privateSymbol] }

        TreeNode.getPrivate = getPrivate;
        return TreeNode;
    }();



    ns.create = function(element) {
        return new TreeView(element);
    }
    ns.TreeView = TreeView
    ns.TreeNode = TreeNode;



}();
﻿intell.controls.Waiting = new function() {
    /** @type Intell.Controls.Waiting.Namespace  */
    var ns = this;

    /** @type Intell.Controls.Waiting.WaitingConstructor */
    var Waiting = function() {

        var waitingSymbol = Symbol != null ? Symbol("__Waiting__") : "__Waiting__";
        var privateSymbol = Symbol != null ? Symbol("__private") : "__private";

        var waitingHtml =
`<div class="Waiting-Box">
    <div class="cycle"></div>
    <div class="cycle" style="animation-delay:.15s"></div>
    <div class="cycle" style="animation-delay:.3s"></div>
    <div class="cycle" style="animation-delay:.45s"></div>
    <div class="cycle" style="animation-delay:.6s"></div>
</div>`;

        Waiting = function Waiting(element) {
            if (this instanceof Waiting == false) return new Waiting(element);
            if (element == null) element = $(waitingHtml)[0];
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__Waiting__ != undefined) return element.__Waiting__;
            

            /** @type Intell.Controls.Waiting.WaitingPrivate */
            var __private = {
                element: element,
                parent: null,
            };

            this[privateSymbol] = __private;
        }

        !function() {
            var prototype = Waiting.prototype;

            Object.defineProperties(prototype, {
                'element': {
                    get: function() { return getPrivate(this).element; },
                    set: function(newValue) { throw new Error("'Waiting.element' cannot be assigned to -- it is read only") }
                },
                'parent': {
                    get: function() { return getPrivate(this).parent; },
                    set: function(newValue) {
                        var __private = getPrivate(this);
                        if (__private.parent == newValue) return;
                        if (__private.parent != null) {
                            $(__private.parent).removeClass('WAITING');
                            $(__private.element).remove();
                        }

                        __private.parent = newValue;
                    }
                }
            })

            prototype.start = function() {
                if (this.parent == null) throw new Error("Can't start when parent is null");

                $(this.parent).addClass('WAITING').append(this.element);
            }
            prototype.stop = function() {
                $(this.parent).removeClass('WAITING');
                $(this.element).remove();
            }

            /** @param {Intell.Controls.Waiting.Waiting} waiting @returns {Intell.Controls.Waiting.WaitingPrivate} */
            function getPrivate(waiting) {
                return waiting[privateSymbol];
            }

        }();


        return Waiting;
    }();


    ns.Waiting = Waiting;
    ns.startWait = function(element) {
        /** @type Intell.Controls.Waiting.Waiting */
        var waiting = element.__cc__;

        if (waiting == null) waiting = element.__cc__ = new Waiting();
        waiting.parent = element;
        waiting.start();

        return waiting;
    }
    ns.stopWait = function(element) {
        /** @type Intell.Controls.Waiting.Waiting */
        var waiting = element.__cc__;

        if (waiting != null) waiting.stop();
    }
    

}();﻿

intell.controls.ListView = new function() {
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