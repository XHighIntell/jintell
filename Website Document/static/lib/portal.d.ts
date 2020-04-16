interface Promise2<T, E> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = E>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: E) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise2<TResult1, TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = E>(onrejected?: ((reason: E) => TResult | PromiseLike<TResult>) | undefined | null): Promise2<T, TResult>;
}


declare namespace Portal {
    
    

    interface Application {
        manifest: ApplicationManifest;

        /** The root element of application. */
        root: HTMLElement;

        /** Gets the sidebar element. */
        shortcut: HTMLElement;

        /** The status of this application. "NONE" = 0, "LOADING" = 1, "LOADED" = 2, "FAIL" = 3 */
        status: "NONE" | "LOADING" | "LOADED" | "FAIL";

        error: Error;

        load(): Promise<any>;

        /** Occur when the portal opens this application. */
        onopen: Intell.EventFunction;
    }
    interface ApplicationManifest {

        /** An unique identifier of application. */
        id: string;

        /** The application name. */
        name: string;

        /** A plain text string (no HTML or other formatting) that describes the application while loading. */
        description: string;

        /** A short description of the application */
        title: string;

        /** Url to icon/image of the application. */
        icon: string;

        /** Pin this application to menu. The default is true. */
        shortcut: boolean;

        /** The shortcut group */
        group: string;

        /** Load the application immediately after add. The default is false. */
        startup: boolean;


        content: ApplicationManifestContent;
        
    }
    interface ApplicationManifestContent {
        /** The HTML file to be injected into page. */
        html: string;

        /** The list of JavaScript files to be injected into portal. */
        js: string[];

        /** (Unsupport) The list of CSS files to be injected into portal. */
        css: string[];
    }


    interface Sidebar {
        /** A collection of keyname of localStorage that allow sidebar to access. */
        keys: { collapsed: "portal.sidebar.collapsed" };


        /** Add a shortcut to sidebar from application. This function doesn't check application already exist or not.*/
        add(application: Application): HTMLElement;

        /** Gets element from application */
        get(application: Application): HTMLElement

        /** Add "ACTIVE" classname to shortcut element of an application and remove "ACTIVE" class from others. */
        active(application: Application): HTMLElement

        /** Gets application out of element. */
        getApplication(element: HTMLElement): Application;

        /** Sets an application to element. */
        setApplication(element: HTMLElement, application: Application): void;

        enableCollapseStorage(key: string): void;
        
    }
    interface Overlay {
        showLoading(application: Application): void;
        showError(application: Application): void;
        /** hide all overlay */
        hide(): void;
    }

    interface PortalChangeEvent {
        oldApplication: Application;
        newApplication: Application;
    }
}



interface Portal {

    sidebar: Portal.Sidebar;
    overlay: Portal.Overlay;

    // --property-- //
    /** Gets array of application that added to portal. */
    applications: Portal.Application[];
    activeApplication: Portal.Application;


    // methods
    /** Add an application to portal. */
    add(application: Portal.Application): void;
    /** Add a manifest to portal. */
    addManifest(manifest: Portal.ApplicationManifest, callback: ((application: Portal.Application) => void));
    /** Open the first application that have manifest.startup equal true.  */
    open(): void;
    /** Open an application that added before. */
    open(application: Portal.Application): void;
    /** Open an application specified by its id. If there are no match id open default applcation. */
    open(applicationId: string): void;


    contains(application: Portal.Application): boolean;


    /** (private) Load all resources of an application. */
    load(application: Portal.Application): Promise2<any, Error>;
    /** (private) Load a single javascript. Javascript will be ignored if url that have loaded before. */
    loadJavascript(url: string): Promise2<any, Error>;
    /** (private) Load a single style sheet. Style sheet will be ignored if url that have loaded before. */
    loadStyle(url: string): Promise2<any, Error>;

    // events
    /** Occurs when the activeApplication property value changes. */
    onchange: Intell.EventFunction<Portal.PortalChangeEvent>;

}



declare var Portal: {
    new(element: HTMLElement): Portal;
    (element: HTMLElement): Portal;
}
declare var PortalApplication: {
    new(): Portal.Application;
    (): Portal.Application;
}







