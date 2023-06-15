"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
// Common Class
class Persona {
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
Persona.tipos = {
    CLIENTE: 'CLIENTE',
    EMPLEADO: 'EMPLEADO'
};
