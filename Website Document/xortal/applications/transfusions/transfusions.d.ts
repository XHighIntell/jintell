declare namespace AP.Transfusions {

    interface Application extends Portal.Application {


        filetransfusion: FileTransfusion;
    }
    interface TextTransfusion {

    }
    interface FileTransfusion {
        set(file: __.Api.Xortal.Transfusions.FileDetail[]): void;
    }
    

}