import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config';

// Authentication check Middleware
export default (req, res, next) => {
    try {
        // Get authorization header token
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]
        if (!token)
            throw new Error("You need to be logged in.")

        // Verify recieved token
        req.userData = jwt.verify(token, JWT_KEY)
        next()
    }
    catch (error: any) {
        return res.status(401).json({
            message: 'Auth failed: '+error.message
        })
    }
}