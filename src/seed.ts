import 'reflect-metadata'
import * as database from './database'
import { DB_RESET } from './config'

const models = [
    'Currency',
    'Country',
    'Company',
    'Person',
    /*'Operation',*/
]

database.connect()
    .then(async ds => {
        if (DB_RESET) {
            await database.reset()
        }
        for (const modelName of models) {
            const entity = await import(`./entity/${modelName}`) //as EntityAbstract
            const seeds = entity[modelName].seeds || []
            if (seeds.length) {
                await Promise.all(await database.seed(entity[modelName], seeds))
                //await database.seed(ds.getRepository(entity[modelName]), seeds)
            }
        }
        ds.destroy()
            .catch(err => console.error(err))
            .finally(() => console.log("\x1b[32mSeeding completed!\x1b[0m"))
    })
    .catch(err => console.error(err))
