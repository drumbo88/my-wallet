import api from './supertestAgent'

describe('Init API and App', () => {

    test('GET /: Should send API Working message', async () => {
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
