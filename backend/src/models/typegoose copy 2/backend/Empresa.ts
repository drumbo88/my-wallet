import { DocumentType, getModelForClass, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../../../config";

export const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
}
async function findOrCreateDocument<T>(
    model: ReturnModelType<AnyParamConstructor<T>, {}>,
    query: Partial<DocumentType<T>> | DocumentType<T>
): Promise<DocumentType<T>> {
    if (query instanceof model)
        return query as DocumentType<T>;

    return await model.findOne(query as DocumentType<T>) || await model.create(query) as DocumentType<T>;
}

type DocEmpresa = DocumentType<Empresa>;
type DocEmpleado = DocumentType<Empleado>;

//  class
@modelOptions(myModelOptions)
export class Empresa {
    @prop({ type: String, required: true })
    nombre: string;

    @prop({ type: String, unique: true })
    taxNumber: string;

    //nuevoEmpleado(this: ReturnModelType<typeof Empresa>, e: Empleado) {
    public async nuevoEmpleado(this: DocEmpresa, empData: DocEmpleado | Partial<Empleado> | Empleado): Promise<DocEmpresa> {
        let empleado: DocEmpleado = await findOrCreateDocument<Empleado>(EmpleadoModel, empData)
        empleado.empresa = this
        await empleado.save()
        console.log(`Empleado: ${empleado}`)
        return this
    }
    particularImplementation(this: DocEmpresa) {
        console.log(this.nombre)
    }
    static async getByNombre(this: ReturnModelType<typeof Empresa>, nombre: string): Promise<DocEmpresa | null> {
        return await this.findOne({ nombre })
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpresaModel = getModelForClass(Empresa);

//  class
@modelOptions(myModelOptions)
export class Empleado {
    @prop({ type: String, required: true })
    nombre: string;

    @prop({ type: String })
    taxNumber: string;

    @prop({ type: () => Empresa, ref: Empresa })
    empresa: Ref<Empresa>;

    static async getByNombre(this: ReturnModelType<typeof Empleado>, nombre: string): Promise<DocEmpleado | null> {
        return await this.findOne({ nombre })
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpleadoModel = getModelForClass(Empleado);

(async () => {
    // Conexión a la BD
    await mongoose.connect(DB_CONNECTION_STRING)
    if (!mongoose.connection.db) {
        console.log(`No se pudo conectar con la base de datos '${DB_CONNECTION_STRING}'.`)
        return
    }
    console.log(`Conectado a la base de datos '${DB_CONNECTION_STRING}'.`)

    const empresa: DocEmpresa = await findOrCreateDocument<Empresa>(EmpresaModel, { nombre: 'Foncap', taxNumber: '123123' })
    //await empresa.nuevoEmpleado({ nombre: 'Rumbex', taxNumber: '345345' })
    const empleado = await EmpleadoModel.findOne({ nombre: 'Rumbex', taxNumber: '345345' })
    if (empleado)
        await empresa.nuevoEmpleado(empleado)
    console.log(`Empresa: ${empresa}`)
    process.exit(0)
})()
