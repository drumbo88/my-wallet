const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

// ----- Settings -----
dotenv.config() // Copies .env to process.env

const {
    // PORT = 5000,
    NODE_ENV = "develpoment",
    POST_MAX_SIZE = "30mb",
} = process.env

const PORT = NODE_ENV == "test" 
    ? (process.env.API_PORT_TEST || 5001)
    : (process.env.API_PORT || 5000)
//const POST_MAX_SIZE = process.env.POST_MAX_SIZE || "30mb"

// ----- Middlewares -----
app.use(bodyParser.json({limit: POST_MAX_SIZE, extended: true}))
app.use(bodyParser.urlencoded({limit: POST_MAX_SIZE, extended: true}))

app.use(express.json())
app.use(cors()) // <- antes de las rutas 

// ----- Routes -----
app.use('/api', require('./routes/root.routes'))
app.use('/api/incomes', require('./routes/incomes.routes'))

// Error de ruta
app.use('/', (req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
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
const { dbInit, connStirng } = require('./database')

const server = (NODE_ENV == 'test') 
    ? null 
    : app.listen(PORT, () => {
        if (connStirng) {
            dbInit()
                .then(db => console.log(db))
                .catch(err => console.error(err))
        }
        console.log(`Server online on port ${PORT}`)    
    })

module.exports = { app, server }
