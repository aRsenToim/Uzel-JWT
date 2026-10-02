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

/**
 * @openapi
 * /auth/regist:
 *   post:
 *     tags: [Auth]
 *     summary: Регистрация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: anna@example.com
 *               name:
 *                 type: string
 *                 example: Анна
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Не хватает полей или пароль короче 8 символов
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email уже зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.post('/regist', authLimiter, AuthController.regist)

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Вход пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Неверный email или пароль
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.post('/login', authLimiter, AuthController.login)

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Обновление access-токена по refresh-cookie
 *     responses:
 *       200:
 *         description: Новый access-токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Невалидный или истёкший refresh-токен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.post('/refresh', AuthController.refresh)

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Текущий авторизованный пользователь
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Нет или невалиден access-токен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.get('/me', AuthMiddleware, AuthController.auth)

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Выход (очистка refresh-cookie)
 *     responses:
 *       204:
 *         description: Успешный выход
 */
authRoutes.post('/logout', AuthController.logout)

/**
 * @openapi
 * /auth/verifiedUser:
 *   post:
 *     tags: [Auth]
 *     summary: Подтверждение email по коду
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 example: "483920"
 *     responses:
 *       200:
 *         description: Email подтверждён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Неверный или истёкший код
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.post('/verifiedUser', AuthMiddleware, AuthController.verifyUser)

/**
 * @openapi
 * /auth/sendVerifyUser:
 *   post:
 *     tags: [Auth]
 *     summary: Отправить новый код подтверждения на почту
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Код отправлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Ошибка
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRoutes.post('/sendVerifyUser', AuthMiddleware, AuthController.sendVerifyCode)

export default authRoutes