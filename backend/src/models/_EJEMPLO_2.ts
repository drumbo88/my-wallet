import mongoose, { Schema, model, Document, Model, Types } from 'mongoose';
import { DB_CONNECTION_STRING } from '../config';
import { ModelClass } from '.';

mongoose.set('strictQuery', false)
mongoose.connect(DB_CONNECTION_STRING)

interface IDbRecord {
    _id: string;
}
/* COMMON YYY */
/* Propiedades comunes y computadas */
interface IYyy extends IDbRecord {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
}
interface IYyyStaticMethods {
}
interface IYyyInstanceMethods {
    saludar(saludo: string): void;
    //nombreCompleto: string;
}

abstract class YyyClass extends ModelClass implements IYyy {
    _id: Types.ObjectId;
    nombre: string;
    apellido: string;

    constructor(data: Partial<IYyy>) {
        super(data)
    }

    public saludar(this: YyyClass, saludo: string): void {
        console.log(`${saludo}, mi nombre es ${this.nombre} ${this.apellido}`);
    }

    get nombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }
}

/* FRONTEND YYY */
interface IYyyFrontend extends IYyy {
}
interface IYyyFrontendStaticMethods extends IYyyStaticMethods {
    crearYyy(nombre: string, apellido: string): Promise<YyyFrontendClass>
}
interface IYyyFrontendInstanceMethods extends IYyyInstanceMethods {
}

class YyyFrontendClass extends YyyClass implements IYyyFrontendInstanceMethods {
    constructor(data: Partial<IYyyFrontend>) {
        super(data)
    }
    static async crearYyy(this: IYyyModel, nombre: string, apellido: string): Promise<YyyFrontendClass> {
        console.log('Creando yyy ' + JSON.stringify({ nombre, apellido }))
        try {
            const Yyy: Partial<IYyyFrontend> = {}  /*await axios.post('api/Yyy/')*/
            return new YyyFrontendClass(Yyy)
        }
        catch (e: any) {
            console.error()
        }
        return new this({ nombre, apellido });
    }
}

/* BACKEND YYY */
interface IYyyBackend extends IYyy {
}
interface IYyyBackendStaticMethods extends IYyyStaticMethods {
    crearYyy(nombre: string, apellido: string): Promise<IYyyDocument>
}
interface IYyyBackendInstanceMethods extends IYyyInstanceMethods {
}

type IYyyDocument = IYyy & Document & IYyyInstanceMethods;
type IYyyModel = Model<IYyyDocument> & IYyyBackendStaticMethods;

class YyyBackendClass extends YyyClass implements IYyyBackendInstanceMethods {

    constructor(data: Partial<IYyyBackend>) { // Hacer genérico para todas las clases
        super(data)
    }
    static crearYyy(this: IYyyModel, nombre: string, apellido: string): Promise<IYyyDocument> {
        console.log('Creando yyy ' + JSON.stringify({ nombre, apellido }))
        return new this({ nombre, apellido }).save();
    }
}

const yyySchema = new Schema<IYyyBackend>({
    nombre: String,
    apellido: String
});

yyySchema.loadClass(YyyBackendClass);
const YyyModel = model<IYyyDocument, IYyyModel>('Yyy', yyySchema);

/* COMMON XXX */
/* Propiedades comunes y computadas */
interface IXxx extends IDbRecord {
    nombre: string;
    apellido: string;
    yyy: Yyy;
    yyys: [ Yyy ];
    nombreCompleto: string;
}
interface IXxxStaticMethods {
}
interface IXxxInstanceMethods {
    saludar(saludo: string): void;
    //nombreCompleto: string;
}

abstract class XxxClass extends ModelClass implements IXxx {
    _id: Types.ObjectId;
    nombre: string;
    apellido: string;
    yyy: Yyy;
    yyys: [ Yyy ];

    constructor(data: Partial<IXxx>) {
        super(data)
    }

    public saludar(this: XxxClass, saludo: string): void {
        console.log(`${saludo}, mi nombre es ${this.nombre} ${this.apellido}`);
    }

    get nombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }
}

/* FRONTEND XXX */
interface IXxxFrontend extends IXxx {
}
interface IXxxFrontendStaticMethods extends IXxxStaticMethods {
    crearXxx(nombre: string, apellido: string): Promise<XxxFrontendClass>
}
interface IXxxFrontendInstanceMethods extends IXxxInstanceMethods {
}

class XxxFrontendClass extends XxxClass implements IXxxFrontendInstanceMethods {
    constructor(data: Partial<IXxxFrontend>) {
        super(data)
    }
    static async crearXxx(this: IXxxModel, nombre: string, apellido: string): Promise<XxxFrontendClass> {
        console.log('Creando xxx ' + JSON.stringify({ nombre, apellido }))
        try {
            const Xxx: Partial<IXxxFrontend> = {}  /*await axios.post('api/Xxx/')*/
            return new XxxFrontendClass(Xxx)
        }
        catch (e: any) {
            console.error()
        }
        return new this({ nombre, apellido });
    }
}

/* BACKEND XXX */
interface IXxxBackend extends IXxx {
}
interface IXxxBackendStaticMethods extends IXxxStaticMethods {
    crearXxx(this: typeof XxxModel, nombre: string, apellido: string, yyy?: IYyyBackend): Promise<IXxxDocument>
}
interface IXxxBackendInstanceMethods extends IXxxInstanceMethods {
}

type IXxxDocument = IXxx & typeof Document & IXxxInstanceMethods;
type IXxxModel = Model<IXxxDocument> & IXxxBackendStaticMethods;

class XxxBackendClass extends XxxClass implements IXxxBackendInstanceMethods {

    constructor(data: Partial<IXxxBackend>) { // Hacer genérico para todas las clases
        super(data)
    }
    static crearXxx = async (this: typeof IXxxModel, nombre: string, apellido: string, yyy?: IYyyBackend): Promise<IXxxDocument> => {
        console.log('Creando xxx ' + JSON.stringify({ nombre, apellido }))
        const xxx = new this({ nombre, apellido, yyy });
        //const xxx = new this({ nombre, apellido, yyy }).save();
        return await xxx.save()
    }
}

const xxxSchema = new Schema<IXxxBackend>({
    nombre: String,
    apellido: String,
    yyy: yyySchema,
    yyys: [ yyySchema ],
});

xxxSchema.loadClass(XxxBackendClass);
try {
const XxxModel = model<IXxxDocument, IXxxModel>('Xxx', xxxSchema);

/* USO */
(async () => {
    const xxx = await XxxModel.crearXxx('Juan', 'Pérez');
    xxx.saludar('Hola');
    console.log('Nombre completo: ' + xxx.nombreCompleto);
    if (xxx.yyy) {
        //xxx.
    }
})()
}
catch(e:any) {

}
