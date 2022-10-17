import jwt from 'jsonwebtoken'
import { JWT_KEY, SESSION_TIME } from '../config'

// Import Models
//import User from '../models/user'

export const logInUser = (req, res) => {
    const envMode = req.app.get('env').trim()
    switch (envMode) {
        case 'production': case 'development': case 'test':
            return res.json({
                message: "Auth successful",
                token: jwt.sign(
                    { envMode },
                    JWT_KEY,
                    { expiresIn: SESSION_TIME }
                )
            })
        default:
            throw new Error(`Invalid enviroment mode ${envMode}`)
    }
}
