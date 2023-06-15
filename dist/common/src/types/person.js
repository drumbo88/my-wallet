"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonFields = exports.PersonGenders = void 0;
var PersonGenders;
(function (PersonGenders) {
    PersonGenders["MALE"] = "MALE";
    PersonGenders["FEMALE"] = "FEMALE";
    PersonGenders["OTHER"] = "OTHER";
})(PersonGenders = exports.PersonGenders || (exports.PersonGenders = {}));
exports.PersonFields = {
    firstname: String,
    lastname: String,
    birthdate: Date,
    gender: { type: String, enum: PersonGenders },
};
