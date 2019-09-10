﻿declare namespace Intell {
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