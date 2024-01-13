import { configDotenv } from "dotenv";
import { ApplicationConfigurationInterface } from "@application/common/interfaces";

configDotenv()

const {
    HOST,
    PORT,
    ENVIRONMENT,

    POSTGRES_USERNAME,
    POSTGRES_PASSWORD
} = process.env


export const configuration: ApplicationConfigurationInterface  = {
    host: HOST!,
    port: parseInt(PORT!),
    db: {
        userName: POSTGRES_USERNAME!,
        password: POSTGRES_PASSWORD!
    }
}