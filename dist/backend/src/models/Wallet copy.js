"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const WalletAsset_1 = require("./WalletAsset");
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["INACTIVE"] = "INACTIVE";
})(WalletStatus || (WalletStatus = {}));
var WalletType;
(function (WalletType) {
    WalletType["FUNDS"] = "FUNDS";
    WalletType["SPOT"] = "SPOT";
    WalletType["EARN"] = "EARN";
    WalletType["FIXED_TERM"] = "FIXED_TERM";
    WalletType["CREDIT"] = "CREDIT";
})(WalletType || (WalletType = {}));
const schema = new mongoose_1.Schema({
    address: { type: String },
    alias: { type: String },
    status: { type: String, enum: WalletStatus, default: WalletStatus.ACTIVE },
    type: { type: String, enum: WalletType, default: WalletType.FUNDS },
    // currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    balance: { type: Number, default: 0 },
    assets: [WalletAsset_1.schema],
    // debitCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    // prepaidCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    // creditCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    detail: { type: String },
}, database_1.defaultSchemaOptions);
exports.schema = schema;
