import express from "express";
import AuthRoute from "./AuthRoute.js";
import UrlRoute from "./UrlsRoute.js";
import UserRoute from "./UserRoute.js";
import RankRoute from "./RankingRoute.js";

const router = express.Router();
router.use(AuthRoute);
router.use(UrlRoute);
router.use(UserRoute);
router.use(RankRoute);
export default router;
