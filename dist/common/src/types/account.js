"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.IAccountProps = exports.AccountTypes = exports.AccountStatus = void 0;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "ACTIVE";
    AccountStatus["INACTIVE"] = "INACTIVE";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
var AccountTypes;
(function (AccountTypes) {
    AccountTypes["FUNDS"] = "FUNDS";
    AccountTypes["SPOT"] = "SPOT";
    AccountTypes["EARN"] = "EARN";
    AccountTypes["FIXED_TERM"] = "FIXED_TERM";
    AccountTypes["CREDIT"] = "CREDIT";
})(AccountTypes = exports.AccountTypes || (exports.AccountTypes = {}));
// Common props
class IAccountProps {
}
exports.IAccountProps = IAccountProps;
// Common Class
class Account extends IAccountProps {
    statusStr() {
        switch (this.status) {
            case AccountStatus.ACTIVE:
                return 'Activo';
            case AccountStatus.INACTIVE:
                return 'Inactivo';
        }
    }
    typeStr() {
        switch (this.type) {
            case AccountTypes.FUNDS:
                return 'Fondos';
            case AccountTypes.SPOT:
                return 'Spot';
            case AccountTypes.EARN:
                return 'Earn';
            case AccountTypes.FIXED_TERM:
                return 'Plazo fijo';
            case AccountTypes.CREDIT:
                return 'Crédito';
        }
    }
    static getByNombre(nombre) {
        throw new Error("Cannot call abstract static method");
    }
    static getByOwner(entityData) {
        throw new Error("Cannot call abstract static method");
    }
}
exports.Account = Account;
