const { dbInit } = require('./database')

const models = [
    'country',
    'currency',
    'transactionConcept',
]

dbInit()
    .then(async db => {
        for (const modelName of models) {
            await require('./models/'+modelName).seed()
        }
        db.connections[0].client.close()
            .catch(err => console.err(err))
            .finally(() => console.log("\x1b[32mDone!\x1b[0m"))
    })
    .catch(err => console.error(err))
