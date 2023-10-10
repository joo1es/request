"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAutoImport = exports.getDefaultConfig = exports.onBeforeRequest = exports.defineDefaultConfig = exports.getInput = exports.request = exports.beforeRequest = exports.defaultConfig = void 0;
function request(input, config, type) {
    const currentConfig = Object.assign(Object.assign({}, getDefaultConfig()), config);
    // onBeforeRequest hook is used for like default headers setting.
    if (exports.beforeRequest)
        (0, exports.beforeRequest)(currentConfig);
    const inputResult = getInput(input, currentConfig);
    // body and data trans
    if (!currentConfig.body && currentConfig.data) {
        if (currentConfig.data instanceof FormData || typeof currentConfig.data === 'string') {
            currentConfig.body = currentConfig.data;
        }
        else {
            currentConfig.body = JSON.stringify(currentConfig.data);
        }
    }
    return fetch(inputResult, config)
        .then(res => {
        return type === 'blob' ? res.blob() : type === 'arrayBuffer' ? res.arrayBuffer() : res.json();
    })
        .then(res => {
        if (!(res instanceof Blob || res instanceof ArrayBuffer)) {
            if (!currentConfig.success || currentConfig.success(res)) {
                return res;
            }
            else {
                throw new Error(res);
            }
        }
        else {
            return res;
        }
    })
        .catch(err => {
        var _a;
        (_a = currentConfig.error) === null || _a === void 0 ? void 0 : _a.call(currentConfig, err);
    });
}
exports.request = request;
/**
 * Handle input url with config
 */
function getInput(input, currentConfig) {
    let inputResult = input;
    // Add baseUrl for url
    if (typeof inputResult === 'string')
        inputResult = `${(currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.baseUrl) || ''}${inputResult}`;
    if (inputResult instanceof URL)
        inputResult = inputResult.toString();
    if (currentConfig.params && typeof inputResult === 'string') {
        let query = '';
        if (typeof currentConfig.params === 'string') {
            if (currentConfig.params.startsWith('?')) {
                query = currentConfig.params.slice(1);
            }
            else {
                query = currentConfig.params;
            }
        }
        else {
            query = Object.entries(currentConfig.params).map(([key, param]) => {
                return `${key}=${param}`;
            }).join('&');
        }
        if (query) {
            const extraSymbol = inputResult.includes('?') ? '&' : '?';
            inputResult += `${extraSymbol}${query}`;
        }
    }
    return inputResult;
}
exports.getInput = getInput;
function defineDefaultConfig(config) {
    exports.defaultConfig = config;
}
exports.defineDefaultConfig = defineDefaultConfig;
function onBeforeRequest(func) {
    exports.beforeRequest = func;
}
exports.onBeforeRequest = onBeforeRequest;
function getDefaultConfig() {
    if (!exports.defaultConfig) {
        return {};
    }
    else {
        return typeof exports.defaultConfig === 'function' ? (0, exports.defaultConfig)() : exports.defaultConfig;
    }
}
exports.getDefaultConfig = getDefaultConfig;
/** RequestResolver for unplugin-auto-import */
exports.RequestAutoImport = {
    '@oasis-end/request': [
        'defaultConfig',
        'beforeRequest',
        'request',
        'defineDefaultConfig',
        'onBeforeRequest',
        'getDefaultConfig'
    ]
};
