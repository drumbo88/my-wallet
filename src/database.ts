import mongoose, { Model } from 'mongoose'
import { NODE_ENV, DB_RESET, DB_CONNECTION_TIMEOUT, DB_CONNECTION_STRING } from './config.js'

export interface IModel {
    seed?(seeds): Promise<void>
}
type MyModel<T> = IModel & Model<T>;

export const dbSeed = async function <T>(model: MyModel<T>, seeds) {
    //const seeds = [] //model.seeds()
    const count = await model.estimatedDocumentCount()
    if (seeds?.length && !count) {
        let seeder
        if (typeof model.seed == 'undefined') {
            console.log(`🌱 Seeding ${seeds.length} of ${model.modelName}...`)
            seeder = async (seeds) => await model.insertMany(seeds)
        }
        else {
            console.log(`🌱 Seeding ${seeds.length} of ${model.modelName} using seeder...`)
            seeder = async (seeds) => await model.seed?.(seeds)
        }
        try {
            await seeder(seeds)
        }
        catch (error) {
            console.log(`    ❌ ${error}`)
        }
    }
    else if (!seeds || !seeds.length) {
        console.log(` ℹ Nothing to seed of ${model.modelName}.`)
    }
    else {
        console.log(` ℹ No need to seed ${model.modelName} (${count} existing documents).`)
    }
}

export const dbReset = async function () {

    console.log('💣 Dropping the database...')
    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    await Promise.all(collections
      .map((collection) => {
        const collectionName = collection.name
        return db.dropCollection(collectionName)
      })
    ).then(() => {
        console.log(' ✔ All collections were dropped!')
    }).catch(err => {
        console.error(err)
    })
}

console.log({NODE_ENV,DB_RESET})
export const dbInit = async () => {
    // Las opciones useNewUrlParser, useUnifiedTopology y useFindAndModify nos ahorrarán advertencias en consola (ni idea pa qué son).
    console.log('Connecting to the database...')
    return new Promise((resolve, reject) => {
        const connectOptions = {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //serverSelectionTimeoutMS : DB_CONNECTION_TIMEOUT
        }
        return mongoose.connect(DB_CONNECTION_STRING, connectOptions)
        .then(
            async db => {
                console.log(`DB connected using ${DB_CONNECTION_STRING}`);
                resolve(db)
            },
            error => reject(`Couldn't connect to DB: ${error.message}`)
        )
    })

}
