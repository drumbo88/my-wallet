"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationStatus = exports.OperationTypes = void 0;
var OperationTypes;
(function (OperationTypes) {
    OperationTypes["TRADE"] = "TRADE";
    OperationTypes["EXCHANGE"] = "EXCHANGE";
})(OperationTypes = exports.OperationTypes || (exports.OperationTypes = {}));
var OperationStatus;
(function (OperationStatus) {
    OperationStatus["CREATED"] = "CREATED";
    OperationStatus["PAID"] = "PAID";
    OperationStatus["COMPLETED"] = "COMPLETED";
    OperationStatus["CANCELLED"] = "CANCELLED";
})(OperationStatus = exports.OperationStatus || (exports.OperationStatus = {}));
