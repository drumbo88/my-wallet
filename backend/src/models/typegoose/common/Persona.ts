/*************************************************************************************
 * Clase "Persona"
 */
// Common props
export interface IPersonaProps {
    nombre: String,
    edad: Number
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
export abstract class Persona implements IPersonaMethods {
    fooPersona(this: IPersona) {
        return `Nombre: ${this.nombre}`
    }
    barPersona(this: IPersona) {
        console.log(this.nombre)
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre: string): Promise<IPersona | null> {
        throw new Error("Cannot call abstract static method");
    }
    static tipos = {
        CLIENTE: 'CLIENTE',
        EMPLEADO: 'EMPLEADO'
    }
}