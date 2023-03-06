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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInit = exports.dbReset = exports.dbSeed = exports.MyModel = exports.defaultSchemaOptions = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_js_1 = require("./config.js");
mongoose_1.default.set('strictQuery', false);
exports.defaultSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true, getters: true },
    versionKey: false
};
class MyModel extends mongoose_1.Model {
}
exports.MyModel = MyModel;
const dbSeed = function (model, modelSeeds) {
    return __awaiter(this, void 0, void 0, function* () {
        //const seeds = [] //model.seeds()
        const count = yield model.estimatedDocumentCount();
        const abstractSchema = !(modelSeeds instanceof Array);
        let seedsByType = abstractSchema ? modelSeeds : { modelSeeds };
        for (let i in seedsByType) {
            let seeds = seedsByType[i];
            const modelName = model.modelName + (abstractSchema ? '.' + i : '');
            if ((seeds === null || seeds === void 0 ? void 0 : seeds.length) && !count) {
                let seeder;
                if (abstractSchema) {
                    seeds.forEach(x => { if (!x.hasOwnProperty(i))
                        x[i] = {}; });
                    //console.log(seeds)
                }
                //console.log({myModel: model instanceof MyModel, model, seed:model.seed})
                if (!model.seed) {
                    console.log(`🌱 Seeding ${seeds.length} of ${modelName}...`);
                    seeder = (seeds) => __awaiter(this, void 0, void 0, function* () { return yield model.insertMany(seeds); });
                }
                else {
                    console.log(`🌱 Seeding ${seeds.length} of ${modelName} using seeder...`);
                    seeder = (seeds) => __awaiter(this, void 0, void 0, function* () { var _a; return yield ((_a = model.seed) === null || _a === void 0 ? void 0 : _a.call(model, seeds)); });
                }
                try {
                    yield seeder(seeds);
                }
                catch (error) {
                    console.log(`    ❌ ${error}`);
                }
            }
            else if (!seeds || !seeds.length) {
                console.log(` ℹ Nothing to seed of ${modelName}.`);
            }
            else {
                console.log(` ℹ No need to seed ${modelName} (${count} existing documents).`);
            }
        }
    });
};
exports.dbSeed = dbSeed;
const dbReset = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('💣 Dropping the database...');
        const db = mongoose_1.default.connection.db;
        // Get all collections
        const collections = yield db.listCollections().toArray();
        // Create an array of collection names and drop each collection
        yield Promise.all(collections
            .map((collection) => {
            const collectionName = collection.name;
            return db.dropCollection(collectionName);
        })).then(() => {
            console.log(' ✔ All collections were dropped!');
        }).catch(err => {
            console.error(err);
        });
    });
};
exports.dbReset = dbReset;
console.log({ NODE_ENV: config_js_1.NODE_ENV, DB_RESET: config_js_1.DB_RESET });
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    // Las opciones useNewUrlParser, useUnifiedTopology y useFindAndModify nos ahorrarán advertencias en consola (ni idea pa qué son).
    console.log(`Connecting to MongoDB on port ${config_js_1.DB_PORT}...`);
    return new Promise((resolve, reject) => {
        const connectOptions = {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //serverSelectionTimeoutMS : DB_CONNECTION_TIMEOUT
        };
        return mongoose_1.default.connect(config_js_1.DB_CONNECTION_STRING, connectOptions)
            .then((db) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`DB connected using ${config_js_1.DB_CONNECTION_STRING}`);
            resolve(db);
        }), error => reject(`Couldn't connect to DB: ${error.message}`));
    });
});
exports.dbInit = dbInit;
