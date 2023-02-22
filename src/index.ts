import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import cors from 'cors'

import routesRoot from './routes/root.routes.js'
import routesPerson from './routes/person.routes.js'
import routesIncome from './routes/income.routes.js'
import routesCurrency from './routes/currency.routes.js'
import routesCountry from './routes/country.routes.js'
import routesTransaction from './routes/transaction.routes.js'

import * as config from './config.js'
import { dbInit } from './database.js'

// ----- Settings -----
const PORT = config.NODE_ENV == "test"
    ? (config.API_PORT_TEST || 5001)
    : (config.API_PORT || 5000)
//const POST_MAX_SIZE = process.env.POST_MAX_SIZE || "30mb"

// ----- Middlewares -----
app.use(bodyParser.json({limit: config.POST_MAX_SIZE }))
app.use(bodyParser.urlencoded({limit: config.POST_MAX_SIZE, extended: true}))

app.use(express.json())
app.use(cors()) // <- antes de las rutas

// ----- Routes -----
app.use('/api', routesRoot)
app.use('/api/person', routesPerson)
app.use('/api/income', routesIncome)
app.use('/api/currency', routesCurrency)
app.use('/api/country', routesCountry)
app.use('/api/transaction', routesTransaction)

// Error de ruta
app.use('/', (req, res, next) => {
    //const error = new Error('Route not found')
    res.statusCode = 404
    next()
})

// Errors handler
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    let message = (res.statusCode >= 500 && res.statusCode < 600)
        ? 'Internal error'
        : 'Error'
    res.json({
        error: {
            message: message + (error.message ? `: ${error.message}` : '')
        }
    })
    //throw error
})

// ----- Static files -----
//app.use(express.static(path.join(__dirname, 'public')))

// ########## Starting the server ##########
const server = (config.NODE_ENV == 'test')
    ? null
    : app.listen(config.API_PORT, () => {
        if (config.DB_CONNECTION_STRING) {
            dbInit()
                .catch(err => console.error(err))
        }
        console.log(`API Server online on port ${config.API_PORT}`)
    })

export { app, server }
