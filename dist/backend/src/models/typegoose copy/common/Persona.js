"use strict";
/*************************************************************************************
 * Clase "Persona"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = exports.IPersonaProps = exports.IPersonaTipos = void 0;
var IPersonaTipos;
(function (IPersonaTipos) {
    IPersonaTipos["CLIENTE"] = "CLIENTE";
    IPersonaTipos["EMPLEADO"] = "EMPLEADO";
})(IPersonaTipos = exports.IPersonaTipos || (exports.IPersonaTipos = {}));
// Common props
class IPersonaProps {
}
exports.IPersonaProps = IPersonaProps;
// Common Class
class Persona extends IPersonaProps {
    fooPersona() {
        return `Nombre: ${this.nombre}`;
    }
    barPersona() {
        console.log(this.nombre);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre) {
        throw new Error("Cannot call abstract static method");
    }
}
exports.Persona = Persona;
