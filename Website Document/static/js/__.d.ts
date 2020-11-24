declare namespace __ {
    interface Namespace {
        api: Api.Namespace;
    }
}



declare namespace __.Api {
    interface Namespace {
        xortal: __.Api.Xortal.Namespace;

        createApiPromise(request: Intell.HttpRequest, payload: Array | Object): Promise<any>;
    }

    type ApiPromise<T = SuccessReponse> = Promise2<ApiPromiseReason<T>, ApiPromiseReason<FailResponse>>;

    interface ApiPromiseReason<T> {
        request: Intell.HttpRequest;
        response: T;
    }

    interface SuccessReponse {
        /** The return value indicates whether the request was successed. 
         * If the request was successed, the return value is 0. If the request was not successed, the return value is non-zero. */
        code: number;

        /** The description of request. */
        description: string;
    }
    interface FailResponse extends SuccessReponse {
        error: {}
    }
}


declare namespace __.Api.Xortal {
    interface Namespace {
        transfusions: __.Api.Xortal.Transfusions.Namespace;
    }
}

declare namespace __.Api.Xortal.Transfusions {
    interface Namespace {

        get_text(): ApiPromise<GetTextResponse>;
        set_text(text: string): ApiPromise;

        get_files(path: string): ApiPromise<GetFilesResponse>;
        get_folders(path: string): ApiPromise<GetFoldersResponse>;
        upload_files(path: string, files: File[]): ApiPromise<GetFoldersResponse>;
        download(path: string): void;
        delete(path: string): ApiPromise<DeleteResponse>;

        // not api
        getDownloadURL(path: string): string;
    }

    interface FileDetail {
        path: string;
        name: string;
        date: string;
        size: number;
    }

    interface GetTextResponse extends SuccessReponse {
        text: string;
    }

    interface GetFilesResponse extends SuccessReponse {
        files: FileDetail[];
    }
    interface GetFoldersResponse extends SuccessReponse {
        folders: FileDetail[];
    }
    interface DeleteResponse extends SuccessReponse {
        
    }
}


declare var __: __.Namespace;