"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const schema = new mongoose_1.Schema({
    currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    balance: { type: Number, required: true },
    detail: { type: String },
}, database_1.defaultSchemaOptions);
exports.schema = schema;
