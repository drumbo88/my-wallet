import * as dotenv from 'dotenv'
dotenv.config() // Copies .env to process.env

export function booleanEnvVar(varName: string, defaultValue: boolean): boolean {
    const val = process.env[varName]
    if (val === undefined) {
      return defaultValue
    } else if (val === 'true') {
      return true
    } else if (val === 'false') {
      return false
    } else {
      throw new Error(
        `Invalid value "${val}" for env var ${varName}. Should be "true" or "false".`
      )
    }
}

export function stringEnvVar(varName: string, defaultValue: string, nullable = true): string {
    const val = process.env[varName]
    if (val == null && !nullable) {
      throw new Error(`Empty value for ${varName} is not allowed`)
    }
    return val || defaultValue
}

export function floatEnvVar(varName: string, defaultValue: number): number {
    const val = process.env[varName]
    if (val === undefined) {
      return defaultValue
    }
    const parsedVal = parseFloat(val)
    if (isNaN(parsedVal)) {
      throw new Error(
        `Invalid value "${val}" for env var ${varName}. Should be a float.`
      )
    }
    return parsedVal
}

export function integerEnvVar(varName: string, defaultValue: number): number {
    const val = process.env[varName]
    if (val === undefined) {
      return defaultValue
    }
    const parsedVal = parseInt(val, 10)
    if (isNaN(parsedVal)) {
      throw new Error(
        `Invalid value "${val}" for env var ${varName}. Should be an integer.`
      )
    }
    return parsedVal
}

export function baseUrlEnvVar(varName: string): string {
    const val = process.env[varName]
    if (val === undefined) {
      throw new Error(`Empty value for ${varName} is not allowed`)
    }
    if (val.slice(0, 8) !== 'https://') {
      throw new Error(`${varName} (${val}) must start with "https://"`)
    }
    if (val.slice(-1) === '/') {
      throw new Error(`${varName} (${val}) must not end with a slash`)
    }
    return val
}

export function arrayEnvVar(varName: string, defaultValue: string[], nullable = true): string[] {
    const val = process.env[varName]
    if (val == null && !nullable) {
      throw new Error(`Empty value for ${varName} is not allowed`)
    }
    return val?.split(',') || defaultValue
}

const {
    NODE_ENV = "develpoment",
    API_PORT = 3001,
    API_PORT_DEV = 3001,
    API_PORT_TEST = 3001,

    DB_NAME = 'myWallets',
    DB_PORT = 3017,
    DB_PORT_DEV = 3017,
    DB_PORT_TEST = 3017,
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

const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
}

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

    myModelOptions
}

