"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Authentication check Middleware
exports.default = (req, res, next) => {
    try {
        // Get authorization header token
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token)
            throw new Error("You need to be logged in.");
        // Verify recieved token
        req.userData = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed: ' + error.message
        });
    }
};
