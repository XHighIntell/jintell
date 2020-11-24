declare namespace Intell {
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


        start(): void;

        /** Stop, remove WAITING class from parent and remove this control. */
        stop(): void;
    }
    interface WaitingPrivate {
        element: HTMLElement;
        parent: HTMLElement;
    }

    interface Namespace {
        Waiting: WaitingConstructor;

        /** Initializes a new instance of Waiting class specified by element. */
        create(element: HTMLElement): Waiting;

        /** */
        startWait(element: HTMLElement): Waiting;

        stopWait(element: HTMLElement): Waiting;

        
    }


    interface WaitingConstructor {
        (): Waiting;
        (element: HTMLElement): Waiting;
        new(): Waiting;
        new(element: HTMLElement): Waiting;
        prototype: Waiting;
    }


}
