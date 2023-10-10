import type { RequestConfig } from './types';
export declare let defaultConfig: RequestConfig | (() => RequestConfig);
export declare let beforeRequest: (config: RequestConfig) => void;
export interface RequestJsonResponse<T extends any> {
    [x: keyof any]: any;
    data: T;
}
export declare function request<T extends RequestJsonResponse<any>, U extends 'blob' | 'json' | 'arrayBuffer' = 'json'>(input: RequestInfo | URL, config?: RequestConfig, type?: U): Promise<U extends 'blob' ? Blob : U extends 'arrayBuffer' ? ArrayBuffer : T>;
export declare namespace request {
    export var get: (input: RequestInfo | URL, config?: RequestConfig | undefined, type?: "blob" | "json" | "arrayBuffer" | undefined) => Promise<RequestJsonResponse<any>>;
    export var post: (input: RequestInfo | URL, config?: RequestConfig | undefined, type?: "blob" | "json" | "arrayBuffer" | undefined) => Promise<RequestJsonResponse<any>>;
    export var put: (input: RequestInfo | URL, config?: RequestConfig | undefined, type?: "blob" | "json" | "arrayBuffer" | undefined) => Promise<RequestJsonResponse<any>>;
    var _a: (input: RequestInfo | URL, config?: RequestConfig | undefined, type?: "blob" | "json" | "arrayBuffer" | undefined) => Promise<RequestJsonResponse<any>>;
    export var patch: (input: RequestInfo | URL, config?: RequestConfig | undefined, type?: "blob" | "json" | "arrayBuffer" | undefined) => Promise<RequestJsonResponse<any>>;
    export { _a as delete };
}
/**
 * Handle input url with config
 */
export declare function getInput(input: RequestInfo | URL, currentConfig: RequestConfig): RequestInfo;
export declare function defineDefaultConfig(config: RequestConfig | (() => RequestConfig)): void;
export declare function onBeforeRequest(func: (config: RequestConfig) => void): void;
export declare function getDefaultConfig(): RequestConfig;
/** RequestResolver for unplugin-auto-import */
export declare const RequestAutoImport: {
    '@oasis-end/request': string[];
};
