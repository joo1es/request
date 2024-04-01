import { type RequestType } from './index';
import type { RequestConfig } from './types';
interface QRequestConfig {
    router?: {
        currentRoute?: {
            value: {
                meta?: {
                    query?: Record<string, any>;
                };
            };
        };
    };
}
export declare let defaultQConfig: QRequestConfig | (() => QRequestConfig);
/**
 * 快开相关封装
 * const res = qRequest().buttonId('test').exec()
 */
export declare function qRequest(initData?: Record<string, any>): QRequest;
export declare class QRequest {
    config: RequestConfig;
    constructor(initData?: Record<string, any>);
    /** 设置请求方法，如 post, get 等 */
    method(method: string): this;
    params(params: string | Record<string, any>): this;
    baseUrl(baseUrl: string): this;
    headers(headers: HeadersInit): this;
    dir(dir: string): this;
    modelId(modelId: string): this;
    menuId(menuId: string): this;
    buttonId(buttonId: string): this;
    condition(condition: any): this;
    conditions(conditions: any): this;
    datasetId(datasetId: any): this;
    datasetIds(datasetIds: any): this;
    data(data: any): this;
    datas(datas: any): this;
    query<T extends any, U extends RequestType = 'json'>(type?: U): import("./index").RequestResult<T, U>;
    exec<T extends any, U extends RequestType = 'json'>(type?: U): import("./index").RequestResult<T, U>;
    save<T extends any, U extends RequestType = 'json'>(type?: U): import("./index").RequestResult<T, U>;
    request<T extends any, U extends RequestType = 'json'>(url: string, type?: U): import("./index").RequestResult<T, U>;
    setData(key: string, value: any): this;
    assignData(data?: Record<string, any>): this;
}
export declare function defineDefaultQConfig(config: QRequestConfig | (() => QRequestConfig)): void;
export {};
