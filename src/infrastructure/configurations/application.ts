import 'dotenv/config'
import { ApplicationConfigurationInterface } from "@application/common/interfaces";


const {
    HOST,
    PORT,
    ENVIRONMENT
} = process.env


export const configuration: ApplicationConfigurationInterface  = {
    host: HOST!,
    port: parseInt(PORT!)
}