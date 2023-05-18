import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
});

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
