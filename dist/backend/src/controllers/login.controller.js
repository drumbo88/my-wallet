"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Import Models
//import User from '../models/user.js'
const logInUser = (req, res) => {
    const envMode = req.app.get('env').trim();
    switch (envMode) {
        case 'production':
        case 'development':
        case 'test':
            return res.json({
                message: "Auth successful",
                token: jsonwebtoken_1.default.sign({ envMode }, process.env.JWT_KEY, { expiresIn: process.env.SESSION_TIME })
            });
        default:
            throw new Error(`Invalid enviroment mode ${envMode}`);
    }
};
exports.logInUser = logInUser;
