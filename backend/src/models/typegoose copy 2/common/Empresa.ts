/*************************************************************************************
 * Clase "Empresa"
 */

import { IEmpleado } from "./Empleado";

// Common props
export class IEmpresaProps {
    nombre: String
    taxNumber: String
}
// Common methods
export interface IEmpresaMethods {
    fooEmpresa(): String,
    barEmpresa(): void,
}
// Common Class interface
export interface IEmpresa extends IEmpresaProps, IEmpresaMethods {

}
// Common Class
export abstract class Empresa extends IEmpresaProps implements IEmpresaMethods {
    fooEmpresa() {
        return `Nombre: ${this.nombre}`
    }
    barEmpresa() {
        console.log(this.nombre)
    }
    //abstract nuevoEmpleado(): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre: string): Promise<IEmpresa | null> {
        throw new Error("Cannot call abstract static method");
    }
}