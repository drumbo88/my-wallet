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
exports.dbInit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
mongoose_1.default.seed = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const seeds = this.seeds();
        if ((seeds === null || seeds === void 0 ? void 0 : seeds.length) && !(yield this.estimatedDocumentCount())) {
            console.log(`Seeding ${seeds.length} of ${this.modelName}...`);
            if (this.seeder) {
                for (const seed of seeds)
                    yield this.seeder(seed);
                /*const seederPromises = []
                for (const seed of seeds)
                    seederPromises.push(this.seeder(seed))
                await Promise.all(seederPromises)*/
            }
            else {
                yield this.insertMany(seeds);
            }
        }
        else
            console.log(`No need to seed ${this.modelName}.`);
    });
};
mongoose_1.default.reset = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Reseting the database...');
        const db = this.connection.db;
        // Get all collections
        const collections = yield db.listCollections().toArray();
        // Create an array of collection names and drop each collection
        yield Promise.all(collections
            .map((collection) => {
            const collectionName = collection.name;
            return db.dropCollection(collectionName);
        })).then(() => {
            console.log('All collections were dropped!');
        }).catch(err => {
            console.error(err);
        });
    });
};
console.log({ NODE_ENV: config_js_1.NODE_ENV, DB_RESET: config_js_1.DB_RESET });
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    // Las opciones useNewUrlParser, useUnifiedTopology y useFindAndModify nos ahorrarán advertencias en consola (ni idea pa qué son).
    console.log('Connecting to the database...');
    return new Promise((resolve, reject) => {
        const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: config_js_1.DB_CONNECTION_TIMEOUT };
        mongoose_1.default.connect(config_js_1.DB_CONNECTION_STRING, connectOptions)
            .then((db) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`DB connected using ${config_js_1.DB_CONNECTION_STRING}`);
            resolve(db);
        }), error => reject(`Couldn't connect to DB: ${error.message}`));
    });
});
exports.dbInit = dbInit;
