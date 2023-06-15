"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.IEntityProps = exports.EntityTypes = exports.EntityStatus = void 0;
const types_1 = require("../types");
var EntityStatus;
(function (EntityStatus) {
    EntityStatus["ACTIVE"] = "ACTIVE";
    EntityStatus["INACTIVE"] = "INACTIVE";
})(EntityStatus = exports.EntityStatus || (exports.EntityStatus = {}));
var EntityTypes;
(function (EntityTypes) {
    EntityTypes["PERSON"] = "person";
    EntityTypes["COMPANY"] = "company";
})(EntityTypes = exports.EntityTypes || (exports.EntityTypes = {}));
// Common props
class IEntityProps {
    /* Static methods */
    static getPeople(data) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
    static getCompanies(data) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByName(name) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
}
exports.IEntityProps = IEntityProps;
// Common Class
class Entity extends IEntityProps {
    // abstract addOwnedAccount(): Promise<any>
    // abstract addAdministratedAccount(): Promise<any>
    static getPeople(data) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
    static getCompanies(data) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByName(name) {
        throw new Error(types_1.COMPILE_ERROR_ABSTRACT_STATIC);
    }
}
exports.Entity = Entity;
