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
describe('Authorization', () => {
    test('UserLogin (/api/login): Should send status code 200 and token on valid authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body, type, statusCode } = yield supertestAgent_1.default.post('/api/login').send();
        expect(Object.keys(body)).toEqual(expect.arrayContaining(['message', 'token']));
        expect(body.message).toContain("Auth successful");
        expect(statusCode).toBe(200);
    }));
    test('ProtectedRoute: Should send status code 403 if no valid auth token', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield supertestAgent_1.default.get('/api/country').send();
        expect(text).toContain("Auth failed");
        expect(statusCode).toBe(401);
    }));
});
