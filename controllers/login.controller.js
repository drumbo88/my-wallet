import jwt from 'jsonwebtoken'

// Import Models
//import User from '../models/user.js'

export const logInUser = (req, res) => {
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
