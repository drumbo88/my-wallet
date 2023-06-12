/*************************************************************************************
 * Clase "Persona"
 */

export enum IPersonaTipos {
    CLIENTE = 'CLIENTE',
    EMPLEADO = 'EMPLEADO'
}

// Common props
export class IPersonaProps {
    nombre: String
    edad: Number
    tipo: IPersonaTipos
}
// Common methods
export interface IPersonaMethods {
    fooPersona(): String,
    barPersona(): void,
}
// Common Class interface
export interface IPersona extends IPersonaProps, IPersonaMethods {

}
// Common Class
export abstract class Persona extends IPersonaProps implements IPersonaMethods {
    fooPersona() {
        return `Nombre: ${this.nombre}`
    }
    barPersona() {
        console.log(this.nombre)
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre: string): Promise<IPersona | null> {
        throw new Error("Cannot call abstract static method");
    }
}