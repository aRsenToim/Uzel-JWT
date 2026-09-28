import type { NextFunction, Request, Response } from "express";
import tokens from "../lib/tokens.js";


export default function(req: Request, res: Response, next: NextFunction){
    const header = req.headers.authorization;

    if (!header) {
        res.status(401).json({ error: "Authorization header is missing" });
        return;
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        res.status(401).json({ error: "Invalid authorization format" });
        return;
    }

    const payload = tokens.verifyAccessToken(token);

    if (!payload) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }

    req.user = {
        id: Number(payload.sub),
        role: payload.role as string,
    };
    next();
}