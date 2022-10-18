import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import cors from 'cors'

import routesRoot from './routes/root.routes'
import routesPerson from './routes/person.routes'
import routesCurrency from './routes/currency.routes'
import routesCountry from './routes/country.routes'
import routesTransaction from './routes/transaction.routes'

import * as config from './config'

// ----- Settings -----
//const POST_MAX_SIZE = process.env.POST_MAX_SIZE || "30mb"

// ----- Middlewares -----
app.use(bodyParser.json({limit: config.POST_MAX_SIZE }))
app.use(bodyParser.urlencoded({limit: config.POST_MAX_SIZE, extended: true}))

app.use(express.json())
app.use(cors()) // <- antes de las rutas

// ----- Routes -----
app.use('/api', routesRoot)
app.use('/api/person', routesPerson)
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

export default app
