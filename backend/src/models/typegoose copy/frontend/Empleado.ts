import { ReturnModelType } from "@typegoose/typegoose";
import { Empleado, IEmpleado } from "../common/Empleado";
import { IEmpresa, IEmpresaProps } from "../common/Empresa";
import { EmpresaFrontend } from "./Empresa";

// Frontend class
export class EmpleadoFrontend extends Empleado implements IEmpleado {

    nombre: string;
    edad: number;
    salario: number;
    empresa: IEmpresa;

    //nuevoEmpleado(this: ReturnModelType<typeof EmpresaFrontend>, e: Empleado) {
    public async nuevoEmpleado(this: EmpleadoFrontend, empleado: EmpleadoFrontend): Promise<void> {
        //empleado.empresa = this.id
        //await empleado.save()
    }
    particularImplementation(this: EmpleadoFrontend) {
        console.log(this.nombre)
    }
    static async getByNombre(this: ReturnModelType<typeof EmpleadoFrontend>, nombre: string): Promise<IEmpleado | null> {
        return await fetch(`api/empleado/${nombre}`)
            .then(res => res.json())
    }
}
