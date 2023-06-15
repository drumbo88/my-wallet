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
const index_js_1 = require("../index.js");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
let api = null, server = null;
describe('init::app', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('INIT_TEST');
    let server = yield index_js_1.app.listen(4000); //await startServer()
    let request = yield supertest_1.default.agent(server);
    console.log('###---');
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('AAA');
        //server = await app.listen(4000) //await startServer()
        console.log('BBB');
        //request = await supertest.agent(server);
        console.log('CCC');
    }));
    test('Server init', () => {
        request.get('/').expect(200);
    });
    afterAll(() => {
        mongoose_1.default.connection.close();
        server.close();
        console.log('END_APP');
    });
}));
const initVars = []; // ...
module.exports = { api, initVars };
