import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const PAGE_SIZE = 10;

class UsersController {
    async getUsers(req: Request, res: Response) {
        try {
            let page: number = Number(req.query.page);

            if (!page) page = 1

            const users = await prisma.user.findMany({
                skip: PAGE_SIZE * (+page - 1),
                take: PAGE_SIZE,
                select: { id: true, name: true, email: true, role: true, image: true },
            })
            const countUser = await prisma.user.count()

            res.status(200).json({
                users,
                page,
                totalPages: Math.ceil(countUser / PAGE_SIZE),
                total: countUser,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new UsersController();