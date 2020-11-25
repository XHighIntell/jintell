﻿declare namespace Intell {
    interface Controls {
        Waiting: Intell.Controls.Waiting.Namespace;
    }
}

declare namespace Intell.Controls.Waiting {

    interface Waiting {

        /** Gets the element of this waiting control. */
        element: HTMLElement;

        /** Gets or sets parent. */
        parent: HTMLElement;

        /** Gets or sets. If false stop, remove WAITING class from parent and remove this control element from its parent. */
        enabled: boolean;
    }
    interface WaitingPrivate {
        element: HTMLElement;
        parent: HTMLElement;
        enabled: boolean;
    }

    interface Namespace {
        Waiting: WaitingConstructor;


        getWaiting(element: HTMLElement): Waiting;

        /** A shortcut way to create or reuse Waiting control that stores inside the specified element. */
        startWait(parent: HTMLElement, elementAbstract?: HTMLElement): Waiting;

        /** A shortcut way to call stop wait of the specified element. The function won't throw exception. */
        stopWait(parent: HTMLElement): Waiting;

        
    }


    interface WaitingConstructor {
        (): Waiting;
        (element: HTMLElement): Waiting;
        new(): Waiting;
        new(element: HTMLElement): Waiting;
        prototype: Waiting;

        /** Gets or sets the element that will be used to clone. */
        elementAbstract: HTMLElement;

        getWaiting(element: HTMLElement): Waiting;
    }


}
