
declare namespace Intell.Controls {
    // #regionMenu Controls
    type IMenuItem = { icon?: string; name: string; shortcut?: string, items?: IMenuItem[] };

    interface Menu extends MenuOption {
        /**Replaces the children items with specified list of items.
         * @param items Array of menu items.*/
        setItems(items: IMenuItem[]): void;
        /**Show menu's dropdown.*/
        show(target?: HTMLElement): void;
        show(offset: JQuery.Coordinates): void;
        /**Hide menu's dropdown.*/
        hide(): void;

        SetArrowDirection(arrow: HTMLElement, location: number, offset: JQuery.CoordinatesPartial): void;
        SetArrowDirection(arrow: HTMLElement, location: number, target: HTMLElement): void;

        /**Gets a value indicating whether this menu are shown. This property is read-only.*/
        isVisible: boolean;
        /**Gets a value indicating whether this menu are fading out. This property is read-only.*/
        isFadingOut: boolean;

        /**Trigger event.*/
        ondropdownopen(ev: Intell.IShowAtResult): this;
        /**Occurs when dropdown is opened.*/
        ondropdownopen(handler: (this: Menu, ev: Intell.IShowAtResult) => void): this;

        /**Trigger event.*/
        ondropdownclose(ev: Intell.IShowAtResult): this;
        /**Occurs when dropdown is closed.*/
        ondropdownclose(handler: (this: Menu) => void): this;

        /**Trigger event.*/
        onmenuitemclick(): this;
        /**Occurs when dropdown is opened.*/
        onmenuitemclick(handler: (this: Menu, ev: Intell.Event) => void): this;
    }
    interface MenuOption {
        /**Gets or sets a value indicating whether dropdown is displayed(also known as an popup element) when mouse enter.*/
        showOnHover: boolean;
        /**Gets or sets locations indicating where root dropdown is displayed at.*/
        rootLocations: number[];
        /**Gets or sets the extra option for position of root menu's dropdown.*/
        rootOption: Intell.IShowAtOption;
        /**Gets or sets locations indicating where child's dropdown is displayed at.*/
        popupLocations: number[];
        /**Gets or sets the extra option for position of child's dropdown.*/
        popupOption: Intell.IShowAtOption;
        /**Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide '.X-Menu-Items'.*/
        delayHideTime: number;
        /**Gets or sets the class name that set while waiting before hide.*/
        delayHideClass: string;
        /**Gets or sets the interval, expressed in milliseconds. The time, in milliseconds, waiting before hide '.X-Menu-Items'.*/
        rootDelayHideTime: number;
        /**Gets or sets the class name that set when a X-Menu is opened first.*/
        firstActiveClass: string;
        /**Gets or set a value indicating whether the menu turn on the feature automatically modify position of Arrow when open. */
        enableDropdownArrow: boolean;
    }
    interface MenuConstructor {
        (element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.Menu;
        new(element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.Menu;
        prototype: Intell.Controls.Menu;
        SetArrowDirection(arrow: HTMLElement, location: number, offset: JQuery.CoordinatesPartial): void;
    }
    // #endregion

    

    interface ContextMenu {

        show(element: HTMLElement): void;
        show(position: JQuery.CoordinatesPartial): void;

    }
    interface ContextMenuConstructor {
        (element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.ContextMenu;
        new(element: HTMLElement, option?: Intell.Controls.MenuOption): Intell.Controls.ContextMenu;
        prototype: ContextMenu;
    }

    // #regionNumericUpDown Controls
    interface NumericUpDownOption {
        value: number;
        min: number;
        max: number;
        increment: number;
        unit: string;
        decimalPlaces: number;
        separate: number;
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
        separate: number;

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

        element: HTMLElement;

        selectedIndex: number;

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



type controls = {
    Menu: Intell.Controls.MenuConstructor;
    NumericUpDown: Intell.Controls.NumericUpDownConstructor;
    Slideshow: Intell.Controls.SlideshowConstructor;
    TagsInput: Intell.Controls.TagsInputConstructor;
    TargetPopup: Intell.Controls.TargetPopupConstructor;
    ComboBox: Intell.Controls.ComboBoxConstructor;
}

interface intell {
    controls: controls;
}





