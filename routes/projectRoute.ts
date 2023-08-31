import { Router } from "express";
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from "../controller/projectController";

const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", createProject);
projectRouter.put("/:id", editProject);
projectRouter.delete("/:id", deleteProject);

export { projectRouter };
