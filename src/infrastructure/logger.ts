import * as winston from "winston";


const createConsoleLogger = (): winston.transports.ConsoleTransportInstance => {
    return new winston.transports.Console({
        handleExceptions: true,
        level: "info",
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
            winston.format.printf(
                info =>
                    `[${info.timestamp}]:foodcourt:api:${info.level}:${info.message}`,
            ),
        )
    })
}

export const logger = winston.createLogger({
    transports: createConsoleLogger()
});