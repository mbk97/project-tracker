import { Router } from "express";
import {
  createProject,
  deleteProject,
  editProject,
  allProjectProgress,
  getProjects,
  searchProject,
} from "../controller/projectController";

const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/progress/:id", allProjectProgress);
projectRouter.get("/searchProject", searchProject);
projectRouter.post("/", createProject);
projectRouter.put("/:id", editProject);
projectRouter.delete("/:id", deleteProject);

export { projectRouter };
