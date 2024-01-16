export * from '@application/common'

export interface ResponseInterface<T>  {
    status: boolean
    data?: T
    error?: {
        message: string
    }
}

export type PaginatedResponseInterface<K extends string, T> = {
    [P in K]: T[]
} & { total: number }
