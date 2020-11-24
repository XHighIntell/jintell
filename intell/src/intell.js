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
}