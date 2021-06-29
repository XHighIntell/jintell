declare namespace Intell {
    interface Controls {
        ComboBox2: Intell.Controls.ComboBox2.Namespace;
    }
}

declare namespace Intell.Controls.ComboBox2 {
    
    interface Namespace {
        ComboBox: ComboBoxConstructor;
        ComboBoxItem: ComboBoxItemConstructor;
    }

    interface ComboBoxConstructor {
        new(element: HTMLElement): ComboBox;
        (element: HTMLElement): ComboBox;
        prototype: ComboBox;
    }
    interface ComboBoxItemConstructor {
        new(element: HTMLElement): ComboBoxItem;
        (element: HTMLElement): ComboBoxItem;
        prototype: ComboBoxItem;

        /** Gets ComboBoxItem of a element. */
        getItem(element: HTMLElement): ComboBoxItem;
    }
    interface ComboBoxGroupConstructor {
        new(element: HTMLElement): ComboBoxGroup;
        (element: HTMLElement): ComboBoxGroup;
        prototype: ComboBoxGroup;

        /** Gets ComboBoxGroup of a element. */
        getItem(element: HTMLElement): ComboBoxGroup;
    }

    interface ComboBox {

        // property
        /** Gets  */
        element: HTMLElement;
        /** Gets */
        elementChildren: HTMLElement;
        /** Gets */
        elementItemAbstract: HTMLElement;
        /** Gets  */
        childrenVisible: boolean;

        /** Gets or sets */
        popupLocations: number[];

        /** Gets or sets */
        popupOption: Intell.IShowAtOption;

        /** Read-only */
        items: ComboBoxItem[];
        /** Gets or sets */
        selectedItem: ComboBoxItem;


        // methods
        getPrivate(): ComboBoxPrivate;
        add(name: string): ComboBoxItem;
        add(item: ComboBoxItem): void;
        add(option: ComboBoxItemOption): ComboBoxItem;
        remove(item: ComboBoxItem): void;
        clear(): void;

        // navigation methods
        toggleChildren(): void;
        showChildren(): void;
        hideChildren(): void;


        // events
        onchange: Intell.EventFunction<{ item: ComboBoxItem }>;

    }
    interface ComboBoxPrivate {
        element: HTMLElement;
        elementSelect: HTMLElement;
        elementChildren: HTMLElement;
        elementItemAbstract: HTMLElement;
        childrenVisible: boolean;

        popupLocations: number[];
        popupOption: Intell.IShowAtOption;

        items: ComboBoxItem[];
        groups: ComboBoxGroup[];
        selectedItem: ComboBoxItem;


    }
    interface ComboBoxItemOption {
        icon: string;
        name: string;
        value: any;
        group: string;
        disabled: boolean;
    }


    interface ComboBoxItem {
        /** Read-only */
        element: HTMLElement;
        /** Read-only */
        elementIcon: HTMLElement;
        /** Read-only */
        elementName: HTMLElement;
        /** Read-only */
        parent: ComboBox;

        icon: string;
        name: string;
        value: any;
        group: string;
        disabled: boolean;

        // methods
        getPrivate(): ComboBoxItemPrivate;
    }
    interface ComboBoxItemPrivate {
        element: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        parent: ComboBox;
        parentGroup: ComboBoxGroup;

        icon: string;
        name: string;
        value: any;
        group: string;
        disabled: boolean;
    }

    interface ComboBoxGroup {        
        element: HTMLElement;
        elementName: HTMLElement;
        elementChildren: HTMLElement;

        name: string;
        items: ComboBoxItem[];

        // methods
        add(item: ComboBoxItem): void;
        remove(item: ComboBoxItem): void;

        getPrivate(): ComboBoxGroupPrivate;
    }
    interface ComboBoxGroupPrivate {
        element: HTMLElement;
        elementName: HTMLElement;
        elementChildren: HTMLElement;

        name: string;
        items: ComboBoxItem[];
    }


    
}







type NotFunctionKeys<T> = {
    [k in keyof T]: T[k] extends Function ? never : k
}[keyof T];


type defineProperties2<T> = {
    [K in keyof T]: {
        get: (this: T) => any;
        set: (this: T, newValue: T[K]) => void;
    }
}


type defineProperties<T> = {
    [K in NotFunctionKeys<T>]: {
        get: (this: T) => any;
        set: (this: T, newValue: T[K]) => void;
    }
}
