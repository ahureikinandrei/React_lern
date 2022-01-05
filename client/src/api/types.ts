interface IDataResponse {
    token?: string
}

export interface IAxiosDataResponse {
    data: IDataResponse | null
    message: string
    error?: string
}
