export interface RequestConfig extends RequestInit {
    baseUrl?: string,
    params?: string | Record<string, any>,
    data?: string | Record<string, any>  | FormData,
    success?: (res: Record<string, any>) => boolean,
    error?: (err: unknown) => void,
}