export interface ApplicationConfigurationInterface {
    environment: string
    host: string
    port: number
    db: {
        userName: string
        password: string
    }
}