
interface IntG {
    Stash: IntG.Stash.Namespace;
}

declare var intG: IntG;

declare namespace IntG.Stash2 {

    interface Stash extends StashOption {

        element: HTMLElement;

        array: StashItem[][];
        /** Gets the number of slots in horizontal. (Read-only) */
        gridWidth: number;
        /** Gets the number of slots in vertical. (Read-only) */
        gridHeight: number;
        /** Gets or sets the width of a slot.  */
        slotWidth: number;
        /** Gets or sets the height of a slot. */
        slotHeight: number;
        //columnGap: number;
        //rowGap: number;


        // methods
        /** Gets an item at a specified location.  */
        get(x: number, y: number): StashItem;
        /** Sets a item to a specified location.  */
        set(x: number, y: number, item: StashItem): void;
        /** Add item at free location. */
        add(item: StashItem): StashLocation;
        /** Remove item from stash and set its x, y to null and stash to null. */
        remove(item: StashItem): void;

        // utility methods
        /** Find an empty slot, return null if not available. */
        findFreeSlot(): StashLocation;
        /** Gets location of grid from cursor. */
        cursorToLocation(pointX: number, pointY: number): StashLocation;
    }
    interface StashOption extends Pick<Stash, "gridWidth" | "gridHeight" | "slotWidth" | "slotHeight" | "columnGap" | "rowGap"> { }
    interface StashLocation { x: number; y: number; }

    interface StashItem {
        element: HTMLElement;
        stash: Stash;
        id: string;

        x: number;
        y: number;
        icon: string;
        stack: 0;

        /** Removes it from stash. */
        remove(): void;
    }


    type PickFunction = (item: StashItem) => void;
    type DropFunction = (item: StashItem, location: StashLocation) => void;
    type SwapFunction = (item1: StashItem, item2: StashItem) => void;


    interface Namespace {

        StashItem: {
            new(): StashItem;
        };
        
        create(element: HTMLElement, option: StashOption): Stash;

        /** Cancel current dragging action. */
        cancel(): void;
    }
}

