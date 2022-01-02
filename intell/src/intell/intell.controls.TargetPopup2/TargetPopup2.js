

intell.controls.TargetPopup2 = new function() {
    /** @type Intell.Controls.TargetPopup2.Namespace */
    var NS; NS = this;

    var TargetPopup = function() {

        /** ==== constants ==== */
        var privateSymbol = Symbol ? Symbol('__private') : '__private';
        var targetActiveClass = 'ACTIVE';
        var activeClass = 'ACTIVE';
        var delayHideClass = 'OUT';

        // ==== constructor ====
        /** @type Intell.Controls.TargetPopup2.TargetPopupConstructor @this Intell.Controls.TargetPopup2.TargetPopup */
        var constructor = function(element) {
            
            if (element instanceof jQuery == true) element = element[0];
            if (this instanceof constructor == false) return new constructor(element);
            if (element.__TargetPopup2__ != null) return element.__TargetPopup2__;
            element.__TargetPopup2__ = this;

            // ==== init ====
            this[privateSymbol] = {};
            this.popupLocations = [1, 3, 9, 7];
            this.popupOption = { insideWindow: true, space: 5, margin: 4 };
            this.popupDelayHideTime = 500;
            this.autoHide = true;
            this.enabledBackdrop = false;

            var $element = $(element);
            var __private = this.getPrivate();
            __private.element = element;
            __private.elementArrow = $element.find('.X-Arrow')[0];
            __private.isVisible = false;
            __private.isFadingOut = false;

            this.onshow = intell.createEventFunction();
            this.onhide = intell.createEventFunction();

            // handle events
            $element.clickoutside(onclickoutside.bind(this));
        }
        var prototype = constructor.prototype;

        
        // ==== properties ====
        /** @type defineProperties<Intell.Controls.TargetPopup2.TargetPopup> */
        var properties = {
            element: {
                get: function() { return this.getPrivate().element },
                set: function(newValue) { throw new Error("'TargetPopup.element' cannot be assigned to -- it is read only") }
            },
            elementArrow: {
                get: function() { return this.getPrivate().elementArrow },
                set: function(newValue) { this.getPrivate().elementArrow = newValue }
            },
            elementBackdrop: {
                get: function() { return this.getPrivate().elementBackdrop },
                set: function() { throw new Error("'TargetPopup.elementBackdrop' cannot be assigned to -- it is read only") }
            },
            targetElement: {
                get: function() { return this.getPrivate().targetElement },
                set: function() { throw new Error("'TargetPopup.targetElement' cannot be assigned to -- it is read only") }
            },
            targetCoordinate: {
                get: function() { return this.getPrivate().targetCoordinate },
                set: function() { throw new Error("'TargetPopup.targetCoordinate' cannot be assigned to -- it is read only") }
            },
            enabledBackdrop: {
                get: function() { return this.getPrivate().enabledBackdrop },
                set: function(newValue) {
                    var __private = this.getPrivate();

                    if (newValue == true) {
                        if (__private.elementBackdrop == null) {
                            var elementBackdrop = __private.elementBackdrop = document.createElement('div');
                            elementBackdrop.className = "Backdrop";
                            elementBackdrop.style.display = 'none';

                            __private.element.insertAdjacentElement('afterend', elementBackdrop);
                        }
                    }

                    __private.enabledBackdrop = newValue;
                }
            }

        }
        Object.defineProperties(prototype, properties);

        // ==== methods ====
        prototype.showAt = function() {
            /** @param {HTMLElement} target @this Intell.Controls.TargetPopup2.TargetPopup */
            function showAtElement(target) {
                var __private = this.getPrivate();
                var element = __private.element;
                var elementArrow = __private.elementArrow;
                var previousTargetElement = __private.targetElement;
                var isVisible = __private.isVisible;
                var isFadingOut = __private.isFadingOut;
                var enabledBackdrop = __private.enabledBackdrop;
                var elementBackdrop = __private.elementBackdrop;

                // logic
                __private.targetElement = target;
                __private.targetCoordinate = null;
                __private.isVisible = true;
                __private.isFadingOut = false;

                // ui
                if (isVisible == false) { this.onshow(); } // 1. Invisible
                // 2. Visible, Fadeout
                else if (isVisible == true && isFadingOut == true) intell.controls.stopHide(element);
                else { } // 4. Visible completely

                if (previousTargetElement != null) previousTargetElement.classList.remove(targetActiveClass);
                if (enabledBackdrop == true) $(elementBackdrop).show();

                var result = intell.showAt(target, element, this.popupLocations, this.popupOption);
                this.element.classList.add(activeClass)
                target.classList.add(targetActiveClass);

                if (elementArrow) setArrowPointToElement(elementArrow, target, result.location);

            }
            /** @param {JQuery.Coordinates} coordinate @this Intell.Controls.TargetPopup2.TargetPopup */
            function showAtCoordinate(coordinate) {
                var __private = this.getPrivate();
                var element = __private.element;
                var elementArrow = __private.elementArrow;
                var previousTargetElement = __private.targetElement;
                var isVisible = __private.isVisible;
                var isFadingOut = __private.isFadingOut;
                var enabledBackdrop = __private.enabledBackdrop;
                var elementBackdrop = __private.elementBackdrop;

                // logic
                __private.targetElement = null;
                __private.targetCoordinate = coordinate;
                __private.isVisible = true;
                __private.isFadingOut = false;

                // ui
                if (isVisible == false) { this.onshow(); } // 1. Invisible
                // 2. Visible, Fadeout
                else if (isVisible == true && isFadingOut == true) intell.controls.stopHide(element);
                else { } // 4. Visible completely

                if (previousTargetElement != null) previousTargetElement.classList.remove(targetActiveClass);
                if (enabledBackdrop == true) $(elementBackdrop).show();

                var result = intell.showAt(coordinate, element, this.popupLocations, this.popupOption);
                this.element.classList.add(activeClass);

                if (elementArrow) setArrowPointToCoordinate(elementArrow, coordinate, result.location);

            }

            /**@param {HTMLElement} elementArrow 
             * @param {HTMLElement} target
             * @param {number} location */
            function setArrowPointToElement(elementArrow, target, location) {
                var coordinate = $(target).centerOffset();

                setArrowPointToCoordinate(elementArrow, coordinate, location);
            }

            /** @param {HTMLElement} elementArrow @param {JQuery.Coordinates} coordinate @param {number} location */
            function setArrowPointToCoordinate(elementArrow, coordinate, location) {
                var $Arrow = $(elementArrow);
                var left = coordinate.left - $Arrow.outerWidth() / 2;
                var top = coordinate.top - $Arrow.outerHeight() / 2;

                $Arrow.removeClass('LEFT UP RIGHT DOWN').css({ left: '', top: '' });
 

                if (location <= 3) $Arrow.offset({ left: left }).addClass('DOWN');
                else if (location <= 6) $Arrow.offset({ top: top }).addClass('LEFT');
                else if (location <= 9) $Arrow.offset({ left: left }).addClass('UP');
                else $Arrow.offset({ top: top }).addClass('RIGHT');
            }

            return function() {
                if (arguments[0] instanceof HTMLElement) showAtElement.apply(this, arguments);
                else showAtCoordinate.apply(this, arguments);

            }
        }();
        prototype.hide = function() {
            var _this = this;
            var __private        = this.getPrivate();
            var element          = __private.element;
            var elementBackdrop  = __private.elementBackdrop;
            var targetElement    = __private.targetElement;
            var isVisible        = __private.isVisible;
            var isFadingOut      = __private.isFadingOut;
            
            if (isVisible == false) return; // 1. Invisible
            else if (isVisible == true && isFadingOut == true) { } // 2. Visible, Fadeout
            else {
                // 4. Visible completely     

                // logic
                __private.isVisible = true;
                __private.isFadingOut = true;
                __private.targetElement = null;
                __private.targetCoordinate = null;

                // ui
                if (targetElement != null) targetElement.classList.remove(targetActiveClass);
                
                element.classList.remove(activeClass);
                intell.controls.startHide(element, this.popupDelayHideTime, delayHideClass, function() {
                    __private.isVisible = false;
                    __private.isFadingOut = false;
                    _this.onhide();

                    if (elementBackdrop != null) intell.controls.hide(elementBackdrop);
                });
            }


            __private.targetElement = null;
            __private.targetCoordinate = null;

            
            

            
        }
        prototype.getPrivate = function() { return this[privateSymbol] }

        // ==== events ====
        


        /**@param {PointerEvent} event @this Intell.Controls.TargetPopup2.TargetPopup */
        function onclickoutside(event) {
            var __private = this.getPrivate();
            
            if (this.autoHide == false) return;
            if (__private.isVisible == false) return;

            var targetElement = __private.targetElement;
            if (targetElement != null && $(event.target).closest(targetElement).length > 0) return;

            this.hide();
        }

        return constructor;
    }();

    NS.TargetPopup = TargetPopup;

    return NS;
}();