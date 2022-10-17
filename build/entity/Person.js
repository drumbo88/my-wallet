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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const PersonEntity_1 = require("./PersonEntity");
const database_1 = require("../database");
var PersonGenders;
(function (PersonGenders) {
    PersonGenders[PersonGenders["MALE"] = 1] = "MALE";
    PersonGenders[PersonGenders["FEMALE"] = 2] = "FEMALE";
    PersonGenders[PersonGenders["OTHER"] = 3] = "OTHER";
})(PersonGenders || (PersonGenders = {}));
class Person {
    constructor(data = {}) {
        const { firstName, lastName, birthdate, gender } = data;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.gender = gender;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taxId, user } = data, thisData = __rest(data, ["taxId", "user"]);
            const obj = new this(thisData);
            obj.personEntity = yield PersonEntity_1.PersonEntity.init({ taxId, user });
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoPersonEntity = database_1.AppDataSource.getRepository(PersonEntity_1.PersonEntity);
            return yield repoPersonEntity.save(Object.assign(Object.assign({}, this.personEntity), { person: this }));
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const filter = { where: (typeof data == 'string') ? { taxId: data } : data };
                const personEntity = yield database_1.AppDataSource.getRepository(PersonEntity_1.PersonEntity).findOneOrFail(filter);
                return personEntity.person;
            }
        });
    }
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return PersonEntity_1.PersonEntity.count({ where: { person: !(0, typeorm_1.IsNull)() } });
        });
    }
}
exports.Person = Person;
Person.seeds = [
    {
        firstName: "Darío",
        lastName: "Rumbo",
        birthdate: "1988-06-19",
        taxId: "20337466711",
        gender: "male",
        user: {
            name: "drumbo88",
            emailPrimary: "dario.rumbo@gmail.com",
            password: '12345'
        },
    }
];
