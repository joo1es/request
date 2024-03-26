"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRequest = exports.qRequest = void 0;
const index_1 = require("./index");
/**
 * 快开相关封装
 * const res = qRequest().buttonId('test').exec()
 */
function qRequest(initData) {
    return new QRequest(initData);
}
exports.qRequest = qRequest;
class QRequest {
    constructor(initData) {
        this.config = {};
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
        return (0, index_1.request)(url, this.config, type);
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
exports.QRequest = QRequest;
