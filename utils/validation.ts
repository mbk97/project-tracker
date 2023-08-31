import Joi from "joi";
export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).required(),
});

export const createNoteSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().required(),
  archived: Joi.boolean(),
});

export const createProjectSchema = Joi.object({
  projectName: Joi.string().min(3).max(50).required(),
  projectDescription: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  status: Joi.string().required(),
});
