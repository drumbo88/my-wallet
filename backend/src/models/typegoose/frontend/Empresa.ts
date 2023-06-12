import { ReturnModelType } from "@typegoose/typegoose";
import { Empresa, IEmpresa } from "../common/Empresa";
import { EmpleadoFrontend } from "./Empleado";

// Frontend class
export class EmpresaFrontend extends Empresa implements IEmpresa {

    nombre: string;
    taxNumber: string;

    //nuevoEmpleado(this: ReturnModelType<typeof EmpresaFrontend>, e: Empleado) {
    public async nuevoEmpleado(this: EmpresaFrontend, empleado: EmpleadoFrontend): Promise<void> {
        //empleado.empresa = this.id
        //await empleado.save()
    }
    particularImplementation(this: EmpresaFrontend) {
        console.log(this.nombre)
    }
    static async getByNombre(this: ReturnModelType<typeof EmpresaFrontend>, nombre: string): Promise<IEmpresa | null> {
        return await fetch(`api/empresa/${nombre}`)
            .then(res => res.json())
    }
}
