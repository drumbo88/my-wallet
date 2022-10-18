require('ts-node/register')

// Typescript modules to transpile
const api = require('./setup')

module.exports = async () => await api()
