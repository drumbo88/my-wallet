const express = require('express')
const router = express.Router()
const { logInUser } = require('../controllers/login.controller')

router.get('/', (req, res) => {
    res.json({ message: 'API Working' })
})
router.post('/login', logInUser)

module.exports = router