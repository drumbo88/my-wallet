import mongoose from 'mongoose'
import { dbInit, dbReset, dbSeed } from './database.js'
import { DB_RESET } from './config.js'
import models from './models'

const seedModels = [
    'Currency', 'Country',
    'Entity',
    //'Company', 'Person',
    //'Asset', 'OperationConcept',
    'PaymentCard',
    'Operation',
    'Transaction',
]

dbInit()
.then(async () => {
    //const db = mongoose.connection.db
    if (DB_RESET) {
        await dbReset()
    }
    for (const modelName of seedModels) {
        if (models[modelName]) {
            const { model, seeds } = models[modelName]
            await dbSeed(model, seeds)
        }
        else {
            console.log(`❌ Model ${modelName} has to be imported in 'models/index.ts'.`)
        }
    }
    mongoose.connections[0].close()
        .catch(err => console.error(err))
        .finally(() => console.log("\x1b[32mSeeding completed!\x1b[0m"))
})
.catch(err => console.error(err))
