"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION_STRING = exports.SESSION_TIME = exports.JWT_KEY = exports.POST_MAX_SIZE = exports.DB_RESET = exports.DB_CONNECTION_TIMEOUT = exports.DB_URI_TEST = exports.DB_URI_DEV = exports.DB_URI = exports.DB_DNS_TEST = exports.DB_DNS_DEV = exports.DB_DNS = exports.DB_PORT_TEST = exports.DB_PORT_DEV = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_USER = exports.DB_NAME = exports.API_PORT_TEST = exports.API_PORT_DEV = exports.API_PORT = exports.NODE_ENV = exports.arrayEnvVar = exports.baseUrlEnvVar = exports.integerEnvVar = exports.floatEnvVar = exports.stringEnvVar = exports.booleanEnvVar = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Copies .env to process.env
function booleanEnvVar(varName, defaultValue) {
    const val = process.env[varName];
    if (val === undefined) {
        return defaultValue;
    }
    else if (val === 'true') {
        return true;
    }
    else if (val === 'false') {
        return false;
    }
    else {
        throw new Error(`Invalid value "${val}" for env var ${varName}. Should be "true" or "false".`);
    }
}
exports.booleanEnvVar = booleanEnvVar;
function stringEnvVar(varName, defaultValue, nullable = true) {
    const val = process.env[varName];
    if (val == null && !nullable) {
        throw new Error(`Empty value for ${varName} is not allowed`);
    }
    return val || defaultValue;
}
exports.stringEnvVar = stringEnvVar;
function floatEnvVar(varName, defaultValue) {
    const val = process.env[varName];
    if (val === undefined) {
        return defaultValue;
    }
    const parsedVal = parseFloat(val);
    if (isNaN(parsedVal)) {
        throw new Error(`Invalid value "${val}" for env var ${varName}. Should be a float.`);
    }
    return parsedVal;
}
exports.floatEnvVar = floatEnvVar;
function integerEnvVar(varName, defaultValue) {
    const val = process.env[varName];
    if (val === undefined) {
        return defaultValue;
    }
    const parsedVal = parseInt(val, 10);
    if (isNaN(parsedVal)) {
        throw new Error(`Invalid value "${val}" for env var ${varName}. Should be an integer.`);
    }
    return parsedVal;
}
exports.integerEnvVar = integerEnvVar;
function baseUrlEnvVar(varName) {
    const val = process.env[varName];
    if (val === undefined) {
        throw new Error(`Empty value for ${varName} is not allowed`);
    }
    if (val.slice(0, 8) !== 'https://') {
        throw new Error(`${varName} (${val}) must start with "https://"`);
    }
    if (val.slice(-1) === '/') {
        throw new Error(`${varName} (${val}) must not end with a slash`);
    }
    return val;
}
exports.baseUrlEnvVar = baseUrlEnvVar;
function arrayEnvVar(varName, defaultValue, nullable = true) {
    const val = process.env[varName];
    if (val == null && !nullable) {
        throw new Error(`Empty value for ${varName} is not allowed`);
    }
    return (val === null || val === void 0 ? void 0 : val.split(',')) || defaultValue;
}
exports.arrayEnvVar = arrayEnvVar;
exports.NODE_ENV = stringEnvVar('NODE_ENV', 'develpoment');
exports.API_PORT = integerEnvVar('API_PORT', 3001);
exports.API_PORT_DEV = integerEnvVar('API_PORT_DEV', 3002);
exports.API_PORT_TEST = integerEnvVar('API_PORT_TEST', 3003);
exports.DB_NAME = stringEnvVar('DB_NAME', 'myWallets');
exports.DB_USER = stringEnvVar('DB_USER', 'myWallets');
exports.DB_PASSWORD = stringEnvVar('DB_PASSWORD', 'myWallets');
exports.DB_PORT = integerEnvVar('DB_PORT', 7001);
exports.DB_PORT_DEV = integerEnvVar('DB_PORT_DEV', 7001);
exports.DB_PORT_TEST = integerEnvVar('DB_PORT_TEST', 7001);
exports.DB_DNS = stringEnvVar('DB_DNS', 'localhost');
exports.DB_DNS_DEV = stringEnvVar('DB_DNS_DEV', 'localhost');
exports.DB_DNS_TEST = stringEnvVar('DB_DNS_TEST', 'localhost');
exports.DB_URI = stringEnvVar('DB_URI', (exports.DB_DNS && exports.DB_PORT) ? `mongodb://${exports.DB_DNS}:${exports.DB_PORT}/${exports.DB_NAME}` : '');
exports.DB_URI_DEV = stringEnvVar('DB_URI_DEV', (exports.DB_DNS && exports.DB_PORT) ? `mongodb://${exports.DB_DNS}:${exports.DB_PORT}/${exports.DB_NAME}` : '');
exports.DB_URI_TEST = stringEnvVar('DB_URI_TEST', (exports.DB_DNS && exports.DB_PORT) ? `mongodb://${exports.DB_DNS}:${exports.DB_PORT}/${exports.DB_NAME}` : '');
exports.DB_CONNECTION_TIMEOUT = integerEnvVar('DB_CONNECTION_TIMEOUT', 1000);
exports.DB_RESET = booleanEnvVar('DB_RESET', false);
exports.POST_MAX_SIZE = stringEnvVar('POST_MAX_SIZE', '30mb');
exports.JWT_KEY = stringEnvVar('JWT_KEY', 'rbx19');
exports.SESSION_TIME = stringEnvVar('SESSION_TIME', '1h');
let connString;
switch (exports.NODE_ENV) {
    case 'production':
        connString = exports.DB_URI;
        break;
    case 'develpoment':
        connString = exports.DB_URI_DEV;
        break;
    case 'test':
        connString = exports.DB_URI_TEST;
        break;
    default:
        throw new Error(`Invalid enviroment selected '${exports.NODE_ENV}'`);
}
exports.DB_CONNECTION_STRING = connString;
