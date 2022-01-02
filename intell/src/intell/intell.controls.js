'use strict';

!(function() {
    if (globalThis.intell == undefined) globalThis.intell = {};

    /** @type Intell.Namespace */
    var intell = globalThis.intell;
       
    /** @type Intell.Controls.Namespace */
    var controls = intell.controls = {};

    if (typeof window == 'undefined') return;

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

                var jsEvent = new Event('numericupdownchange', { bubbles: true, cancelable: true });
                Object.defineProperties(jsEvent, {
                    oldValue: { value: oldValue },
                    newValue: { value: newValue }
                });

                var preventedDefault = element.dispatchEvent(jsEvent) == false;
                if (event.defaultPrevented == true) preventedDefault = true;
                
                
                if (preventedDefault == true) value = oldValue;
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

            var $target = $(ev.target);
            var $item = $target.closest('.Options>*', element);

            
            if ($target.closest('.Options', element).length == 0) {
                if ($options.is(':visible') == false) {
                    intell.showAt(element, $options[0], popupLocations, popupOption);
                }
                else {
                    $options.hide();
                }
            } else {

            }

            if ($target.parentsUntil(element, '.Options').length == 0) {


                    
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
        console.warn("TargetPopup is obsolete");

        /** @type Intell.Controls.TargetPopup */
        var _this; _this = element.__TargetPopup__ = this;

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
        _this.setTarget = function(newValue) {
            if (newValue != undefined && newValue instanceof Element == false) throw 'Parameter must be element or null';
            //if (newValue == target) return;
            if (target != undefined && target != newValue) $(target).removeClass(targetActiveClass); // remove active for previous target

            target = newValue;

            if (target == undefined) _this.hide();
            else {
                _this.show(target);
                $(target).addClass(targetActiveClass);
            }

            return previousSolution;
        }
        _this.show = function(arg1, arg2, arg3) {
            //show(element?: HTMLElement): void
            //show(offset: JQuery.CoordinatesPartial): void

            var previous_isVisible = isVisible;

            if (isFadingOut == true) controls.stopHide(element);
            isFadingOut = false;
            isVisible = true;

            previousSolution = intell.showAt(arg1, element, locations, option);
            $element.addClass(activeClass);

            if (previous_isVisible == false) _this.onshow();
        }
        _this.hide = function() {
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
                    _this.onhide();
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

            _this.target = undefined;
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
