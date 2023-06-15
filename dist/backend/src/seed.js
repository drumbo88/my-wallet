"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_js_1 = require("./database.js");
const config_js_1 = require("./config.js");
const models_1 = __importDefault(require("./models"));
const seedModels = [
    'Currency', 'Country',
    'Entity',
    //'Company', 'Person',
    //'Asset', 'OperationConcept',
    'PaymentCard',
    'Operation',
    'Transaction',
];
(0, database_js_1.dbInit)()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    //const db = mongoose.connection.db
    if (config_js_1.DB_RESET) {
        yield (0, database_js_1.dbReset)();
    }
    for (const modelName of seedModels) {
        if (models_1.default[modelName]) {
            const { model, seeds } = models_1.default[modelName];
            yield (0, database_js_1.dbSeed)(model, seeds);
        }
        else {
            console.log(`❌ Model ${modelName} has to be imported in 'models/index.ts'.`);
        }
    }
    mongoose_1.default.connections[0].close()
        .catch(err => console.error(err))
        .finally(() => console.log("\x1b[32mSeeding completed!\x1b[0m"));
}))
    .catch(err => console.error(err));
