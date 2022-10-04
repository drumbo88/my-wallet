import { app } from '../index.js'
import mongoose from 'mongoose'
import supertest from 'supertest'

const server = app.listen()
const api = supertest.agent(server)

describe('Authorization', () => {

    test('Should send status code 200 and token on valid authentication', async () => {
        const { body, type, statusCode } = await api.post('/api/login').send()
        expect(Object.keys(body)).toEqual(expect.arrayContaining(['message','token']))
        expect(body.message).toContain("Auth successful")
        expect(statusCode).toBe(200)
    })

    test('Should send status code 403 from protected API route with no valid token', async () => {
        const { text, statusCode } = await api.get('/api/country').send()

        expect(text).toContain("Auth failed")
        expect(statusCode).toBe(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})