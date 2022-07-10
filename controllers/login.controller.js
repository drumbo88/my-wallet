const jwt = require('jsonwebtoken')

// Import Models
const User = require('../models/user')

exports.logInUser = (req, res) => {
    const envMode = req.app.get('env').trim()
    switch (envMode) {
        case 'production': case 'development': case 'test':
            return res.json({
                message: "Auth successful",
                token: jwt.sign(
                    { envMode },
                    process.env.JWT_KEY,
                    { expiresIn: process.env.SESSION_TIME }
                )
            })
        default:
            throw new Error(`Invalid enviroment mode ${envMode}`)
    }
}
