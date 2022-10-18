import api from './supertestAgent'

describe('Authorization', () => {

    test('UserLogin (/api/login): Should send status code 200 and token on valid authentication', async () => {
        const { body, type, statusCode } = await api.post('/api/login').send()
        expect(Object.keys(body)).toEqual(expect.arrayContaining(['message','token']))
        expect(body.message).toContain("Auth successful")
        expect(statusCode).toBe(200)
    })

    test('ProtectedRoute: Should send status code 403 if no valid auth token', async () => {
        const { text, statusCode } = await api.get('/api/country').send()

        expect(text).toContain("Auth failed")
        expect(statusCode).toBe(401)
    })
})