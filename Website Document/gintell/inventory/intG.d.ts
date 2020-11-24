

interface IntG {
    Stash: IntG.Stash.Namespace;
}

declare var intG: IntG;

declare namespace IntG.Stash {

    interface Stash extends StashOption {

        element: HTMLElement;

        /** Gets the number of slots in horizontal. (Read-only) */
        gridWidth: number;

        /** Gets the number of slots in vertical. (Read-only) */
        gridHeight: number;

        /** */
        slotWidth: number;

        slotHeight: number;

        columnGap: number;

        rowGap: number;

        slots: StashSlots;

        // methods
    }
    interface StashOption extends Pick<Stash, "gridWidth" | "gridHeight" | "slotWidth" | "slotHeight" | "columnGap" | "rowGap"> { }
    interface StashLocation { x: number; y: number; }


    interface StashSlots {

        /** Add an item at free location. */
        add(item: StashItem): StashLocation;

        /** */
        remove(item: StashItem): void;

        /** Gets a item at a specified location.  */
        get(x: number, y: number): StashItem;

        /** (Internal) Sets a item to a specified location.  */
        set(x: number, y: number, item: StashItem): void;

        
        getItem(element: HTMLElement): StashItem;
        setItem(element: HTMLElement, item: StashItem): void;
        findFreeSlot(): StashLocation;

        /** Find location of grid from cursor. */
        findLocationFromCursor(x: number, y: number): StashLocation;

        /** Cancel current dragging action. */
        cancel(): void;
    }
    interface StashItem {
        element: HTMLElement;
        stash: Stash;
        id: string;

        x: number;
        y: number;
        icon: string;
        stack: 0;

        /** */
        remove(): void;
    }

    

    interface Namespace {

        StashItem: {
            new(): StashItem;
        };
        

        create(element: HTMLElement, option: StashOption): Stash;
    }
}



var stash = new intG.Stash(123);