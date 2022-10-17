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
const index_1 = require("../index");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server = index_1.app.listen();
const api = supertest_1.default.agent(server);
describe('Init API and App', () => {
    test('Should send API Working message at GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get('/api').expect((res) => {
            expect(res.body.message).toContain("API Working");
            expect(res.statusCode).toBe(200);
            expect(res.type).toMatch(/application\/json/);
        });
    }));
    /*test('Should send ReactApp with 200 status code at GET /api ', async () => {
        await api.get('/').expect((res) => {
            expect(res.text).toContain("<div id=\"app\"")
            expect(res.statusCode).toBe(200)
            expect(res.type).toMatch(/text\/html/)
        })
    })*/
});
afterAll(() => {
    mongoose_1.default.connection.close();
    server.close();
});
