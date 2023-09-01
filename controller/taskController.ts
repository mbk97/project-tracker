import { Request, Response } from "express";
import { ITask } from "../types/types";
import { createTaskSchema } from "../utils/validation";
import taskModel from "../model/taskModel";
import projectModel from "../model/projectModel";

const getAllTaskByProjectId = async (req: Request, res: Response) => {
  try {
    const projectData = await projectModel.findById(req.params.id);

    if (!projectData) {
      return res.status(404).json({ message: "Project not found" });
    }

    const projectId = projectData._id;
    const tasks = await taskModel.find({ projectId });

    res.status(200).json({
      message: "Successful",
      data: tasks,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

const getSingleTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const taskData = await taskModel.find({
      _id: task?._id,
    });

    res.status(200).json({
      message: "Successful",
      data: taskData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

const createTask = async (req: Request<ITask>, res: Response) => {
  const {
    taskName,
    taskDescription,
    taskStartDate,
    taskEndDate,
    taskComment,
    taskStatus,
    projectId,
    projectName,
  } = req.body;

  const { error } = createTaskSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
  }

  try {
    const newTask = await taskModel.create({
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskComment,
      taskStatus,
      projectId,
      projectName,
    });

    if (newTask) {
      res.status(200).json({
        message: "New task created",
        data: newTask,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = await taskModel.findById(req.params.id);

    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const updatedTaskData = await taskModel.findByIdAndUpdate(
      taskId,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Task updated",
      data: updatedTaskData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = await taskModel.findById(req.params.id);

    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const response = await taskModel.findByIdAndDelete(taskId);
    if (response) {
      res.status(200).json({
        message: "Task deleted",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occured",
      });
    }
  }
};

export {
  createTask,
  getAllTaskByProjectId,
  getSingleTaskById,
  updateTask,
  deleteTask,
};
