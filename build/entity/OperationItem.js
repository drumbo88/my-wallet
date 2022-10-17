"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.OperationItem = void 0;
const typeorm_1 = require("typeorm");
const Asset_1 = require("./Asset");
const Currency_1 = require("./Currency");
const OperationConcept_1 = require("./OperationConcept");
let OperationItem = class OperationItem {
    constructor(data = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { currency, quantity, price, asset, concept, detail } = data;
        this.currency = currency;
        this.quantity = quantity;
        this.price = price;
        this.detail = detail;
        this.asset = asset || null;
        this.concept = concept || null;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { asset, concept, currency } = data, thisData = __rest(data, ["asset", "concept", "currency"]);
            const obj = new this(thisData);
            obj.currency = yield Currency_1.Currency.getOne(currency);
            obj.asset = asset ? yield Asset_1.Asset.getOne(asset) : null;
            obj.concept = concept ? yield OperationConcept_1.OperationConcept.getOne(concept) : null;
            return obj;
        });
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], OperationItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Currency_1.Currency, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], OperationItem.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OperationItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OperationItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Asset_1.Asset, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], OperationItem.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => OperationConcept_1.OperationConcept, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], OperationItem.prototype, "concept", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], OperationItem.prototype, "detail", void 0);
OperationItem = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], OperationItem);
exports.OperationItem = OperationItem;
exports.seeds = [];
