"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.seeds = exports.OperationConcept = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
let OperationConcept = class OperationConcept {
    constructor(data = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, name } = data;
        this.code = code;
        this.name = name;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this(data);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoOperation = database_1.AppDataSource.getRepository(this.constructor);
            return yield repoOperation.save(this);
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const filter = { where: (typeof data == 'string') ? { code: data } : data };
                return yield database_1.AppDataSource.getRepository(this).findOneOrFail(filter);
            }
        });
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], OperationConcept.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OperationConcept.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OperationConcept.prototype, "name", void 0);
OperationConcept = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], OperationConcept);
exports.OperationConcept = OperationConcept;
exports.seeds = [];
