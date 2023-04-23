import mongoose, { Document } from 'mongoose'
import { NODE_ENV, DB_RESET, DB_CONNECTION_TIMEOUT, DB_CONNECTION_STRING, DB_PORT } from './config.js'
import { MyModel } from './types.js'

mongoose.set('strictQuery', false)

export const defaultSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true, getters: true },
    versionKey: false
}

export const dbSeed = async function <T extends Document>(model: MyModel<T>, modelSeeds: Object|Object[]) {
    //const seeds = [] //model.seeds()
    const count = await model.estimatedDocumentCount()
    const abstractSchema = !(modelSeeds instanceof Array)
    let seedsByType = abstractSchema ? modelSeeds : { modelSeeds }

    for (let i in seedsByType) {
        let seeds = seedsByType[i]
        const modelName = model.modelName + (abstractSchema ? '.' + i : '')
        if (seeds?.length && !count) {
            let seeder
            if (abstractSchema) {
                seeds.forEach(x => { if (!x.hasOwnProperty(i)) x[i] = {} })
                //console.log(seeds)
            }
                //console.log({myModel: model instanceof MyModel, model, seed:model.seed})
            if (!model.seed) {
                console.log(`🌱 Seeding ${seeds.length} of ${modelName}...`)
                seeder = async (seeds) => await model.insertMany(seeds)
            }
            else {
                console.log(`🌱 Seeding ${seeds.length} of ${modelName} using seeder...`)
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
            console.log(` ℹ Nothing to seed of ${modelName}.`)
        }
        else {
            console.log(` ℹ No need to seed ${modelName} (${count} existing documents).`)
        }
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
    console.log(`Connecting to MongoDB on port ${DB_PORT}...`)
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
