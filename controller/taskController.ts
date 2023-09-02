import { Request, Response } from "express";
import { ITask } from "../types/types";
import { createTaskSchema } from "../utils/validation";
import Tasks from "../model/taskModel";
import projectModel from "../model/projectModel";

const getAllTask = async (res: Response) => {
  try {
    const data = await Tasks.find();
    res.status(200).json({
      message: "successful",
      data: data,
      taskLength: data.length,
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

const getAllTaskByProjectId = async (req: Request, res: Response) => {
  try {
    const projectData = await projectModel.findById(req.params.id);

    if (!projectData) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const projectId = projectData._id;
    const tasks = await Tasks.find({ projectId });

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
    const task = await Tasks.findById(req.params.id);

    if (!task) {
      res.status(400).json({
        message: "Task not found",
      });
      return;
    }

    const taskData = await Tasks.find({
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

const createTask = async (req: Request, res: Response) => {
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
    return;
  }

  const checkProjectId = await projectModel.findById(projectId);

  if (!checkProjectId) {
    res.status(400).json({
      message: "Project does not exist",
    });

    return;
  }

  try {
    const newTask = await Tasks.create({
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
    const taskId = await Tasks.findById(req.params.id);

    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const updatedTaskData = await Tasks.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

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
    const taskId = await Tasks.findById(req.params.id);

    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const response = await Tasks.findByIdAndDelete(taskId);
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

const searchTaskByName = async (req: Request, res: Response) => {
  try {
    const { taskName } = req.body;
    if (!taskName) {
      res.status(400).json({
        message: "Task not found",
      });
      return;
    }
    const taskData = await Tasks.find();
    const response = taskData.filter((task: ITask) => {
      return task?.taskName.toLowerCase().includes(taskName.toLowerCase());
    });
    res.status(200).json({
      message: "successful",
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export {
  getAllTask,
  createTask,
  getAllTaskByProjectId,
  getSingleTaskById,
  updateTask,
  deleteTask,
  searchTaskByName,
};
