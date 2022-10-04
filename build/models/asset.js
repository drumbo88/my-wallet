"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
});
exports.schema = schema;
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model("Asset", schema);
exports.model = model;
