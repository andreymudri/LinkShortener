import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";
import { GetUserME } from "../controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.get("/users/me", authenticateToken, GetUserME);

export default UserRoute;
