import { app } from '../index.js'

import mongoose from 'mongoose'
import supertest from 'supertest'

const server = app.listen()
const api = supertest.agent(server)

describe('Init API and App', () => {

    test('Should send API Working message at GET /', async () => {
        await api.get('/api').expect((res) => {
            expect(res.body.message).toContain("API Working")
            expect(res.statusCode).toBe(200)
            expect(res.type).toMatch(/application\/json/)
        })
    })

    /*test('Should send ReactApp with 200 status code at GET /api ', async () => {
        await api.get('/').expect((res) => {
            expect(res.text).toContain("<div id=\"app\"")
            expect(res.statusCode).toBe(200)
            expect(res.type).toMatch(/text\/html/)
        })
    })*/
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})