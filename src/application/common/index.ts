export * from '@application/common'

export class ResponseInterface<T>  {
    status: boolean
    data?: T
    error?: {
        message: string
    }
}