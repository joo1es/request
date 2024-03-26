import { request, type RequestType, type RequestResult } from './index'
import type { RequestConfig } from './types'

/**
 * 快开相关封装
 * const res = qRequest().buttonId('test').exec()
 */
export function qRequest(initData?: Record<string, any>) {
    return new QRequest(initData)
}

export class QRequest {
    config: RequestConfig = {}
    constructor(initData?: Record<string, any>) {
        return this.assignData(initData)
    }
    /** 设置请求方法，如 post, get 等 */
    public method(method: string) {
        this.config.method = method
        return this
    }
    public params(params: string | Record<string, any>) {
        this.config.params = params
        return this
    }
    public baseUrl(baseUrl: string) {
        this.config.baseUrl = baseUrl
        return this
    }
    public headers(headers: HeadersInit) {
        this.config.headers = headers
        return this
    }
    public dir(dir: string) {
        return this.setData('dir', dir)
    }
    public modelId(modelId: string) {
        return this.setData('modelId', modelId)
    }
    public menuId(menuId: string) {
        return this.setData('menuId', menuId)
    }
    public buttonId(buttonId: string) {
        return this.setData('buttonId', buttonId)
    }
    public condition(condition: any) {
        return this.setData('condition', condition)
    }
    public conditions(conditions: any) {
        return this.setData('conditions', conditions)
    }
    public datasetId(datasetId: any) {
        return this.setData('datasetId', datasetId)
    }
    public datasetIds(datasetIds: any) {
        return this.setData('datasetIds', datasetIds)
    }
    public data(data: any) {
        return this.setData('data', data)
    }
    public datas(datas: any) {
        return this.setData('datas', datas)
    }
    public query<T extends any, U extends RequestType = 'json'>(type?: U) {
        return this.request<T, U>('/core/busi/query', type)
    }
    public exec<T extends any, U extends RequestType = 'json'>(type?: U) {
        return this.request<T, U>('/core/busi/exec', type)
    }
    public save<T extends any, U extends RequestType = 'json'>(type?: U) {
        return this.request<T, U>('/core/busi/save', type)
    }
    public request<T extends any, U extends RequestType = 'json'>(url: string, type?: U) {
        return request<T, U>(url, this.config, type)
    }
    public setData(key: string, value: any) {
        if (!this.config.data) this.config.data = {};
        (this.config.data as Record<string, any>)[key] = value
        return this
    }
    public assignData(data?: Record<string, any>) {
        if (!this.config.data) this.config.data = {}
        Object.assign(this.config.data, data)
        return this
    }
}