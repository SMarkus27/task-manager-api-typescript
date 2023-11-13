import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};


const colors = {
    error: "red",
    warn: "orange",
    info: "white",
    debug: "green"
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `{"time: ${info.timestamp}, "level": ${info.level}, "message": ${info.message}}`
    )
);

const transports = [
    new winston.transports.Console()
];

export const Logger = winston.createLogger({
    level: "info",
    levels,
    format,
    transports
});