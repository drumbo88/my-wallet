"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    currency: { type: String, required: true, ref: 'Currency' },
    quantity: { type: Number, min: 0 },
    amount: { type: Number, required: true, min: 0 },
    // excluyent types of item
    asset: { type: Schema.Types.ObjectId, ref: 'Asset' },
    concept: { type: Schema.Types.ObjectId, ref: 'OperationConcept' },
    detail: { type: String },
});
exports.schema = schema;
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model('OperationItem', schema);
exports.model = model;
