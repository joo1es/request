import type { RequestConfig } from './types'

export const _config: {
    defaultConfig?: RequestConfig | (() => RequestConfig),
    beforeRequest?: (config: RequestConfig, type: RequestType) => void
} = {}

export interface RequestJsonResponse<T extends any> {
    [x: keyof any]: any,
    code: number,
    data: T,
    datas: T,
    msg: string,
}

export type RequestType = 'blob' | 'json' | 'arrayBuffer' | 'fetch'
export type RequestResult<T extends any, U extends RequestType> = Promise<U extends 'fetch' ? Response : U extends 'blob' ? Blob : U extends 'arrayBuffer' ? ArrayBuffer : RequestJsonResponse<T>>
export function request<T extends any, U extends RequestType = 'json'>(
    input: RequestInfo | URL,
    config?: RequestConfig,
    type?: U
): RequestResult<T, U> {
    const currentConfig = {
        ...getDefaultConfig(),
        ...config,
    }
    // onBeforeRequest hook is used for like default headers setting.
    if (_config.beforeRequest) _config.beforeRequest(currentConfig, type || 'json')

    const inputResult = getInput(input, currentConfig)

    // body and data trans
    if (!currentConfig.body && currentConfig.data) {
        if (currentConfig.data instanceof FormData || typeof currentConfig.data === 'string') {
            currentConfig.body = currentConfig.data
        } else {
            currentConfig.body = JSON.stringify(currentConfig.data)
        }
    }

    return fetch(inputResult, currentConfig)
        .then(res => {
            if (type === 'fetch') return res
            return type === 'blob' ? res.blob() : type === 'arrayBuffer' ? res.arrayBuffer() : res.json()
        })
        .then(res => {
            if (!(res instanceof Blob || res instanceof ArrayBuffer || res instanceof Response)) {
                if (!currentConfig.success || currentConfig.success(res)) {
                    return res
                } else {
                    throw res
                }
            } else {
                return res
            }
        })
        .catch(err => {
            currentConfig.error?.(err)
            throw err
        })
}

/**
 * Handle input url with config
 */
export function getInput(input: RequestInfo | URL, currentConfig: RequestConfig) {
    let inputResult = input
    // Add baseUrl for url
    if (typeof inputResult === 'string') inputResult = `${currentConfig?.baseUrl || ''}${inputResult}`
    if (inputResult instanceof URL) inputResult = inputResult.toString()
    if (currentConfig.params && (typeof inputResult === 'string' || inputResult instanceof URL)) {
        const url = new URL(inputResult, location.href)
        if (typeof currentConfig.params === 'string') {
            let query = ''
            if (currentConfig.params.startsWith('?') || currentConfig.params.startsWith('&')) {
                query = currentConfig.params.slice(1)
            } else {
                query = currentConfig.params
            }
            url.search += (url.search ? '&' : '?') + query
        } else {
            for (const [key, param] of Object.entries(currentConfig.params)) {
                if (typeof param === 'undefined') continue
                url.searchParams.append(key, param)
            }
        }
        inputResult = url.toString()
    }
    return inputResult
}

export function defineDefaultConfig(config: RequestConfig | (() => RequestConfig)) {
    _config.defaultConfig = config
}

export function onBeforeRequest(func: (config: RequestConfig, type: RequestType) => void) {
    _config.beforeRequest = func
}

export function getDefaultConfig() {
    if (!_config.defaultConfig) {
        return {}
    } else {
        return typeof _config.defaultConfig === 'function' ? _config.defaultConfig() : _config.defaultConfig
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
}

export { qRequest, defaultQConfig, defineDefaultQConfig } from './quick'