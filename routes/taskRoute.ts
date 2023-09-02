import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTaskByProjectId,
  getSingleTaskById,
  searchTaskByName,
  updateTask,
  getAllTask,
} from "../controller/taskController";

const taskRouter = Router();

taskRouter.get("/:id", getAllTaskByProjectId);
taskRouter.get("/singleTask/:id", getSingleTaskById);
taskRouter.get("/", getAllTask);
taskRouter.post("/search", searchTaskByName);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.post("/", createTask);

export { taskRouter };
