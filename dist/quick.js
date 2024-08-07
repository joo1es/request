import { request } from './index';
export let defaultQConfig;
/**
 * 快开相关封装
 * const res = qRequest().buttonId('test').exec()
 */
export function qRequest(initData) {
    return new QRequest(initData);
}
export class QRequest {
    constructor(initData) {
        var _a, _b, _c;
        this.config = {};
        /** 快开默认使用 post 方法 */
        this.config.method = 'post';
        if (defaultQConfig) {
            const config = typeof defaultQConfig === 'function' ? defaultQConfig() : defaultQConfig;
            if ((_c = (_b = (_a = config.router) === null || _a === void 0 ? void 0 : _a.currentRoute) === null || _b === void 0 ? void 0 : _b.value.meta) === null || _c === void 0 ? void 0 : _c.query) {
                this.assignData(config.router.currentRoute.value.meta.query);
            }
        }
        return this.assignData(initData);
    }
    /** 设置请求方法，如 post, get 等 */
    method(method) {
        this.config.method = method;
        return this;
    }
    params(params) {
        this.config.params = params;
        return this;
    }
    baseUrl(baseUrl) {
        this.config.baseUrl = baseUrl;
        return this;
    }
    headers(headers) {
        this.config.headers = headers;
        return this;
    }
    dir(dir) {
        return this.setData('dir', dir);
    }
    modelId(modelId) {
        return this.setData('modelId', modelId);
    }
    menuId(menuId) {
        return this.setData('menuId', menuId);
    }
    buttonId(buttonId) {
        return this.setData('buttonId', buttonId);
    }
    condition(condition) {
        return this.setData('condition', condition);
    }
    conditions(conditions) {
        return this.setData('conditions', conditions);
    }
    datasetId(datasetId) {
        return this.setData('datasetId', datasetId);
    }
    datasetIds(datasetIds) {
        return this.setData('datasetIds', datasetIds);
    }
    data(data) {
        return this.setData('data', data);
    }
    datas(datas) {
        return this.setData('datas', datas);
    }
    query(type) {
        return this.request('/core/busi/query', type);
    }
    exec(type) {
        return this.request('/core/busi/exec', type);
    }
    save(type) {
        return this.request('/core/busi/save', type);
    }
    request(url, type) {
        return request(url, this.config, type);
    }
    setData(key, value) {
        if (!this.config.data)
            this.config.data = {};
        this.config.data[key] = value;
        return this;
    }
    assignData(data) {
        if (!this.config.data)
            this.config.data = {};
        Object.assign(this.config.data, data);
        return this;
    }
}
export function defineDefaultQConfig(config) {
    defaultQConfig = config;
}
