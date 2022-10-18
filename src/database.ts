import { NODE_ENV, DB_DNS, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_RESET, DB_CONNECTION_TIMEOUT, DB_CONNECTION_STRING } from './config'
import { BaseEntity, DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm"
import { EntityAbstract } from './entity/EntityInterface'
import { Currency } from './entity/Currency'

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: DB_DNS,
    port: DB_PORT,
    //username: DB_USER,
    //password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + "/entity/*.js"],
    useUnifiedTopology: true,
})

export const seed = async (entity: any, seeds: Object[]): Promise<EntityAbstract[]> => {
    const tableName = entity.prototype.constructor.name
    if (seeds.length && !await entity.count())
    {
        console.log(`Seeding ${seeds.length} of ${tableName}...`)

        const seederPromises: Promise<EntityAbstract>[] = []
        for (const seed of seeds) {
            seederPromises.push((await entity.init(seed)).save());
        }
        return await Promise.all(seederPromises)
    }
    else {
        console.log(`No need to seed ${tableName}.`)
        return []
    }
}
export const reset = async function () {
    console.log('Dropping the database...')

    AppDataSource.dropDatabase().then(() => {
        console.log('All collections were dropped!')
    }).catch(err => {
        console.error(err)
    })
}

//console.log({NODE_ENV,DB_RESET})
export const connect = async (): Promise<DataSource> => {
    //console.log('Connecting to the database...')
    return new Promise((resolve, reject) => {
        AppDataSource.initialize()
        .then(db => {
            //console.log("DS initialized!")
            resolve(db)
        })
        .catch((error) => {
            reject(`Couldn't initialize DS: ${error.stack}`)
        })
    })
}
export const close = async (): Promise<void> => {
    //console.log('Disconnecting database...')

    AppDataSource.destroy()
        .then(() => false/*console.log("DS disconnected!")*/)
        .catch((error) => false/*console.error(`Couldn't disconnect DS: ${error.stack}`)*/)
}
