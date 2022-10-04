import mongoose from 'mongoose'
import { dbInit } from './database.js'
import { DB_RESET } from './config.js'

const models = [
    'country',
    'currency',
    'company',
    'person',
    'transactionConcept',
    'transaction',
]

dbInit()
.then(async db => {
    if (DB_RESET) {
        await mongoose.reset()
    }
    for (const modelName of models) {
        const { model } = await import(`./models/${modelName}.js`)
        await model.seed()
    }
    db.connections[0].client.close()
        .catch(err => console.error(err))
        .finally(() => console.log("\x1b[32mSeeding completed!\x1b[0m"))
})
.catch(err => console.error(err))
