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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.reset = exports.seed = exports.AppDataSource = void 0;
const config_1 = require("./config");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: config_1.DB_DNS,
    port: config_1.DB_PORT,
    //username: DB_USER,
    //password: DB_PASSWORD,
    database: config_1.DB_NAME,
    entities: [__dirname + "/entity/*.js"],
});
const seed = (entity, seeds) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = entity.prototype.constructor.name;
    if (seeds.length && !(yield entity.count())) {
        console.log(`Seeding ${seeds.length} of ${tableName}...`);
        const seederPromises = [];
        for (const seed of seeds) {
            seederPromises.push((yield entity.init(seed)).save());
        }
        return yield Promise.all(seederPromises);
    }
    else {
        console.log(`No need to seed ${tableName}.`);
        return [];
    }
});
exports.seed = seed;
const reset = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Dropping the database...');
        exports.AppDataSource.dropDatabase().then(() => {
            console.log('All collections were dropped!');
        }).catch(err => {
            console.error(err);
        });
    });
};
exports.reset = reset;
//console.log({NODE_ENV,DB_RESET})
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connecting to the database...');
    return new Promise((resolve, reject) => {
        exports.AppDataSource.initialize()
            .then(db => {
            console.log("DS initialized!");
            resolve(db);
        })
            .catch((error) => {
            reject(`Couldn't initialize DS: ${error.stack}`);
        });
    });
});
exports.connect = connect;
