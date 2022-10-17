import dotenv from 'dotenv'
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

export const NODE_ENV = stringEnvVar('NODE_ENV', 'develpoment')
export const API_PORT = integerEnvVar('API_PORT', 3001)
export const API_PORT_DEV = integerEnvVar('API_PORT_DEV', 3002)
export const API_PORT_TEST = integerEnvVar('API_PORT_TEST', 3003)
export const DB_NAME = stringEnvVar('DB_NAME', 'myWallets')
export const DB_USER = stringEnvVar('DB_USER', 'myWallets')
export const DB_PASSWORD = stringEnvVar('DB_PASSWORD', 'myWallets')
export const DB_PORT = integerEnvVar('DB_PORT', 7001)
export const DB_PORT_DEV = integerEnvVar('DB_PORT_DEV', 7001)
export const DB_PORT_TEST = integerEnvVar('DB_PORT_TEST', 7001)
export const DB_DNS = stringEnvVar('DB_DNS', 'localhost')
export const DB_DNS_DEV = stringEnvVar('DB_DNS_DEV', 'localhost')
export const DB_DNS_TEST = stringEnvVar('DB_DNS_TEST', 'localhost')
export const DB_URI = stringEnvVar('DB_URI', (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '')
export const DB_URI_DEV = stringEnvVar('DB_URI_DEV', (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '')
export const DB_URI_TEST = stringEnvVar('DB_URI_TEST', (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '')
export const DB_CONNECTION_TIMEOUT = integerEnvVar('DB_CONNECTION_TIMEOUT', 1000)
export const DB_RESET = booleanEnvVar('DB_RESET', false)
export const POST_MAX_SIZE = stringEnvVar('POST_MAX_SIZE', '30mb')

export const JWT_KEY = stringEnvVar('JWT_KEY', 'rbx19')
export const SESSION_TIME = stringEnvVar('SESSION_TIME', '1h')

let connString: string
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
    default:
        throw new Error(`Invalid enviroment selected '${NODE_ENV}'`)
}
export const DB_CONNECTION_STRING = connString
