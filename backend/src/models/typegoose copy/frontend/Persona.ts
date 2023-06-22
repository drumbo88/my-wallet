import { ReturnModelType } from "@typegoose/typegoose";
import { Persona, IPersona } from "../common/Persona";

// Frontend class
export class PersonaFrontend extends Persona implements IPersona {

    //nuevoEmpleado(this: ReturnModelType<typeof PersonaFrontend>, e: Empleado) {
    // public async nuevoEmpleado(this: PersonaFrontend, empleado: EmpleadoFrontend): Promise<void> {
    //     //empleado.persona = this.id
    //     //await empleado.save()
    // }
    particularImplementation() {
        console.log(this.nombre)
    }
    static async getByNombre(this: ReturnModelType<typeof PersonaFrontend>, nombre: string): Promise<IPersona | null> {
        return await fetch(`api/persona/${nombre}`)
            .then(res => res.json())
    }
}
