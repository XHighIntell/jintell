intell.controls.Waiting = new function() {
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
    

}();