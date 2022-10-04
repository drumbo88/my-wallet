import express from 'express'
const router = express.Router()
import { logInUser } from '../controllers/login.controller.js'

router.get('/', (req, res) => {
    res.json({ message: 'API Working' })
})
router.post('/login', logInUser)

export default router