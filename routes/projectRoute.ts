import { Router } from "express";
import {
  createProject,
  deleteProject,
  editProject,
  allProjectProgress,
  getProjects,
  searchProject,
} from "../controller/projectController";
import { protect } from "../auth/verifyToken";

const projectRouter = Router();

projectRouter.get("/", protect, getProjects);
projectRouter.get("/progress/:id", protect, allProjectProgress);
projectRouter.get("/searchProject", protect, searchProject);
projectRouter.post("/", protect, createProject);
projectRouter.put("/:id", protect, editProject);
projectRouter.delete("/:id", protect, deleteProject);

export { projectRouter };
