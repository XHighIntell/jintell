declare namespace Intell {
    interface Controls {
        Menu2: Intell.Controls.Menu2.Namespace;
    }
}




declare namespace Intell.Controls.Menu2 {
    interface Namespace {
        Menu: MenuConstructor;
        MenuItem: MenuItemConstructor;

        setArrowDirection(arrow: HTMLElement, location: number, offset: JQuery.CoordinatesPartial): void;
        setArrowDirectionAuto(arrow: HTMLElement, offset: JQuery.CoordinatesPartial): void;
    }

    interface Menu {

        // property
        element: HTMLElement;
        elementChildren: HTMLElement;
        elementItemAbstract: HTMLElement;
        children: MenuItem[];

        /** Gets or sets a value indicating whether dropdown is displayed (also known as an popup element) when mouse enter. */
        showOnHover: boolean;
        /** Gets or sets locations indicating where root ".Children" is placed when popup. */
        rootLocations: number[];
        rootOption: Intell.IShowAtOption;
        rootDelayHideTime: number;

        popupLocations: number[];
        popupOption: Intell.IShowAtOption;
        popupDelayHideTime: number;

        enableDropdownArrow: boolean;



        // methods
        add(name: string): MenuItem;
        add(menuItem: MenuItem): void;
        add(option: MenuOption): MenuItem;

        /** Removes all menu items from the collection. */
        clear(): void;

        // events
        ondropdownopen: Intell.EventFunction<{ item: MenuItem, event: MouseEvent }>;
        ondropdownclose: Intell.EventFunction<{ item: MenuItem, event: MouseEvent }>;
        onmenuitemclick: Intell.EventFunction<{ item: MenuItem, event: MouseEvent }>;

    }
    interface MenuOption {
        icon: string;
        name: string;
        shortcut: string;

    }
    interface MenuPrivate {
        element: HTMLElement;
        elementChildren: HTMLElement;
        elementItemAbstract: HTMLElement;
        rootMenu: MenuItem;


        showOnHover: boolean;
        rootLocations: number[];
        rootOption: Intell.IShowAtOption;
        rootDelayHideTime: number;
        popupLocations: number[];
        popupOption: Intell.IShowAtOption;
        popupDelayHideTime: number;
        enableDropdownArrow: boolean;


        


        //delayHideClass: string;
        //firstActiveClass: string;
        //activeClass: string;
    }
    interface MenuConstructor {
        (element: HTMLElement): Menu;
        new(element: HTMLElement): Menu;
        prototype: Menu;

        /** Gets private data of Menu. */
        getPrivate(menu: Menu): MenuPrivate;
    }

    interface MenuItem {
        element: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        //elementShortcut: HTMLElement;
        elementChildren: HTMLElement;

        icon: string;
        name: string;
        shortcut: string;
        children: MenuItem[];
        parent: MenuItem;
        menu: Menu;

        /** when set to true, other menuItem.active is set to false, its parent.active = true and parent.childrenVisible = true.
         *  when set to false, its children.active will be set to false. */
        active: boolean;

        /** When set to true, other menuItem.childrenVisible will be set to false.
         *  When set to false, children of children will be hide too. */
        childrenVisible: boolean;
        

        // methods
        add(name: string): MenuItem;
        add(menuItem: MenuItem): void;
        add(option: MenuOption): MenuItem;
        addSeparator(): HTMLElement;

        /** Removes all menu items from the collection. */
        clear(): void;

        /** Removes the current menu item from the menu control. */
        remove(): void;
        removeChildren(node: MenuItem): number;


        // methods ui/ux
        showChildren(): void;
        /** Positions the Menu relative to the specified control location. */
        showChildren(target: HTMLElement): void;
        /** Positions the Menu relative to the specified page coordinates. */
        showChildren(x: number, y: number): void;
        hideChildren(): void;
        hideChildrenImmediately(): void;

    }
    interface MenuItemOption { icon: string; name: string; shortcut: string; }
    interface MenuItemPrivate {
        element: HTMLElement;
        elementLabel: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        //elementShortcut: HTMLElement;
        elementChildren: HTMLElement;


        icon: string;
        name: string;
        shortcut: string;
        children: MenuItem[];
        parent: MenuItem;
        menu: Menu;
        active: boolean;
        childrenVisible: boolean;
        childrenFadingOut: boolean;
    }
    interface MenuItemConstructor {
        (element?: HTMLElement): MenuItem;
        new(element?: HTMLElement): MenuItem;
        prototype: MenuItem;

        /** Gets MenuItem of a element. */
        getMenuItem(element: HTMLElement): MenuItem;

        /** Gets private data of MenuItem. */
        getPrivate(menuItem: MenuItem): MenuItemPrivate;


    }



}

