"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAccountProps = exports.AccountTypes = exports.AccountStatus = void 0;
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
