import { getDiscriminatorModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Persona } from "../common/Persona";
import { EmpresaBackend } from "./Empresa";
import { PersonaBackend, PersonaModel } from "./Persona";
import { myModelOptions } from "../_EJEMPLO_typegoose_2";
import { Empleado, IEmpleado } from "../common/Empleado";
import { IEmpresa } from "../common/Empresa";

/*************************************************************************************
 * Clase "Empleado" que extiende "Persona"
 */
@modelOptions(myModelOptions)
export class EmpleadoBackend extends Empleado implements IEmpleado {
    @prop({ type: String, unique: true, required: true })
    nombre: string;

    @prop({ type: Number })
    edad: number;

    @prop({ type: Number, required: true })
    salario: number;

    @prop({ ref: () => EmpresaBackend })
    empresa: Ref<EmpresaBackend> & IEmpresa;

    getTipo(): string {
        return Persona.tipos.EMPLEADO;
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpleadoModel = getDiscriminatorModelForClass(PersonaModel, EmpleadoBackend, 'Empleado');
