require('ts-node/register')

// Typescript modules to transpile
const { close } = require('./teardown')

module.exports = async () => {
    await close()
}
