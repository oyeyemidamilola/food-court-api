export interface ApplicationConfigurationInterface {
    host: string
    port: number
    db: {
        userName: string
        password: string
    }
}