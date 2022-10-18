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
const supertestAgent_1 = __importDefault(require("./supertestAgent"));
describe('Init API and App', () => {
    test('GET /: Should send API Working message', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertestAgent_1.default.get('/api').expect((res) => {
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
