import type { RequestConfig } from './types'

export let defaultConfig: RequestConfig | (() => RequestConfig)
export let beforeRequest: (config: RequestConfig) => void

export function request<T extends any, U extends 'blob' | 'json' | 'arrayBuffer' = 'json'>(
    input: RequestInfo | URL,
    config?: RequestConfig,
    type?: U
): Promise<U extends 'blob' ? Blob : U extends 'arrayBuffer' ? ArrayBuffer : T> {
    const currentConfig = {
        ...getDefaultConfig(),
        ...config,
    }
    // onBeforeRequest hook is used for like default headers setting.
    if (beforeRequest) beforeRequest(currentConfig)

    const inputResult = getInput(input, currentConfig)

    // body and data trans
    if (!currentConfig.body && currentConfig.data) {
        if (currentConfig.data instanceof FormData || typeof currentConfig.data === 'string') {
            currentConfig.body = currentConfig.data
        } else {
            currentConfig.body = JSON.stringify(currentConfig.data)
        }
    }

    return fetch(inputResult, config)
        .then(res => {
            return type === 'blob' ? res.blob() : type === 'arrayBuffer' ? res.arrayBuffer() : res.json()
        })
        .then(res => {
            if (!(res instanceof Blob || res instanceof ArrayBuffer)) {
                if (!currentConfig.success || currentConfig.success(res)) {
                    return res
                } else {
                    throw new Error(res)
                }
            } else {
                return res
            }
        })
        .catch(err => {
            currentConfig.error?.(err)
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
    if (currentConfig.params && typeof inputResult === 'string') {
        let query = ''
        if (typeof currentConfig.params === 'string') {
            if (currentConfig.params.startsWith('?')) {
                query = currentConfig.params.slice(1)
            } else {
                query = currentConfig.params
            }
        } else {
            query = Object.entries(currentConfig.params).map(([key, param]) => {
                return `${key}=${param}`
            }).join('&')
        }
        if (query) {
            const extraSymbol = inputResult.includes('?') ? '&' : '?'
            inputResult += `${extraSymbol}${query}`
        }
    }
    return inputResult
}

export function defineDefaultConfig(config: RequestConfig | (() => RequestConfig)) {
    defaultConfig = config
}

export function onBeforeRequest(func: (config: RequestConfig) => void) {
    beforeRequest = func
}

export function getDefaultConfig() {
    if (!defaultConfig) {
        return {}
    } else {
        return typeof defaultConfig === 'function' ? defaultConfig() : defaultConfig
    }
}