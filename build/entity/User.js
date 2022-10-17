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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const PersonEntity_1 = require("./PersonEntity");
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["INACTIVE"] = 0] = "INACTIVE";
    UserStatus[UserStatus["ACTIVE"] = 1] = "ACTIVE";
    UserStatus[UserStatus["DELETED"] = 2] = "DELETED";
})(UserStatus || (UserStatus = {}));
class User {
    constructor(data = {}) {
        const { name, emailPrimary, emailSecondary, password, status } = data;
        this.name = name;
        this.emailPrimary = emailPrimary;
        this.emailSecondary = emailSecondary;
        this.password = bcryptjs_1.default.hashSync(password || "rbx");
        this.status = status || UserStatus.ACTIVE;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { personEntity } = data, thisData = __rest(data, ["personEntity"]);
            const obj = new this(thisData);
            obj.personEntity = personEntity; //await PersonEntity.init(personEntity)
            return obj;
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const personEntity = yield database_1.AppDataSource.getRepository(PersonEntity_1.PersonEntity).findOneOrFail(data);
                return personEntity.user;
            }
        });
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailSecondary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: UserStatus, default: UserStatus.ACTIVE }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => PersonEntity_1.PersonEntity),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], User.prototype, "personEntity", void 0);
exports.User = User;
