import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
import tokens from "../lib/tokens.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? ("strict" as const) : ("lax" as const),
    path: "/",
};

function publicUser(user: { id: number; name: string; email: string; role: string, image: string, status: string }) {
    return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image, status: user.status };
}
function setRefreshCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

class AuthController {
    async regist(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body as {
                email?: string;
                password?: string;
                name?: string;
            }
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required" });
                return;
            }

            if (typeof password !== "string" || password.length < 8) {
                res.status(400).json({ error: "Password must be at least 8 characters" });
                return;
            }

            const candidate = await prisma.user.findUnique({
                where: { email }
            })
            if (candidate) {
                res.status(409).json({ error: "Email already registered" });
                return;
            }


            const passwordHash = await bcrypt.hash(password, 12)
            const user = await prisma.user.create({
                data: {
                    email,
                    image: "http://localhost:3003/pidor.png",
                    status: "LGBT+",
                    name: name ?? "pidoras",
                    passwordHash,
                }
            })

            const { accessToken, refreshToken } = tokens.generateTokens({ id: user.id, role: user.role });

            setRefreshCookie(res, refreshToken);
            res.status(201).json({
                accessToken,
                user: publicUser(user)
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async auth(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user.id }
            })

            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json({ user: publicUser(user) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body as {
                email?: string;
                password?: string;
            }

            if (!email || !password || typeof password !== "string") {
                res.status(400).json({ error: "Email and password are required" });
                return;
            }

            const user = await prisma.user.findUnique({ where: { email } });

            const isValid = user ? await bcrypt.compare(password, user.passwordHash) : false;
            if (!user || !isValid) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }

            const { accessToken, refreshToken } = tokens.generateTokens(user);

            setRefreshCookie(res, refreshToken);
            res.json({ accessToken, user: publicUser(user) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }

    }

    async refresh(req: Request, res: Response) {
        try {
            const token = req.cookies?.["refreshToken"];
            const payload = token ? tokens.verifyRefreshToken(token) : null;

            if (!payload) {
                res.status(401).json({ error: "Invalid refresh token" });
                return;
            }

            const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
            if (!user) {
                res.status(401).json({ error: "User not found" });
                return;
            }

            const { accessToken, refreshToken } = tokens.generateTokens(user);
            setRefreshCookie(res, refreshToken);

            res.json({ accessToken });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", cookieOptions)
            res.status(204).send()
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}


export default new AuthController();