import { getDiscriminatorModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../../config';
import { EmpleadoModel } from './backend/Empleado';
import { EmpresaModel } from './backend/Empresa';
import { PersonaBackend, PersonaModel } from './backend/Persona';
import { Persona } from './common/Persona';

mongoose.set('strictQuery', false)

export const myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
}

/*************************************************************************************
 * Clase "Cliente" que extiende "Persona"
 */
export class Cliente extends PersonaBackend {
    @prop({ type: String, required: true })
    taxNumber: string;

    getTipo(): string {
        return Persona.tipos.CLIENTE;
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const ClienteModel = getDiscriminatorModelForClass(PersonaModel, Cliente, Persona.tipos.CLIENTE);


/*************************************************************************************
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

    empleado.fooPersona()
    empleado.fooEmpleado() // <-- no dice fooEmpleado (!)

    // FIN
    console.log({ empresa, empleado })
})()