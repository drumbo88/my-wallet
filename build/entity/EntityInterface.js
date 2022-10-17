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
exports.EntityAbstract = void 0;
const typeorm_1 = require("typeorm");
/*export interface EntityInterface {
    init<T>(data: any): Promise<T>
}*/
class EntityAbstract extends typeorm_1.BaseEntity {
    static init(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this(data);
        });
    }
    static seed(seed = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this; //.init(seed).save()
        });
    }
}
exports.EntityAbstract = EntityAbstract;
// Person extends EntityAbstract
// Quiero Person.seed() { this<Person>.init().save() }
