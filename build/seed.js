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
require("reflect-metadata");
const database = __importStar(require("./database"));
const config_1 = require("./config");
const models = [
    'Currency',
    'Country',
    'Company',
    'Person',
    /*'Operation',*/
];
database.connect()
    .then((ds) => __awaiter(void 0, void 0, void 0, function* () {
    if (config_1.DB_RESET) {
        yield database.reset();
    }
    for (const modelName of models) {
        const entity = yield Promise.resolve().then(() => __importStar(require(`./entity/${modelName}`))); //as EntityAbstract
        const seeds = entity[modelName].seeds || [];
        if (seeds.length) {
            yield Promise.all(yield database.seed(entity[modelName], seeds));
            //await database.seed(ds.getRepository(entity[modelName]), seeds)
        }
    }
    ds.destroy()
        .catch(err => console.error(err))
        .finally(() => console.log("\x1b[32mSeeding completed!\x1b[0m"));
}))
    .catch(err => console.error(err));
