"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const OperationItemDetail_1 = require("./OperationItemDetail");
;
exports.schema = new mongoose_1.Schema({
    currencyCode: { type: String, ref: 'Currency' },
    quantity: { type: Number, default: 0 },
    amount: { type: Number, default: 0, required: true },
    total: { type: Number, default: 0 },
    conceptId: new mongoose_1.Schema(OperationItemDetail_1.OperationItemDetailRef, database_1.defaultSchemaOptions),
    // excluyent types of item
    //asset: { type: Schema.Types.ObjectId, ref: 'Asset' }, // Opcional (objetos tangibles o intangibles)
    //concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' }, // Opcional (impuesto, interés, conceptos abstractos)
    detail: { type: String },
}, database_1.defaultSchemaOptions);
