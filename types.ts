export interface RequestConfig extends RequestInit {
    /**
     * url prefix, is only work for string type input
     */
    baseUrl?: string,
    params?: string | Record<string, any>,
    data?: string | Record<string, any>  | FormData,
    /**
     * how to adjust json request is success
     */
    success?: (res: Record<string, any>) => boolean,
    /**
     * how to handle error
     */
    error?: (err: unknown) => void,
}