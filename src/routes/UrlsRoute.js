import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";
import validateRequestBody from "../middlewares/SchemaMiddleware.js";
import { shortenUrlSchema } from "../schemas/UrlsSchema.js";
import {
  getShortUrl,
  getUrlbyID,
  postUrlShortener,
} from "../controllers/UrlsController.js";

const UrlRoute = express.Router();

UrlRoute.post(
  "/urls/shorten",
  authenticateToken,
  validateRequestBody(shortenUrlSchema),
  postUrlShortener
);
UrlRoute.get("/urls/:id", getUrlbyID);
UrlRoute.get("/urls/open/:shortUrl", getShortUrl);
UrlRoute.delete("/urls/:id", authenticateToken);

export default UrlRoute;
