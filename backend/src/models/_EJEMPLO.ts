import mongoose, { Schema, model, Document, Model, Types } from 'mongoose';
import { DB_CONNECTION_STRING } from '../config';

mongoose.set('strictQuery', false)
mongoose.connect(DB_CONNECTION_STRING)

class ModelClass {
    constructor(data: any) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
        console.log({this:this})
    }
}

/* COMMON */
interface IUser {
    _id: Types.ObjectId;
    nombre: string;
    apellido: string;
    nombreCompleto: string;
}
interface IUserStaticMethods {
}
interface IUserInstanceMethods {
    saludar(saludo: string): void;
    //nombreCompleto: string;
}

abstract class UserClass extends ModelClass implements IUser {
    _id: Types.ObjectId;
    nombre: string;
    apellido: string;

    constructor(data: Partial<IUser>) {
        super(data)
    }

    public saludar(this: UserClass, saludo: string): void {
        console.log(`${saludo}, mi nombre es ${this.nombre} ${this.apellido}`);
    }

    get nombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }
}

/* FRONTEND */
interface IUserFrontend extends IUser {
}
interface IUserFrontendStaticMethods extends IUserStaticMethods {
    crearUsuario(nombre: string, apellido: string): Promise<UserFrontendClass>
}
interface IUserFrontendInstanceMethods extends IUserInstanceMethods {
}

class UserFrontendClass extends UserClass implements IUserFrontendInstanceMethods {
    constructor(data: Partial<IUserFrontend>) {
        super(data)
    }
    static async crearUsuario(this: IUserModel, nombre: string, apellido: string): Promise<UserFrontendClass> {
        console.log('Creando usuario ' + JSON.stringify({ nombre, apellido }))
        try {
            const user: Partial<IUserFrontend> = {}  /*await axios.post('api/user/')*/
            return new UserFrontendClass(user)
        }
        catch (e: any) {
            console.error()
        }
        return new this({ nombre, apellido });
    }
}

/* BACKEND */
interface IUserBackend extends IUser {
}
interface IUserBackendStaticMethods extends IUserStaticMethods {
    crearUsuario(nombre: string, apellido: string): Promise<IUserDocument>
}
interface IUserBackendInstanceMethods extends IUserInstanceMethods {
}

type IUserDocument = IUser & Document & IUserInstanceMethods;
type IUserModel = Model<IUserDocument> & IUserBackendStaticMethods;

class UserBackendClass extends UserClass implements IUserBackendInstanceMethods {

    constructor(data: Partial<IUserBackend>) { // Hacer genérico para todas las clases
        super(data)
    }
    static crearUsuario(this: IUserModel, nombre: string, apellido: string): Promise<IUserDocument> {
        console.log('Creando usuario ' + JSON.stringify({ nombre, apellido }))
        return new this({ nombre, apellido }).save();
    }
}

const usuarioSchema = new Schema<IUserBackend>({
    nombre: String,
    apellido: String
});

usuarioSchema.loadClass(UserBackendClass);
const UserModel = model<IUserDocument, IUserModel>('Usuario', usuarioSchema);

/* USO */
(async () => {
    const usuario = await UserModel.crearUsuario('Juan', 'Pérez');
    usuario.saludar('Hola');
    console.log('Nombre completo: ' + usuario.nombreCompleto);
})()
