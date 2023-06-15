"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = exports.Cliente = exports.myModelOptions = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const Empleado_1 = require("./backend/Empleado");
const Empresa_1 = require("./backend/Empresa");
const Persona_1 = require("./backend/Persona");
const Persona_2 = require("./common/Persona");
mongoose_1.default.set('strictQuery', false);
exports.myModelOptions = {
    schemaOptions: {
        toObject: { virtuals: true },
        toJSON: { virtuals: true, getters: true },
        versionKey: false,
        timestamps: true,
    }
};
/*************************************************************************************
 * Clase "Cliente" que extiende "Persona"
 */
class Cliente extends Persona_1.PersonaBackend {
    getTipo() {
        return Persona_2.Persona.tipos.CLIENTE;
    }
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Cliente.prototype, "taxNumber", void 0);
exports.Cliente = Cliente;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.ClienteModel = (0, typegoose_1.getDiscriminatorModelForClass)(Persona_1.PersonaModel, Cliente, Persona_2.Persona.tipos.CLIENTE);
/*************************************************************************************
 * TEST
 */
//const answer: number = Employee.myStaticMethod(); // 42
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Conexión a la BD
    yield mongoose_1.default.connect(config_1.DB_CONNECTION_STRING);
    if (!mongoose_1.default.connection.db) {
        console.log(`No se pudo conectar con la base de datos '${config_1.DB_CONNECTION_STRING}'.`);
        return;
    }
    console.log(`Conectado a la base de datos '${config_1.DB_CONNECTION_STRING}'.`);
    // Obtener o crear empresa
    let empresa = yield Empresa_1.EmpresaModel.findOne({ nombre: 'Rumbex SRL' });
    if (!empresa) {
        empresa = yield Empresa_1.EmpresaModel.create({ nombre: 'Rumbex SRL' });
        console.log("Empresa creada!");
    }
    else
        console.log("Empresa encontrada!");
    // Obtener o crear empleado
    let empleado = yield Empleado_1.EmpleadoModel.findOne({ nombre: 'drumbo' });
    if (!empleado) {
        empleado = new Empleado_1.EmpleadoModel({ nombre: 'drumbo', salario: 200000 });
        yield empleado.save();
        console.log("Empleado creado.");
    }
    else
        console.log("Empleado encontrado!");
    // Asignación de empleado a empresa
    if (!empleado.empresa) {
        yield empresa.nuevoEmpleado(empleado);
        console.log("Empleado asignado a empresa.");
    }
    else
        console.log("El empleado ya pertenece a la empresa!");
    empleado.fooPersona();
    empleado.fooEmpleado(); // <-- no dice fooEmpleado (!)
    // FIN
    console.log({ empresa, empleado });
}))();
