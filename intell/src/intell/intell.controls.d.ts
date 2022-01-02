
declare namespace Intell.Controls {
    
    // #regionNumericUpDown Controls
    interface NumericUpDownOption {
        value: number;
        min: number;
        max: number;
        increment: number;
        unit: string;
        decimalPlaces: number;
        separate: number;
        nullable: boolean;
    }
    interface NumericUpDown {
        /** */
        value: number;
        min: number;
        max: number;
        /** Gets or sets the value to increment or decrement the spin box (also known as an up-down control) when the up or down buttons are clicked. */
        increment: number;
        unit: string;
        decimalPlaces: number;
        separate: string;

        /** Allow empty string.  */
        nullable: boolean;

        // methods
        /** Sets the value for the control, this function have built-in filters. Return true if bypass all filters. */
        setValueInternal(value: any): boolean;
        setTextInternal(value: number): void;
        increaseSessionBy(number: number): void;

        /** Triggered event. */
        onchange(ev: NumericUpDownOnchangeEvent): void;
        /** Triggered when the value of the spinner has changed and the input is no longer focused. */
        onchange(handler: (this: NumericUpDown, ev: NumericUpDownOnchangeEvent) => void): NumericUpDown;

    }
    interface NumericUpDownOnchangeEvent { oldValue: number, newValue: number }

    interface NumericUpDownConstructor {
        (element: HTMLElement, option?: Intell.Controls.NumericUpDownOption): Intell.Controls.NumericUpDown;
        new(element: HTMLElement, option?: Intell.Controls.NumericUpDownOption): Intell.Controls.NumericUpDown;
        prototype: Intell.Controls.NumericUpDown;
    }
    // #endregion

    // #regionSlideshow
    interface Slideshow {
        /**Gets or sets index of slider.*/
        index: number;
        /**Gets or sets the interval, expressed in milliseconds, at which to raise next function.*/
        interval: number;
        /**Gets numbers of slider.*/
        count: number;
        /**Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide the current slider.*/
        delayHideTime: number;
        /**Gets or sets the class name that set while waiting before hide.*/
        delayHideClass: string;
        /**Gets or sets the active class name that set to active slider.*/
        activeClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in.*/
        inClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in by a next function.*/
        nextInClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in by a previous fucntion.*/
        prevInClass: string;


        /**Go to the next element of the slideshow.*/
        next(): void;
        /**Go to the previous element of the slideshow.*/
        prev(): void;
        /**Go to the previous element of the slideshow.
         * @param newIndex The new index
         * @param action The action name ("next" or "prev")
         */
        setIndex(newIndex: number, action?: 'next' | 'prev'): void;
        /**Starts the timer that raising the next function automatically repeat.*/
        start(): void;
        /**Stops the timer that raising the next function.*/
        stop(): void;

        /**Trigger event.*/
        onchange(ev: Event): this;
        /**Occurs when the slider of control has changed.*/
        onchange(handler: (this: Slideshow, ev: Event) => void): Slideshow;
    }
    interface SlideshowOption {
        /**Gets or sets index of slider.*/
        index: number;
        /**Gets or sets the interval, expressed in milliseconds, at which to raise next function.*/
        interval: number;
        /**Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide the current slider.*/
        delayHideTime: number;
        /**Gets or sets the class name that set while waiting before hide.*/
        delayHideClass: string;
        /**Gets or sets the active class name that set to active slider.*/
        activeClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in.*/
        inClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in by a next function.*/
        nextInClass: string;
        /**Gets or sets the effect class name that set to slider that is fading in by a previous fucntion.*/
        prevInClass: string;
    }
    interface SlideshowConstructor {
        (element: HTMLElement, option?: Intell.Controls.SlideshowOption): Intell.Controls.Slideshow;
        new(element: HTMLElement, option?: Intell.Controls.SlideshowOption): Intell.Controls.Slideshow;
        prototype: Intell.Controls.Slideshow;
    }
    // #endregion


    //#regionTagsInput Controls
    interface TagsInput {
        /**Gets or sets the value of tag.
         * Remark: When gets value, control find elements with class name 'tag' and return new array every time the method call. Repeating getter waste cpu and resource.*/
        value: string[];

        /**Gets or sets the confirm keys that will add new tag when press.
         * The default value is [9, 13]*/
        confirmKeys: number[];

        /**Inserts a tag specified by text into the postion before input.
         * @param tag Tag to be added.
         * @returns True if insert completely.*/
        insertBeforeInput(tag: string): boolean;
        
        // events
        /** Triggered when the value of tag input has changed. */
        onchange(handler: ((this: TagsInput) => void)): TagsInput;
        onchange(): void;
    }

    interface TagsInputConstructor {
        (element: HTMLElement, option?: Intell.Controls.TagsInput): Intell.Controls.TagsInput;
        new (element: HTMLElement, option ?: Intell.Controls.TagsInput): Intell.Controls.TagsInput;
        prototype: Intell.Controls.TagsInput;
    }

    //#endregion
    
    //#regionTargetPopup Controls
    interface TargetPopup {

        element: HTMLElement;

        /**Gets or sets the current target of popup.
         * Remark: When sets target, control will immediately show popup at this new target.*/
        target: Element;

        /**Gets or sets a value indicating whether the popup hide on click outside the popup or target element.*/
        autoHide: boolean;

        /**Gets or sets locations indicating where popup is displayed at.*/
        locations: number[];

        /**Gets or sets the extra option for position of popup.*/
        option: Intell.IShowAtOption;

        previousSolution: Intell.IShowAtResult;

        /**Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide the popup element.*/
        delayHideTime: number;

        /**Gets or sets the class name that set while waiting before hide.*/
        delayHideClass: string;

        /**Gets or sets the active class name that set to popup while displaying.*/
        activeClass: string;

        /**Gets or sets the active class name that set to target while displaying.*/
        targetActiveClass: string;

        setTarget(target: HTMLElement): Intell.IShowAtResult;

   
        // events
        /**Occurs when popup element has changed from hide to show.*/
        onshow(handler: (this: TargetPopup) => void): TargetPopup;
        onshow(): void;

        /**Occurs when popup element has changed from hide to show.*/
        onhide(handler: (this: TargetPopup) => void): TargetPopup;
        onhide(): void;
    }
    interface TargetPopupConstructor {
        (element: HTMLElement, option?: Intell.Controls.TargetPopup): Intell.Controls.TargetPopup;
        new(element: HTMLElement, option?: Intell.Controls.TargetPopup): Intell.Controls.TargetPopup;
        prototype: Intell.Controls.TargetPopup;
    }
    //#endregion


    interface ComboBox {

        /** The root element. */
        element: HTMLElement;

        /** Gets the options element. */
        optionsElement: HTMLElement;

        /** Gets or sets selected index. */
        selectedIndex: number;

        /** Gets the selected element. */
        selectedElement: HTMLElement;

        /** Gets or sets locations indicating where popup dropdown is displayed at. */
        popupLocations: number[];

        /** Gets or sets the extra option for position of dropdown.  */
        popupOption: Intell.IShowAtOption;

        // events
        onlabel(handler: (this: ComboBox, e: Intell.Event) => void): ComboBox;
        onchange(handler: (this: ComboBox) => void): ComboBox;

    }
    interface ComboBoxConstructor {
        (element: HTMLElement, option?: Intell.Controls.ComboBox): Intell.Controls.ComboBox;
        new(element: HTMLElement, option?: Intell.Controls.ComboBox): Intell.Controls.ComboBox;
    }
}


declare namespace Intell {
    interface Controls {
        hide(element: HTMLElement): void;

        startHide(element: HTMLElement, timeout: number, delayHideClass: string, oncomplete: () => void): number;
        stopHide(element: HTMLElement): void;

        NumericUpDown: Intell.Controls.NumericUpDownConstructor;
        Slideshow: Intell.Controls.SlideshowConstructor;
        TagsInput: Intell.Controls.TagsInputConstructor;
        TargetPopup: Intell.Controls.TargetPopupConstructor;
        ComboBox: Intell.Controls.ComboBoxConstructor;
    }

}

declare namespace Intell.Controls {
    interface Namespace {
        hide(element: HTMLElement): void;

        startHide(element: HTMLElement, timeout: number, delayHideClass: string, oncomplete: () => void): number;
        stopHide(element: HTMLElement): void;

        NumericUpDown: Intell.Controls.NumericUpDownConstructor;
        Slideshow: Intell.Controls.SlideshowConstructor;
        TagsInput: Intell.Controls.TagsInputConstructor;
        TargetPopup: Intell.Controls.TargetPopupConstructor;
        ComboBox: Intell.Controls.ComboBoxConstructor;
    }
}






