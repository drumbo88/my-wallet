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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server = index_js_1.app.listen();
const api = supertest_1.default.agent(server);
describe('Authorization', () => {
    test('Should send status code 200 and token on valid authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body, type, statusCode } = yield api.post('/api/login').send();
        expect(Object.keys(body)).toEqual(expect.arrayContaining(['message', 'token']));
        expect(body.message).toContain("Auth successful");
        expect(statusCode).toBe(200);
    }));
    test('Should send status code 403 from protected API route with no valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield api.get('/api/country').send();
        expect(text).toContain("Auth failed");
        expect(statusCode).toBe(401);
    }));
});
afterAll(() => {
    mongoose_1.default.connection.close();
    server.close();
});
