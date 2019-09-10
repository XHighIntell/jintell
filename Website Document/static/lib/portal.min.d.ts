interface Portal { 
    

    /** Gets current opening application. */
    activeApplication: PortalApplication;

    /** Gets array of application */
    applications: PortalApplication[];


    /** Add an application to portal page. */
    addApplication(application: PortalApplication);

    /** Open an application. */
    openApplication(application: PortalApplication);

    onAppAdd: Intell.EventFunction<PortalApplication>;

    onAppLoad: Intell.EventFunction<PortalApplication>;
}
interface PortalApplication {
    mainfest: PortalApplicationMainfest;

    root: HTMLElement;

    /** Gets the sidebar element. */
    shortcut: HTMLElement;

    /** property returns the numerical status code of this application. "NONE" = 0, "LOADING" = 1, "LOADED" = 2, "FAIL" = 3 */
    status: number;

    /** property returns the name of status code. */
    statusName: string;

    load(): Promise<PortalApplication>;


    onShow: Intell.EventFunction;
    onHide: Intell.EventFunction;
}
interface PortalApplicationMainfest {
    name: string;

    /** A short description of the application */
    title: string;

    /** Url to icon/image of the application. */
    icon: string;

    /** Pin this application to menu. The default is true. @ */
    pinned: boolean;

    /** Load the application immediately after add. The default is false. */
    startup: boolean;

    html: string;

    js: string[];

    css: string[];
}

//function getPortal(): Portal;

declare var Portal: {
    new(): Portal;
}
declare var PortalApplication: {
    new(): PortalApplication;
}