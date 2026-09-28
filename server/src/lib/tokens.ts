import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { randomUUID } from "node:crypto";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_TTL: SignOptions["expiresIn"] = "15m";
const REFRESH_TTL: SignOptions["expiresIn"] = "7d";

export type UserRole = "USER" | "ADMIN";

export interface AccessPayload {
    sub: string;
    role: UserRole;
}

export interface RefreshPayload {
    sub: string;
    jti: string;
}

class TokenService {
    generateAccessToken(user: { id: number; role: UserRole }): string {
        return jwt.sign(
            { role: user.role, type: "access" },
            ACCESS_SECRET!,
            { subject: String(user.id), expiresIn: ACCESS_TTL, algorithm: "HS256" }
        );  
    }

    generateRefreshToken(user: { id: number }): string {
        return jwt.sign(
            { type: "refresh" },
            REFRESH_SECRET!,
            {
                subject: String(user.id),
                jwtid: randomUUID(),
                expiresIn: REFRESH_TTL,
                algorithm: "HS256",
            }
        );
    }

    generateTokens(user: { id: number; role: UserRole }) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
        };
    }

    verifyAccessToken(token: string): AccessPayload | null {
        try {
            const payload = jwt.verify(token, ACCESS_SECRET!, {
                algorithms: ["HS256"],
            });

            if (
                typeof payload === "string" ||
                payload.type !== "access" ||
                !payload.sub
            ) {
                return null;
            }

            return { sub: payload.sub, role: payload.role as UserRole };
        } catch {
            return null; // просрочен, подделан, неверный формат
        }
    }

    verifyRefreshToken(token: string): RefreshPayload | null {
        try {
            const payload = jwt.verify(token, REFRESH_SECRET!, {
                algorithms: ["HS256"],
            });

            if (
                typeof payload === "string" ||
                payload.type !== "refresh" ||
                !payload.sub ||
                !payload.jti
            ) {
                return null;
            }

            return { sub: payload.sub, jti: payload.jti };
        } catch {
            return null;
        }
    }
}

export default new TokenService();