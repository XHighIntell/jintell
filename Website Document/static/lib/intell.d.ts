declare namespace Intell {
    interface Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;

        left: number;
        top: number;
        right: number;
        bottom: number;

        /**
         * Determines if this rectangle intersects with rect.
         * @param rect The rectangle to test.
         */
        intersectsWith(rect: Rectangle): boolean;
        
        /**
         * Determines if the rectangular region represented by rect is entirely contained within this Rectangle structure.
         * @param rect The Rectangle to test.
         */
        contains(rect: Rectangle): boolean;
    }
    interface RectangleConstructor {
        new(x?: number, y?: number, width?: number, height?: number): Rectangle;
        readonly prototype: Rectangle;
    }

    interface Event {
        /**Returns a boolean indicating whether or not Event.preventDefault() was called on the event.*/
        defaultPrevented: boolean;

        /**Set defaultPrevented to true.*/
        preventDefault(): void;

        /**A reference to the object that dispatched the event. It may be different from control when the event is come from another element a part of control.*/
        target: HTMLElement;
    }
    interface EventConstructor {
        new(): Event;
        (): Event;
        readonly prototype: Event;
    }

    type OnFunction          = <K extends keyof WindowEventMap, T>(this: T, type: K, handler: (this: T,      ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => T;
    type OnFunctionT<Target> = <K extends keyof WindowEventMap, T>(this: T, type: K, handler: (this: Target, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => T;


    interface EventFunction<E = undefined> {
        /**Fire events.*/
        <T, E>(this: T, arg: E): T;

        /**Adds event listener.*/
        <T>(this: T, handler: (this: T, ev: E) => void): T;
    }
    interface EventFunctionT<E> {
        /**Fire events.*/
        <T>(this: T, arg: E): T;

        /**Adds event listener.
        * @param handler asd*/
        <T>(this: T, handler: (this: T, ev: E) => any): T;
    }



    interface HttpRequest extends XMLHttpRequest {
        on<K extends keyof XMLHttpRequestEventMap>(type: K, handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;

        loadstart(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["loadstart"]) => any, options?: boolean | AddEventListenerOptions): this;
        readystatechange(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["readystatechange"]) => any, options?: boolean | AddEventListenerOptions): this;
        progress(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["progress"]) => any, options?: boolean | AddEventListenerOptions): this;
        load(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["load"]) => any, options?: boolean | AddEventListenerOptions): this;
        loadend(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["loadend"]) => any, options?: boolean | AddEventListenerOptions): this;
        error(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["error"]) => any, options?: boolean | AddEventListenerOptions): this;

        upload: HttpRequestUpload;
    }
    interface HttpRequestUpload extends XMLHttpRequestUpload {
        on<K extends keyof XMLHttpRequestEventMap>(type: K, handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
        loadstart(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["loadstart"]) => any, options?: boolean | AddEventListenerOptions): this;
        readystatechange(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["readystatechange"]) => any, options?: boolean | AddEventListenerOptions): this;
        progress(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["progress"]) => any, options?: boolean | AddEventListenerOptions): this;
        load(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["load"]) => any, options?: boolean | AddEventListenerOptions): this;
        loadend(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["loadend"]) => any, options?: boolean | AddEventListenerOptions): this;
        error(handler: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap["error"]) => any, options?: boolean | AddEventListenerOptions): this;
    }

    

    interface IGetRectWhenShowAtOption {
        /** The rectangle popup must be placed inside specified rectangle. */
        insideRect?: Rectangle;

        /** The minimum distance between popup and insideRect. */
        margin?: number;

        /** The minimum distance between popup and target. */
        space?: number;
    }
    interface IGetRectWhenShowAtResult {
        /** The location type 1 to 12.. */
        location: number;

        /** The position Rectangle. */
        position: Rectangle;

        /** The solution reaches all conditions. */
        perfect: boolean;

        /** Whether the position doesn't overlay target. */
        canSeeTarget: boolean;
    }
    interface IShowAtOption extends IGetRectWhenShowAtOption {
        /**Must place inside window.*/
        insideWindow: boolean;

        /**Must place inside its offset parent.*/
        insideOffsetParent: boolean;
    }
    interface IShowAtResult extends IGetRectWhenShowAtResult {
        /**List of result.*/
        results: IGetRectWhenShowAtResult[];
    }
}

interface intell {
    Rectangle: Intell.RectangleConstructor;
    Event: Intell.EventConstructor;

    createOnFunction<T>(): Intell.OnFunction;
    createOnFunction<T>(target: T): Intell.OnFunctionT<T>;

    

    /**Create a function that use to add or fire events. 
     * @param onlyFire1time If true EventListener only fire one time.*/
    createEventFunction(onlyFire1time?: boolean): Intell.EventFunction; //Intell.EventFunctionGeneral;

    /**Create XMLHttpRequest with GET method and specified url.
     * @param url A string containing the URL to which the request is sent.*/
    get(url: string): Intell.HttpRequest;

    /**Create XMLHttpRequest with POST method and specified url.
     * @param url A string containing the URL to which the request is sent.*/
    post(url: string): Intell.HttpRequest;

    /** Gets rectangle of destination when show at a rectangle with specified option. */
    getRectWhenShowAt(targetRect: Intell.Rectangle, elementRect: Intell.Rectangle, position: number, option?: Intell.IGetRectWhenShowAtOption): Intell.IGetRectWhenShowAtResult;
    /** Gets rectangle of destination when show at a point with specified option. */
    getRectWhenShowAt(targetPoint: JQuery.Coordinates, elementRect: Intell.Rectangle, position: number, option?: Intell.IGetRectWhenShowAtOption): Intell.IGetRectWhenShowAtResult;


    /**
     * Find
     *      1   2   3
     *  12 ┌──────────┐ 4
     *  11 │targetRect│ 5
     *  10 └──────────┘ 6
     *      9   8   7
     * @param targetRect 
     * @param elementRect
     * @param locations - Array of location.
     * @param option . */
    findPlaceToShow(targetRect: Intell.Rectangle, elementRect: Intell.Rectangle, locations: number[], option?: Intell.IGetRectWhenShowAtOption): Intell.IShowAtResult;
    findPlaceToShow(targetPoint: JQuery.Coordinates, elementRect: Intell.Rectangle, locations: number[], option?: Intell.IGetRectWhenShowAtOption): Intell.IShowAtResult;

    /**Show an element near another element.
     * @param target - The target element.
     * @param popup - The popup element that will fly around target element.
     * @param locations - The location list popup may show.
     * @param option - The extra conditions for finding position.*/
    showAt(target: HTMLElement, popup: HTMLElement, locations: number[], option?: Intell.IShowAtOption): Intell.IShowAtResult;
    showAt(target: JQuery.Coordinates, popup: HTMLElement, locations: number[], option?: Intell.IShowAtOption): Intell.IShowAtResult;

    /**Get the current inner coordinates (without border) of the first element in the set of matched elements, relative to the document.
     * @param element The specified element.*/
    innerOffset(element: HTMLElement): void;

    /** Create a query object from a string.
     * @param search location.search.substr(1) */
    qs(search?: string): object;
}
interface intell2 extends intell { }
 
declare var $$: intell;
declare var intell: intell;


interface FormatNumberOption {
    /** Separate character between thousand. Default is ','. */
    separate?: string;
    /** Decimal point character. Default is '.'. */
    decimal_point?: string;
    /** Number of digits after the decimal point. */
    decimals?: number;
}
interface Number {
    /**Format number into string; 1,000,000.12; */
    formatNumber(option?: FormatNumberOption): string;
    
}
interface String {
    /** 
     * @param startWith
     * @param endWith
     * @param include
     */
    between(startWith: string, endWith: string, include: boolean): string;
}


interface JQuery {
    /**Get the current inner coordinates (without border) of the first element in the set of matched elements, relative to the document.*/
    innerOffset(): JQuery.Coordinates;

    /**Get the center coordinates of the first element in the set of matched elements, relative to the document.*/
    centerOffset(): JQuery.Coordinates;

    clickoutside(hander: (this: HTMLElement) => any): this;
}

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
}



type controls = {
    Menu: Intell.Controls.MenuConstructor;
    NumericUpDown: Intell.Controls.NumericUpDownConstructor;
    Slideshow: Intell.Controls.SlideshowConstructor;
    TagsInput: Intell.Controls.TagsInputConstructor;
    TargetPopup: Intell.Controls.TargetPopupConstructor;
}

interface intell {
    controls: controls;
}





