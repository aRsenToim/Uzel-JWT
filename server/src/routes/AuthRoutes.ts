import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import rateLimit from "express-rate-limit";


const authRoutes = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Слишком много попыток, попробуйте позже" },
})

authRoutes.post('/regist', authLimiter, AuthController.regist)
authRoutes.post('/login', authLimiter, AuthController.login)
authRoutes.post('/refresh', AuthController.refresh)
authRoutes.get('/me', AuthMiddleware, AuthController.auth)
authRoutes.post('/logout', AuthController.logout)

export default authRoutes