import { Router } from "express";
import UsersController from "../controllers/UsersController.js";




const UsersRoutes = Router();


UsersRoutes.get('/', UsersController.getUsers)


export default UsersRoutes