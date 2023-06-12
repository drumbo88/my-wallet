import { DocumentType, getModelForClass, modelOptions, prop, ReturnModelType } from "@typegoose/typegoose";
import { Empresa, IEmpresa } from "../common/Empresa";
import { myModelOptions } from "../_EJEMPLO_typegoose_2";
import { EmpleadoBackend } from "./Empleado";


// Backend class
@modelOptions(myModelOptions)
export class EmpresaBackend extends Empresa implements IEmpresa {
    @prop({ type: String, required: true })
    nombre: string;

    @prop({ type: String })
    taxNumber: string;

    //nuevoEmpleado(this: ReturnModelType<typeof EmpresaBackend>, e: Empleado) {
    public async nuevoEmpleado(this: DocumentType<EmpresaBackend>, empleado: DocumentType<EmpleadoBackend>): Promise<void> {
        empleado.empresa = this.id
        await empleado.save()
    }
    particularImplementation(this: DocumentType<EmpresaBackend>) {
        console.log(this.nombre)
    }
    static async getByNombre(this: ReturnModelType<typeof EmpresaBackend>, nombre: string): Promise<IEmpresa | null> {
        return await this.findOne({ nombre })
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpresaModel = getModelForClass(EmpresaBackend);
