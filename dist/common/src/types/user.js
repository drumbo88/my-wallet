"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFields = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["INACTIVE"] = "INACTIVE";
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["DELETED"] = "DELETED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
exports.UserFields = {
    name: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: String,
    status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
};
