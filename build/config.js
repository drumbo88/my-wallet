"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_TIME = exports.JWT_KEY = exports.POST_MAX_SIZE = exports.DB_CONNECTION_STRING = exports.DB_RESET = exports.DB_CONNECTION_TIMEOUT = exports.DB_URI_TEST = exports.DB_URI_DEV = exports.DB_URI = exports.DB_DNS_TEST = exports.DB_DNS_DEV = exports.DB_DNS = exports.DB_PORT_TEST = exports.DB_PORT_DEV = exports.DB_PORT = exports.DB_NAME = exports.API_PORT_TEST = exports.API_PORT_DEV = exports.API_PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Copies .env to process.env
const { NODE_ENV = "develpoment", API_PORT = 3001, API_PORT_DEV = 3002, API_PORT_TEST = 3003, DB_NAME = 'myWallets', DB_PORT = 7001, DB_PORT_DEV = 7001, DB_PORT_TEST = 7001, DB_DNS = 'localhost', DB_DNS_DEV = 'localhost', DB_DNS_TEST = 'localhost', DB_URI = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_URI_DEV = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_URI_TEST = (DB_DNS && DB_PORT) ? `mongodb://${DB_DNS}:${DB_PORT}/${DB_NAME}` : '', DB_CONNECTION_TIMEOUT = 1000, DB_RESET = false, POST_MAX_SIZE = '30mb', JWT_KEY = 'rbx19', SESSION_TIME = '1h', } = process.env;
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
