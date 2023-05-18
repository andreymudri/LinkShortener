import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const UrlRoute = express.Router();

UrlRoute.post("/urls/shorten",authenticateToken);
UrlRoute.get("/urls/:id");
UrlRoute.get("/urls/open/:shortUrl");
UrlRoute.delete("/urls/:id",authenticateToken);

export default UrlRoute;
