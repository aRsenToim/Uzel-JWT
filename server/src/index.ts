import express, { Request, Response } from "express";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import UsersRoutes from "./routes/UsersRoutes.js";
import fileUpload from 'express-fileupload'

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(
    cors({
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json()); 


app.use("/api/auth", authRoutes)
app.use('/api/users', UsersRoutes)
app.use(fileUpload({}))
app.use(express.static('static'))

app.listen(PORT, (err) => console.log(`Server: http://localhost:${PORT}`));