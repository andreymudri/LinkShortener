import express from "express";
import validateRequestBody from "../middlewares/SchemaMiddleware.js";
import { signInSchema, signUpSchema } from "../schemas/AuthSchemas.js";
import { signIn, signUp } from "../controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", validateRequestBody(signUpSchema), signUp);
AuthRoute.post("/signin", validateRequestBody(signInSchema), signIn);

export default AuthRoute;
