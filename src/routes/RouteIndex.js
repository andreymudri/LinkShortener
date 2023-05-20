import express from "express";
import AuthRoute from "./AuthRoute.js";
import UrlRoute from "./UrlsRoute.js";

const router = express.Router();
router.use(AuthRoute);
router.use(UrlRoute);

export default router;
