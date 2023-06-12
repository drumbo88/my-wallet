import { getDiscriminatorModelForClass, getModelForClass, prop, Ref, DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { modelOptions } from '@typegoose/typegoose/lib/modelOptions';
import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../config';

mongoose.set('strictQuery', false)

export const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
}

/*********************************************
 * Clase "Empresa"
 */
@modelOptions(myModelOptions)
export class Empresa {
    @prop({ type: String, required: true })
    nombre: string;

    @prop({ type: String })
    taxNumber: string;

    //nuevoEmpleado(this: ReturnModelType<typeof Empresa>, e: Empleado) {
    public async nuevoEmpleado(this: DocumentType<Empresa>, empleado: DocumentType<Empleado>): Promise<void> {
        empleado.empresa = this.id
        await empleado.save()
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpresaModel = getModelForClass(Empresa);




/* Person (abstract): Employee | Client */
/*********************************************
 * Clase abstracta "Persona"
 */
@modelOptions(myModelOptions)
export class Persona {
    @prop({ type: String, unique: true, required: true })
    nombre: string;

    @prop({ type: Number })
    edad: number;

    // Método abstracto para obtener el tipo de persona
    getTipo(): string {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
    static tipos = {
        CLIENTE: 'CLIENTE',
        EMPLEADO: 'EMPLEADO'
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const PersonaModel = getModelForClass(Persona);


/*********************************************
 * Clase "Empleado" que extiende "Persona"
 */
export class Empleado extends Persona {
    @prop({ type: Number, required: true })
    salario: number;

    @prop({ ref: () => Empresa })
    empresa: Ref<Empresa>;

    getTipo(): string {
        return Persona.tipos.EMPLEADO;
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EmpleadoModel = getDiscriminatorModelForClass(PersonaModel, Empleado, 'Empleado');

/*********************************************
 * Clase "Cliente" que extiende "Persona"
 */
export class Cliente extends Persona {
    @prop({ type: String, required: true })
    taxNumber: string;

    getTipo(): string {
        return Persona.tipos.CLIENTE;
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const ClienteModel = getDiscriminatorModelForClass(PersonaModel, Cliente, Persona.tipos.CLIENTE);


/*********************************************
 * TEST
 */

//const answer: number = Employee.myStaticMethod(); // 42

(async () => {
    // Conexión a la BD
    await mongoose.connect(DB_CONNECTION_STRING)
    if (!mongoose.connection.db) {
        console.log(`No se pudo conectar con la base de datos '${DB_CONNECTION_STRING}'.`)
        return
    }
    console.log(`Conectado a la base de datos '${DB_CONNECTION_STRING}'.`)

    // Obtener o crear empresa
    let empresa = await EmpresaModel.findOne({ nombre: 'Rumbex SRL' });
    if (!empresa) {
        empresa = await EmpresaModel.create({ nombre: 'Rumbex SRL' });
        console.log("Empresa creada!")
    }
    else console.log("Empresa encontrada!")

    // Obtener o crear empleado
    let empleado = await EmpleadoModel.findOne({ nombre: 'drumbo' });
    if (!empleado) {
        empleado = new EmpleadoModel({ nombre: 'drumbo', salario: 200000 });
        await empleado.save();
        console.log("Empleado creado.")
    }
    else console.log("Empleado encontrado!")

    // Asignación de empleado a empresa
    if (!empleado.empresa) {
        await empresa.nuevoEmpleado(empleado)
        console.log("Empleado asignado a empresa.")
    }
    else console.log("El empleado ya pertenece a la empresa!")

    // FIN
    console.log({ empresa, empleado })
})()