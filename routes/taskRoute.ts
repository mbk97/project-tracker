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
import { protect } from "../auth/verifyToken";

const taskRouter = Router();

taskRouter.get("/:id", protect, getAllTaskByProjectId);
taskRouter.get("/singleTask/:id", protect, getSingleTaskById);
taskRouter.get("/", protect, getAllTask);
taskRouter.post("/search", protect, searchTaskByName);
taskRouter.put("/:id", protect, updateTask);
taskRouter.delete("/:id", protect, deleteTask);
taskRouter.post("/", protect, createTask);

export { taskRouter };
