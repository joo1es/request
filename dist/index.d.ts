import type { RequestConfig } from './types';
export declare let defaultConfig: RequestConfig | (() => RequestConfig);
export declare let beforeRequest: (config: RequestConfig, type: 'blob' | 'json' | 'arrayBuffer') => void;
export interface RequestJsonResponse<T extends any> {
    [x: keyof any]: any;
    code: number;
    data: T;
    datas: T;
    msg: string;
}
export declare function request<T extends any, U extends 'blob' | 'json' | 'arrayBuffer' = 'json'>(input: RequestInfo | URL, config?: RequestConfig, type?: U): Promise<U extends 'blob' ? Blob : U extends 'arrayBuffer' ? ArrayBuffer : RequestJsonResponse<T>>;
/**
 * Handle input url with config
 */
export declare function getInput(input: RequestInfo | URL, currentConfig: RequestConfig): RequestInfo;
export declare function defineDefaultConfig(config: RequestConfig | (() => RequestConfig)): void;
export declare function onBeforeRequest(func: (config: RequestConfig, type: 'blob' | 'json' | 'arrayBuffer') => void): void;
export declare function getDefaultConfig(): RequestConfig;
/** RequestResolver for unplugin-auto-import */
export declare const requestAutoImport: {
    '@oasis-end/request': string[];
};
