import express from "express";
import { GetRanking } from "../controllers/RankingController.js";

const RankRoute = express.Router();

RankRoute.get("/ranking", GetRanking);

export default RankRoute;
