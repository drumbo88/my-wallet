"use strict";
exports.__esModule = true;
exports.SESSION_TIME = exports.JWT_KEY = exports.POST_MAX_SIZE = exports.DB_CONNECTION_STRING = exports.DB_RESET = exports.DB_CONNECTION_TIMEOUT = exports.DB_URI_TEST = exports.DB_URI_DEV = exports.DB_URI = exports.DB_DNS_TEST = exports.DB_DNS_DEV = exports.DB_DNS = exports.DB_PORT_TEST = exports.DB_PORT_DEV = exports.DB_PORT = exports.DB_NAME = exports.API_PORT_TEST = exports.API_PORT_DEV = exports.API_PORT = exports.NODE_ENV = exports.arrayEnvVar = exports.baseUrlEnvVar = exports.integerEnvVar = exports.floatEnvVar = exports.stringEnvVar = exports.booleanEnvVar = void 0;
var dotenv = require("dotenv");
dotenv.config(); // Copies .env to process.env
function booleanEnvVar(varName, defaultValue) {
    var val = process.env[varName];
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
        throw new Error("Invalid value \"".concat(val, "\" for env var ").concat(varName, ". Should be \"true\" or \"false\"."));
    }
}
exports.booleanEnvVar = booleanEnvVar;
function stringEnvVar(varName, defaultValue, nullable) {
    if (nullable === void 0) { nullable = true; }
    var val = process.env[varName];
    if (val == null && !nullable) {
        throw new Error("Empty value for ".concat(varName, " is not allowed"));
    }
    return val || defaultValue;
}
exports.stringEnvVar = stringEnvVar;
function floatEnvVar(varName, defaultValue) {
    var val = process.env[varName];
    if (val === undefined) {
        return defaultValue;
    }
    var parsedVal = parseFloat(val);
    if (isNaN(parsedVal)) {
        throw new Error("Invalid value \"".concat(val, "\" for env var ").concat(varName, ". Should be a float."));
    }
    return parsedVal;
}
exports.floatEnvVar = floatEnvVar;
function integerEnvVar(varName, defaultValue) {
    var val = process.env[varName];
    if (val === undefined) {
        return defaultValue;
    }
    var parsedVal = parseInt(val, 10);
    if (isNaN(parsedVal)) {
        throw new Error("Invalid value \"".concat(val, "\" for env var ").concat(varName, ". Should be an integer."));
    }
    return parsedVal;
}
exports.integerEnvVar = integerEnvVar;
function baseUrlEnvVar(varName) {
    var val = process.env[varName];
    if (val === undefined) {
        throw new Error("Empty value for ".concat(varName, " is not allowed"));
    }
    if (val.slice(0, 8) !== 'https://') {
        throw new Error("".concat(varName, " (").concat(val, ") must start with \"https://\""));
    }
    if (val.slice(-1) === '/') {
        throw new Error("".concat(varName, " (").concat(val, ") must not end with a slash"));
    }
    return val;
}
exports.baseUrlEnvVar = baseUrlEnvVar;
function arrayEnvVar(varName, defaultValue, nullable) {
    if (nullable === void 0) { nullable = true; }
    var val = process.env[varName];
    if (val == null && !nullable) {
        throw new Error("Empty value for ".concat(varName, " is not allowed"));
    }
    return (val === null || val === void 0 ? void 0 : val.split(',')) || defaultValue;
}
exports.arrayEnvVar = arrayEnvVar;
var _a = process.env, _b = _a.NODE_ENV, NODE_ENV = _b === void 0 ? "develpoment" : _b, _c = _a.API_PORT, API_PORT = _c === void 0 ? 3080 : _c, _d = _a.API_PORT_DEV, API_PORT_DEV = _d === void 0 ? 3080 : _d, _e = _a.API_PORT_TEST, API_PORT_TEST = _e === void 0 ? 3080 : _e, _f = _a.DB_NAME, DB_NAME = _f === void 0 ? 'myWallets' : _f, _g = _a.DB_PORT, DB_PORT = _g === void 0 ? 27017 : _g, _h = _a.DB_PORT_DEV, DB_PORT_DEV = _h === void 0 ? 27017 : _h, _j = _a.DB_PORT_TEST, DB_PORT_TEST = _j === void 0 ? 27017 : _j, _k = _a.DB_DNS, DB_DNS = _k === void 0 ? 'localhost' : _k, _l = _a.DB_DNS_DEV, DB_DNS_DEV = _l === void 0 ? 'localhost' : _l, _m = _a.DB_DNS_TEST, DB_DNS_TEST = _m === void 0 ? 'localhost' : _m, _o = _a.DB_URI, DB_URI = _o === void 0 ? (DB_DNS && DB_PORT) ? "mongodb://".concat(DB_DNS, ":").concat(DB_PORT, "/").concat(DB_NAME) : '' : _o, _p = _a.DB_URI_DEV, DB_URI_DEV = _p === void 0 ? (DB_DNS && DB_PORT) ? "mongodb://".concat(DB_DNS, ":").concat(DB_PORT, "/").concat(DB_NAME) : '' : _p, _q = _a.DB_URI_TEST, DB_URI_TEST = _q === void 0 ? (DB_DNS && DB_PORT) ? "mongodb://".concat(DB_DNS, ":").concat(DB_PORT, "/").concat(DB_NAME) : '' : _q, _r = _a.DB_CONNECTION_TIMEOUT, DB_CONNECTION_TIMEOUT = _r === void 0 ? 1000 : _r, _s = _a.DB_RESET, DB_RESET = _s === void 0 ? false : _s, _t = _a.POST_MAX_SIZE, POST_MAX_SIZE = _t === void 0 ? '30mb' : _t, _u = _a.JWT_KEY, JWT_KEY = _u === void 0 ? 'rbx19' : _u, _v = _a.SESSION_TIME, SESSION_TIME = _v === void 0 ? '1h' : _v;
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
var connString;
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
var DB_CONNECTION_STRING = connString;
exports.DB_CONNECTION_STRING = DB_CONNECTION_STRING;
