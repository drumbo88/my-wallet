import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { IPersona, IPersonaTipos, Persona } from "../common/Persona";
import { myModelOptions } from "../_EJEMPLO_typegoose_2";

/*************************************************************************************
 * Clase abstracta "Persona" (Employee | Client)
 */
@modelOptions(myModelOptions)
export class PersonaBackend extends Persona implements IPersona {
    @prop({ type: String, unique: true, required: true })
    nombre: string;

    @prop({ type: Number })
    edad: number;

    @prop({ type: IPersonaTipos })
    tipo: IPersonaTipos;

    // Método abstracto para obtener el tipo de persona
    getTipo(): string {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const PersonaModel = getModelForClass(PersonaBackend);
