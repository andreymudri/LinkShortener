import express from "express";
import AuthRoute from "./AuthRoute.js";

const router = express.Router();
router.use(AuthRoute);

export default router;
