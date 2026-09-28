import type { AccessPayload } from "../services/tokens.js";

declare global {
    namespace Express {
        interface Request {
            user?: AccessPayload;
        }
    }
}

export {};