import supertest from 'supertest'
import app from '../app'

export default supertest.agent(app)