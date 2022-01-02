
declare namespace Intell.Controls.Menu {
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
        (element: HTMLElement, option?: MenuOption): Menu;
        new(element: HTMLElement, option?: MenuOption): Menu;
        prototype: Menu;
        SetArrowDirection(arrow: HTMLElement, location: number, offset: JQuery.CoordinatesPartial): void;
        SetArrowDirectionAuto(arrow: HTMLElement, offset: JQuery.CoordinatesPartial): void;
    }

}

declare namespace Intell.Controls {
    interface Namespace {
        Menu: Intell.Controls.Menu.MenuConstructor;
    }
}