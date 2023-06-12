/*************************************************************************************
 * Clase "Empleado"
 */

import { DocumentType } from "@typegoose/typegoose";
import { EmpleadoBackend } from "../backend/Empleado";
import { IEmpresa, IEmpresaProps } from "./Empresa";
import { IPersonaMethods, IPersonaProps, Persona } from "./Persona";

// Common props
export interface IEmpleadoProps extends IPersonaProps {
    salario: number;
    empresa: IEmpresa// Partial<IEmpresaProps>
}
// Common methods
export interface IEmpleadoMethods extends IPersonaMethods {
    fooEmpleado(): String,
    barEmpleado(): void,
}
// Common Class interface
export interface IEmpleado extends IEmpleadoProps, IEmpleadoMethods {
}
// Common Class
export abstract class Empleado extends Persona implements IEmpleadoMethods {
    fooEmpleado(this: IEmpleado | DocumentType<EmpleadoBackend>) {
        return `Nombre: ${this.nombre}`
    }
    barEmpleado(this: IEmpleado) {
        console.log(this.nombre)
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre: string): Promise<IEmpleado | null> {
        throw new Error("Cannot call abstract static method");
    }
}
