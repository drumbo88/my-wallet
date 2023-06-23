import { DocumentType, getModelForClass, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../../../config";
import { BaseModel, DocPartial } from "./BaseModel";

export const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
}

export type DocEmpresa = DocumentType<Empresa>;

//  class
@modelOptions(myModelOptions)
export class Empresa extends BaseModel {
    @prop({ type: String, required: true })
    nombre: string;

    @prop({ type: String, unique: true })
    taxNumber: string;

    //nuevoEmpleado(this: ReturnModelType<typeof Empresa>, e: Empleado) {
    public async nuevoEmpleado(this: DocEmpresa, empData: DocPartial<Empleado>): Promise<DocEmpresa> {
        let empleado: DocEmpleado = await EmpleadoModel.getOrCreate(empData)
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

export type DocEmpleado = DocumentType<Empleado>;
//  class
@modelOptions(myModelOptions)
export class Empleado extends BaseModel {
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

    const empresa: DocEmpresa = await EmpresaModel.getOrCreate({ nombre: 'Foncap', taxNumber: '123123' })
    //await empresa.nuevoEmpleado({ nombre: 'Rumbex', taxNumber: '345345' })
    const empleado = await EmpleadoModel.findOne({ nombre: 'Rumbex', taxNumber: '345345' })
    if (empleado)
        await empresa.nuevoEmpleado(empleado)
    console.log(`Empresa: ${empresa}`)
    empresa.nombre = 'asdasdasd'
    console.log(await EmpleadoModel.getOneOrFail({empresa}))
    process.exit(0)
})()
