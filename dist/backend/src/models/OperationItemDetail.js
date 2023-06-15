"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationItemDetailRef = exports.OperationItemDetailFields = exports.OperationItemDetailType = void 0;
const mongoose_1 = require("mongoose");
// Abstract Document for Asset/OperationItemConcept
var OperationItemDetailType;
(function (OperationItemDetailType) {
    OperationItemDetailType["ASSET"] = "Asset";
    OperationItemDetailType["CONCEPT"] = "OperationItemConcept";
})(OperationItemDetailType = exports.OperationItemDetailType || (exports.OperationItemDetailType = {}));
exports.OperationItemDetailFields = {
    name: { type: String, required: true },
    code: { type: String },
    //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
};
exports.OperationItemDetailRef = {
    entity: { type: mongoose_1.Schema.Types.ObjectId, refPath: 'type', required: true },
    type: { type: String, enum: OperationItemDetailType, required: true },
};
