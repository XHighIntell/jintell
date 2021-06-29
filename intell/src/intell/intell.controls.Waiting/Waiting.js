intell.controls.Waiting = new function() {
    /** @type Intell.Controls.Waiting.Namespace  */
    var ns = this;

    /** @type Intell.Controls.Waiting.WaitingConstructor */
    var Waiting = function() {

        // private static
        var waitingSymbol = Symbol != null ? Symbol("__Waiting__") : "__Waiting__";
        var privateSymbol = Symbol != null ? Symbol("__private") : "__private";

        // class
        Waiting = function(element) {
            if (this instanceof Waiting == false) return new Waiting(element);
            if (element == null) element = $(Waiting.elementAbstract).clone()[0];
            if (element instanceof jQuery == true) element = element[0];
            if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
            if (element.__Waiting__ != undefined) return element.__Waiting__;
            

            /** @type Intell.Controls.Waiting.WaitingPrivate */
            var __private = this[privateSymbol] = {
                parent: null,
                element: element,
                enabled: false,
            };

        }

        // prototype
        !function() {
            var prototype = Waiting.prototype;

            Object.defineProperties(prototype, {
                element: {
                    get: function() { return getPrivate(this).element; },
                    set: function(newValue) { throw new Error("'Waiting.element' cannot be assigned to -- it is read only") }
                },
                parent: {
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
                },
                enabled: {
                    get: function() { return getPrivate(this).enabled },
                    set: function(newValue) {
                        var __private = getPrivate(this);

                        if (__private.enabled == newValue) return;

                        if (newValue == true) {
                            if (__private.parent == null) throw new Error("Can't start when parent is null");

                            
                            $(__private.parent).addClass('WAITING').append(__private.element);
                            $(__private.element).show();
                        } else {
                            $(__private.parent).removeClass('WAITING');
                            $(__private.element).remove();
                        }

                        __private.enabled = newValue;

                    }
                },
            })


            /** @param {Intell.Controls.Waiting.Waiting} waiting @returns {Intell.Controls.Waiting.WaitingPrivate} */
            function getPrivate(waiting) {
                return waiting[privateSymbol];
            }

        }();

        // public static
        Waiting.elementAbstract = $(
`<div class="X-Waiting">
    <div class="Cycle"></div>
    <div class="Cycle" style="animation-delay:.15s"></div>
    <div class="Cycle" style="animation-delay:.3s"></div>
    <div class="Cycle" style="animation-delay:.45s"></div>
    <div class="Cycle" style="animation-delay:.6s"></div>
</div>`)[0];

        Waiting.getWaiting = function(element) { return element.__Waiting__ }

        return Waiting;
    }();

    // class
    ns.Waiting = Waiting;

    // static methods
    ns.getWaiting = function(element) { return Waiting.getWaiting(element); }

    !function() {

        ns.startWait = function(parentElement, elementAbstract) {
            if (parentElement instanceof jQuery == true) parentElement = parentElement[0];


            if (parentElement instanceof HTMLElement == true) {
                if (arguments[1] == null)                             return startWaitElement.apply(this, arguments);
                else if (arguments[1] instanceof HTMLElement == true) return startWaitElement.apply(this, arguments);
                else if (arguments instanceof Object) return startWaitOption.apply(this, arguments);
            }

            throw new Error("arguments do not match with any overloads.")
        }

        /**@param {HTMLElement} parentElement
        *  @param {Intell.Controls.Waiting.StartWaitOption} option */
        function startWaitOption(parentElement, option) {
            /** @type Intell.Controls.Waiting.Waiting */
            var waiting = parentElement.__cc__;

            if (waiting == null) {
                if (option.elementAbstract != null)
                    waiting = parentElement.__cc__ = new Waiting($(option.elementAbstract).clone());
                else
                    waiting = parentElement.__cc__ = new Waiting();
            }

            $(waiting.element).addClass(option.class == null ? 'Azure-X' : option.class);


            waiting.parent = parentElement;
            waiting.enabled = true;
            
            return waiting;
        }
        /**@param {HTMLElement} parentElement
         * @param {HTMLElement} elementAbstract */
        function startWaitElement(parentElement, elementAbstract) {
            return startWaitOption(parentElement, { elementAbstract: elementAbstract });
        }


    }();

    //ns.startWait = function(element, elementAbstract) {
    //    if (element instanceof jQuery == true) element = element[0];
    //    if (element instanceof HTMLElement == false) throw new Error("arguments[0] is not HTMLElement.");
    //
    //
    //    /** @type Intell.Controls.Waiting.Waiting */
    //    var waiting = element.__cc__;
    //    
    //    if (waiting == null) {
    //        if (elementAbstract != null) {
    //            waiting = element.__cc__ = new Waiting($(elementAbstract).clone());
    //        } else {
    //            waiting = element.__cc__ = new Waiting();
    //        }
    //
    //    }
    //        
    //
    //    waiting.parent = element;
    //    waiting.enabled = true;
    //
    //    return waiting;
    //}


    ns.stopWait = function(element) {
        /** @type Intell.Controls.Waiting.Waiting */
        var waiting = element.__cc__;

        if (waiting != null) waiting.enabled = false;

        return waiting;
    }


    //intell.controls.Menu2.MenuItem.get

}();