"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myModelOptions = exports.SESSION_TIME = exports.JWT_KEY = exports.POST_MAX_SIZE = exports.DB_CONNECTION_STRING = exports.DB_RESET = exports.DB_CONNECTION_TIMEOUT = exports.DB_URI_TEST = exports.DB_URI_DEV = exports.DB_URI = exports.DB_DNS_TEST = exports.DB_DNS_DEV = exports.DB_DNS = exports.DB_PORT_TEST = exports.DB_PORT_DEV = exports.DB_PORT = exports.DB_NAME = exports.API_PORT_TEST = exports.API_PORT_DEV = exports.API_PORT = exports.NODE_ENV = exports.arrayEnvVar = exports.baseUrlEnvVar = exports.integerEnvVar = exports.floatEnvVar = exports.stringEnvVar = exports.booleanEnvVar = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Copies .env to process.env
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
const { NODE_ENV = "develpoment", API_PORT = 3001, API_PORT_DEV = 3001, API_PORT_TEST = 3001, DB_NAME = 'myWallets', DB_PORT = 3017, DB_PORT_DEV = 3017, DB_PORT_TEST = 3017, DB_DNS = 'localhost', DB_DNS_DEV = 'localhost', DB_DNS_TEST = 'localhost', DB_URI = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_URI_DEV = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_URI_TEST = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_CONNECTION_TIMEOUT = 1000, DB_RESET = false, POST_MAX_SIZE = '30mb', JWT_KEY = 'rbx19', SESSION_TIME = '1h', } = process.env;
exports.NODE_ENV = NODE_ENV;
exports.API_PORT = API_PORT;
exports.API_PORT_DEV = API_PORT_DEV;
exports.API_PORT_TEST = API_PORT_TEST;
exports.DB_NAME = DB_NAME;
exports.DB_PORT = DB_PORT;
exports.DB_PORT_DEV = DB_PORT_DEV;
exports.DB_PORT_TEST = DB_PORT_TEST;
exports.DB_DNS = DB_DNS;
exports.DB_DNS_DEV = DB_DNS_DEV;
exports.DB_DNS_TEST = DB_DNS_TEST;
exports.DB_URI = DB_URI;
exports.DB_URI_DEV = DB_URI_DEV;
exports.DB_URI_TEST = DB_URI_TEST;
exports.DB_CONNECTION_TIMEOUT = DB_CONNECTION_TIMEOUT;
exports.DB_RESET = DB_RESET;
exports.POST_MAX_SIZE = POST_MAX_SIZE;
exports.JWT_KEY = JWT_KEY;
exports.SESSION_TIME = SESSION_TIME;
let connString;
switch (NODE_ENV) {
    case 'production':
        connString = DB_URI;
        break;
    case 'develpoment':
        connString = DB_URI_DEV;
        break;
    case 'test':
        connString = DB_URI_TEST;
        break;
}
const DB_CONNECTION_STRING = connString;
exports.DB_CONNECTION_STRING = DB_CONNECTION_STRING;
const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
};
exports.myModelOptions = myModelOptions;