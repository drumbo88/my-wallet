const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const { DB_URI, DB_URI_TEST, NODE_ENV, DB_CONNECTION_TIMEOUT = 1000 } = process.env
const connString = NODE_ENV == 'test' ? DB_URI_TEST : DB_URI

mongoose.seed = async function () {
    const seeds = this.seeds()
    if (seeds && seeds.length && !await this.estimatedDocumentCount()) {
        console.log(`Seeding ${this.modelName}...`)
        await this.insertMany(seeds)
    }
    else console.log(`No need to seed ${this.modelName}.`)
}

const dbInit = async () => {
    // Las opciones useNewUrlParser, useUnifiedTopology y useFindAndModify nos ahorrarán advertencias en consola (ni idea pa qué son).
    console.log('Conectando a la BD...')

    return new Promise((resolve, reject) => {
        connectOptions = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS : DB_CONNECTION_TIMEOUT }
        mongoose.connect(DB_URI, connectOptions)
        .then(
            db => { console.log("DB is connected"); resolve(db) },
            error => reject(`Error: ${error.message}`)
        )
    })
    
}

module.exports = { connString, dbInit }