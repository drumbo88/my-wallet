"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class BaseModel {
    static get schema() {
        return (0, typegoose_1.buildSchema)(this, {
            schemaOptions: {
                timestamps: true,
                toJSON: {
                    getters: true,
                    virtuals: true,
                },
            }
        });
    }
    static get modelName() {
        return this.name;
    }
}
__decorate([
    (0, typegoose_1.prop)()
], BaseModel.prototype, "createdDate", void 0);
__decorate([
    (0, typegoose_1.prop)()
], BaseModel.prototype, "updatedDate", void 0);
exports.BaseModel = BaseModel;
