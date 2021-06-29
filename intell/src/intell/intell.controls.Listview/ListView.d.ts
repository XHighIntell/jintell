declare namespace Intell {
    interface Controls {
        ListView: Intell.Controls.ListView.Namespace;
    }
}

declare namespace Intell.Controls.ListView {
    
    interface Namespace {
        ListView: ListViewConstructor;
        ListViewItem: ListViewItemConstructor;

        create(element: HTMLElement): ListView;
    }

    interface ListView {
        /** Gets element of list view. */
        element: HTMLElement;

        /** Gets element of that contain elements. */
        elementItems: HTMLElement;

        /** Gets or sets a value indicating whether multiple items can be selected. */
        multiSelect: boolean;
        /** Gets a collection containing all items in the control.  */
        items: [];

        /** Gets the items that are selected in the control. */
        selectedItems: ListViewItem[];

        /** Adds an existing ListViewItem to the collection */
        add(item: ListViewItem): void;
        add(name: string): ListViewItem;
        add(option: ListViewItemOption): ListViewItemOption;

        /** Removes all item from the collection. */
        clear(): void;
        removeChild(item: ListViewItem): void;



        onitemclick: Intell.EventFunctionT<{ item: ListViewItem, event: MouseEvent }>;
        onitemmousedown: Intell.EventFunctionT<{ item: ListViewItem, event: MouseEvent }>;
        onitemmouseup: Intell.EventFunctionT<{ item: ListViewItem, event: MouseEvent }>;
        onitemdblclick: Intell.EventFunctionT<{ item: ListViewItem, event: MouseEvent }>;
        //onitemclick
    }
    interface ListViewPrivate {
        element: HTMLElement;
        elementItems: HTMLElement;
        elementItemAbstract: HTMLElement;
        multiSelect: boolean;
        items: [];
    }
    interface ListViewConstructor {
        (): ListView;
        (element: HTMLElement): ListView;
        new(): ListView;
        new(element: HTMLElement): ListView;
        prototype: ListView;

        /** Gets private data of ListViewPrivate. */
        getPrivate(item: ListView): ListViewPrivate;
    }


    interface ListViewItem {
        // property
        element: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        icon: string;
        name: string;
        /** Gets or sets a value indicating whether the item is selected. */
        selected: boolean;
        listView: ListView;

        // methods
        /** Removes the item from its associated ListView control. */
        remove(): void;
        refreshName(maxlines: number): void;
    }
    interface ListViewItemPrivate {
        element: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        icon: string;
        name: string;
        /** Gets or sets a value indicating whether the item is selected. */
        selected: boolean;
        listView: ListView;
    }
    interface ListViewItemOption {
        name: string;
        icon: string;
    }
    interface ListViewItemConstructor {
        (element?: HTMLElement): ListViewItem;
        new(element?: HTMLElement): ListViewItem;
        prototype: ListViewItem;

        /** Gets private data of ListViewItem. */
        getPrivate(item: ListViewItem): ListViewItemPrivate;

        /** Gets ListViewItem from element. */
        getListViewItem(element: HTMLElement): ListViewItem;
    }


    interface Measurer {
        font: string;
        measureText(text: string): TextMetrics;

        getNumberOfCharacter(text: string, box_width: number): number;
    }
}
