import dotenv from 'dotenv'
dotenv.config() // Copies .env to process.env

const {
    NODE_ENV = "develpoment",
    API_PORT = 3001,
    API_PORT_DEV = 3002,
    API_PORT_TEST = 3003,

    DB_NAME = 'myWallets',
    DB_PORT = 7001,
    DB_PORT_DEV = 7001,
    DB_PORT_TEST = 7001,
    DB_DNS = 'localhost',
    DB_DNS_DEV = 'localhost',
    DB_DNS_TEST = 'localhost',
    DB_URI = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '',
    DB_URI_DEV = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '',
    DB_URI_TEST = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '',
    DB_CONNECTION_TIMEOUT = 1000,
    DB_RESET = false,

    POST_MAX_SIZE = '30mb',

    JWT_KEY = 'rbx19',
    SESSION_TIME = '1h',
} = process.env

let connString
switch (NODE_ENV) {
    case 'production':
        connString = DB_URI
        break
    case 'develpoment':
        connString = DB_URI_DEV
        break
    case 'test':
        connString = DB_URI_TEST
        break
}
const DB_CONNECTION_STRING = connString

export {
    NODE_ENV,
    API_PORT,
    API_PORT_DEV,
    API_PORT_TEST,

    DB_NAME,
    DB_PORT,
    DB_PORT_DEV,
    DB_PORT_TEST,
    DB_DNS,
    DB_DNS_DEV,
    DB_DNS_TEST,
    DB_URI,
    DB_URI_DEV,
    DB_URI_TEST,
    DB_CONNECTION_TIMEOUT,
    DB_RESET,
    DB_CONNECTION_STRING,

    POST_MAX_SIZE,

    JWT_KEY,
    SESSION_TIME,
}

