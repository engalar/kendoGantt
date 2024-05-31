declare global {
    interface Window {
        mx: mx;
        mendix: MendixGlobalObject;
    }
}

namespace mx {
    namespace data {
        interface GetOptions {
            xpath: string;
            callback: (objs: any[]) => void;
            error: (e: Error) => void;
        }

        function get(options: GetOptions): void;
        function create(options: CreateOptions): void;
        interface CreateOptions {
            entity: string;
            callback: (obj: any) => void;
            error: (e: Error) => void;
        }
        // commit
        interface CommitOptions {
            mxobj?: any;
            mxobjs?: any[];
            callback: () => void;
            error: (e: Error) => void;
        }
        function commit(options: CommitOptions): void;

        // remove
        interface RemoveOptions {
            guids: any;
            callback: () => void;
            error: (e: Error) => void;
        }
        function remove(options: RemoveOptions): void;
    }
}
