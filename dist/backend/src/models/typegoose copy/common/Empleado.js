"use strict";
/*************************************************************************************
 * Clase "Empleado"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const Persona_1 = require("./Persona");
// Common Class
class Empleado extends Persona_1.Persona {
    fooEmpleado() {
        return `Nombre: ${this.nombre}`;
    }
    barEmpleado() {
        console.log(this.nombre);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre) {
        throw new Error("Cannot call abstract static method");
    }
}
exports.Empleado = Empleado;
