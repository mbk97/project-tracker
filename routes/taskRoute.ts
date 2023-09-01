import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTaskByProjectId,
  getSingleTaskById,
  updateTask,
} from "../controller/taskController";

const taskRouter = Router();

taskRouter.get("/:id", getAllTaskByProjectId);
taskRouter.get("/singleTask/:id", getSingleTaskById);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.post("/", createTask);

export { taskRouter };
