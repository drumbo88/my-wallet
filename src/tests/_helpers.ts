import { app } from '../index'
import supertest from 'supertest'
import mongoose from 'mongoose'

let api = null, server = null

describe('init::app', async () => {
    console.log('INIT_TEST')
    let server = await app.listen(4000) //await startServer()
    let request = await supertest.agent(server);
    console.log('###---')

    beforeAll(async () => {
        console.log('AAA')
        //server = await app.listen(4000) //await startServer()
        console.log('BBB')
        //request = await supertest.agent(server);
        console.log('CCC')
    })

    test('Server init', () => {
        request.get('/').expect(200)
    })

    afterAll(() => {
        mongoose.connection.close()
        server.close()
        console.log('END_APP')
    })

})

const initVars = [] // ...

module.exports = { api, initVars }