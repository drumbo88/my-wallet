import server from '../server'
import supertest from 'supertest'
import * as database from '../database'

let api = null

describe('init::app', async () => {
    console.log('INIT_TEST')
    //let server = await app.listen(4000) //await startServer()
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
        server.close(() => database.close())
    })

})

const initVars = [] // ...

module.exports = { api, initVars }