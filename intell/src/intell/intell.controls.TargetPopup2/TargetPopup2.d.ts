


declare namespace Intell.Controls.TargetPopup2 {
    interface Namespace {
        TargetPopup: TargetPopupConstructor;

    }

    interface TargetPopup {

        // ======= property =======
        /** Gets the top most element of this control */
        element: HTMLElement;

        elementArrow: HTMLElement;

        elementBackdrop: HTMLElement;

        /** Gets the current target element of popup */
        targetElement: HTMLElement;
        
        /** Gets the current target coordinate of popup */
        targetCoordinate: JQuery.Coordinates;

        /** Gets or sets the popup locations */
        popupLocations: number[];
        /** Gets or sets the popup option */
        popupOption: Intell.IShowAtOption;
        popupDelayHideTime: number;
        autoHide: boolean;
        enabledBackdrop: boolean;



        // ====== method =======
        /** When sets target element while shown, control will immediately show popup at this new target element. */
        showAt(target: HTMLElement): void;
        showAt(coordinates: JQuery.Coordinates): void;
        hide(): void;
        getPrivate(): TargetPopupPrivate;

        // events
        onshow: Intell.EventFunction<{ event: MouseEvent }>;
        onhide: Intell.EventFunction<{ event: MouseEvent }>;

    }
    interface TargetPopupPrivate {
        element: HTMLElement;
        elementArrow: HTMLElement;
        elementBackdrop: HTMLElement;

        enabledBackdrop: boolean;

        targetElement: HTMLElement;
        targetCoordinate: JQuery.Coordinates;

        isVisible: boolean;
        isFadingOut: boolean;
    }

    interface TargetPopupConstructor {
        (element: HTMLElement): TargetPopup;
        new(element: HTMLElement): TargetPopup;
        prototype: TargetPopup;
    }
    
}


declare namespace Intell.Controls {
    interface Namespace {
        TargetPopup2: TargetPopup2.Namespace;
    }
}