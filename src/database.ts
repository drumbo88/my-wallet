import mongoose from 'mongoose'
import { NODE_ENV, DB_RESET, DB_CONNECTION_TIMEOUT, DB_CONNECTION_STRING } from './config.js'

mongoose.seed = async function () {
    const seeds = this.seeds()
    if (seeds?.length && !await this.estimatedDocumentCount()) {
        console.log(`Seeding ${seeds.length} of ${this.modelName}...`)
        if (this.seeder) {
            for (const seed of seeds)
                await this.seeder(seed)
            /*const seederPromises = []
            for (const seed of seeds)
                seederPromises.push(this.seeder(seed))
            await Promise.all(seederPromises)*/
        }
        else {
            await this.insertMany(seeds)
        }
    }
    else console.log(`No need to seed ${this.modelName}.`)
}
mongoose.reset = async function () {
    console.log('Reseting the database...')
    const db = this.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Create an array of collection names and drop each collection
    await Promise.all(collections
      .map((collection) => {
        const collectionName = collection.name
        return db.dropCollection(collectionName)
      })
    ).then(() => {
        console.log('All collections were dropped!')
    }).catch(err => {
        console.error(err)
    })
}

console.log({NODE_ENV,DB_RESET})
export const dbInit = async () => {
    // Las opciones useNewUrlParser, useUnifiedTopology y useFindAndModify nos ahorrarán advertencias en consola (ni idea pa qué son).
    console.log('Connecting to the database...')
    return new Promise((resolve, reject) => {
        const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS : DB_CONNECTION_TIMEOUT }
        mongoose.connect(DB_CONNECTION_STRING, connectOptions)
        .then(
            async db => {
                console.log(`DB connected using ${DB_CONNECTION_STRING}`);
                resolve(db)
            },
            error => reject(`Couldn't connect to DB: ${error.message}`)
        )
    })

}
