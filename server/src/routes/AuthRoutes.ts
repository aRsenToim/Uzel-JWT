import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";


const authRoutes = Router();

authRoutes.post('/regist', AuthController.regist)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/refresh', AuthController.refresh)
authRoutes.get('/me', AuthMiddleware, AuthController.auth)
authRoutes.post('/logout', AuthController.logout)

export default authRoutes