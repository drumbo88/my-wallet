import { BaseEntity } from "typeorm"
import { AppDataSource as ds } from "../database"

/*export interface EntityInterface {
    init<T>(data: any): Promise<T>
}*/
export abstract class EntityAbstract extends BaseEntity {
    static async init(this: new (someVar: any) => EntityAbstract, data: any = {}): Promise<EntityAbstract> {
        return new this(data)
    }
    static async seed<T extends EntityAbstract>(this: T, seed: any = {}): Promise<EntityAbstract> {
        return await this//.init(seed).save()
    }
    /*save() {
        return ds.getRepository(this.constructor).save(this)
    }*/
}
// Person extends EntityAbstract
// Quiero Person.seed() { this<Person>.init().save() }