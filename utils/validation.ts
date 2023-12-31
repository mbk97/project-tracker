import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string().min(11).max(11).required(),
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

export const createTaskSchema = Joi.object({
  taskName: Joi.string().min(3).max(50).required(),
  taskDescription: Joi.string().min(3).required(),
  taskComment: Joi.string().required(),
  taskStartDate: Joi.date().required(),
  taskEndDate: Joi.date().required(),
  taskStatus: Joi.string().required(),
  projectId: Joi.string().required(),
  projectName: Joi.string().min(3).max(50).required(),
});
