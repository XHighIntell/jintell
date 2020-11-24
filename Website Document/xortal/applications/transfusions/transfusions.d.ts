declare namespace AP.Transfusions {

    interface Application extends Portal.Application {

        textTransfusion: TextTransfusion;
        filetransfusion: FileTransfusion;
    }
    interface TextTransfusion {

    }
    interface FileTransfusion {

        explorer: Explorer;


        //set(file: __.Api.Xortal.Transfusions.FileDetail[]): void;
    }
    interface Explorer {

        folders: ExplorerFolder;
        files: ExplorerFile;

        getfiles(path: string): void;
    }
    interface ExplorerFolder {
        // property
        /** Gets current path */
        path: string;


    }
    interface ExplorerFile {

        // methods
        add(file: __.Api.Xortal.Transfusions.FileDetail): void;
        getItem(element: HTMLElement): __.Api.Xortal.Transfusions.FileDetail;
        setItem(element: HTMLElement, item: __.Api.Xortal.Transfusions.FileDetail): void;
        clear(): void;

        startWait(): void;
        stopWait(): void;
    }
    interface ExplorerMenu {
        innerMenu: Intell.Controls.Menu.Menu;
    }

}








