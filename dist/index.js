export const _config = {};
export function request(input, config, type) {
    const currentConfig = Object.assign(Object.assign({}, getDefaultConfig()), config);
    // onBeforeRequest hook is used for like default headers setting.
    if (_config.beforeRequest)
        _config.beforeRequest(currentConfig, type || 'json');
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
    return fetch(inputResult, currentConfig)
        .then(res => {
        if (type === 'fetch')
            return res;
        return type === 'blob' ? res.blob() : type === 'arrayBuffer' ? res.arrayBuffer() : res.json();
    })
        .then(res => {
        if (!(res instanceof Blob || res instanceof ArrayBuffer || res instanceof Response)) {
            if (!currentConfig.success || currentConfig.success(res)) {
                return res;
            }
            else {
                throw res;
            }
        }
        else {
            return res;
        }
    })
        .catch(err => {
        var _a;
        (_a = currentConfig.error) === null || _a === void 0 ? void 0 : _a.call(currentConfig, err);
        throw err;
    });
}
/**
 * Handle input url with config
 */
export function getInput(input, currentConfig) {
    let inputResult = input;
    // Add baseUrl for url
    if (typeof inputResult === 'string')
        inputResult = `${(currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.baseUrl) || ''}${inputResult}`;
    if (inputResult instanceof URL)
        inputResult = inputResult.toString();
    if (currentConfig.params && (typeof inputResult === 'string' || inputResult instanceof URL)) {
        const url = new URL(inputResult, location.href);
        if (typeof currentConfig.params === 'string') {
            let query = '';
            if (currentConfig.params.startsWith('?') || currentConfig.params.startsWith('&')) {
                query = currentConfig.params.slice(1);
            }
            else {
                query = currentConfig.params;
            }
            url.search += (url.search ? '&' : '?') + query;
        }
        else {
            for (const [key, param] of Object.entries(currentConfig.params)) {
                url.searchParams.append(key, param);
            }
        }
        inputResult = url.toString();
    }
    return inputResult;
}
export function defineDefaultConfig(config) {
    _config.defaultConfig = config;
}
export function onBeforeRequest(func) {
    _config.beforeRequest = func;
}
export function getDefaultConfig() {
    if (!_config.defaultConfig) {
        return {};
    }
    else {
        return typeof _config.defaultConfig === 'function' ? _config.defaultConfig() : _config.defaultConfig;
    }
}
/** RequestResolver for unplugin-auto-import */
export const requestAutoImport = {
    '@oasis-end/request': [
        'defaultConfig',
        'beforeRequest',
        'request',
        'qRequest',
        'defineDefaultConfig',
        'onBeforeRequest',
        'getDefaultConfig'
    ]
};
export { qRequest, defaultQConfig, defineDefaultQConfig } from './quick';
