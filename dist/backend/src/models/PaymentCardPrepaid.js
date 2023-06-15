"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.PaymentCardPrepaidSchema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
var PeriodType;
(function (PeriodType) {
    PeriodType["DAY"] = "DAY";
    PeriodType["MONTH"] = "MONTH";
})(PeriodType || (PeriodType = {}));
exports.PaymentCardPrepaidSchema = new mongoose_1.Schema({}, database_1.defaultSchemaOptions);
exports.seeds = [];
//export const model = mongoose.model('PaymentCardPrepaid', PaymentCardPrepaidSchema)
