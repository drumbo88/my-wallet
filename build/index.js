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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const root_routes_1 = __importDefault(require("./routes/root.routes"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const currency_routes_1 = __importDefault(require("./routes/currency.routes"));
const country_routes_1 = __importDefault(require("./routes/country.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const config = __importStar(require("./config"));
const database_1 = require("./database");
// ----- Settings -----
const PORT = config.NODE_ENV == "test"
    ? (config.API_PORT_TEST || 5001)
    : (config.API_PORT || 5000);
//const POST_MAX_SIZE = process.env.POST_MAX_SIZE || "30mb"
// ----- Middlewares -----
app.use(body_parser_1.default.json({ limit: config.POST_MAX_SIZE }));
app.use(body_parser_1.default.urlencoded({ limit: config.POST_MAX_SIZE, extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // <- antes de las rutas
// ----- Routes -----
app.use('/api', root_routes_1.default);
app.use('/api/person', person_routes_1.default);
app.use('/api/currency', currency_routes_1.default);
app.use('/api/country', country_routes_1.default);
app.use('/api/transaction', transaction_routes_1.default);
// Error de ruta
app.use('/', (req, res, next) => {
    //const error = new Error('Route not found')
    res.statusCode = 404;
    next();
});
// Errors handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    let message = (res.statusCode >= 500 && res.statusCode < 600)
        ? 'Internal error'
        : 'Error';
    res.json({
        error: {
            message: message + (error.message ? `: ${error.message}` : '')
        }
    });
    //throw error
});
// ----- Static files -----
//app.use(express.static(path.join(__dirname, 'public')))
// ########## Starting the server ##########
const server = (config.NODE_ENV == 'test')
    ? null
    : app.listen(config.API_PORT, () => {
        if (config.DB_CONNECTION_STRING) {
            (0, database_1.connect)()
                .catch(err => console.error(err));
        }
        console.log(`Server online on port ${config.API_PORT}`);
    });
exports.server = server;
