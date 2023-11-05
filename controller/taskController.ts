import { Request, Response } from "express";
import { ITask } from "../types/types";
import { createTaskSchema } from "../utils/validation";
import Task from "../model/taskModel";
import Project from "../model/projectModel";
import userModel from "../model/userModel";
import { checkUserAuthorization } from "../utils/authorization";

const getAllTask = async (req: any, res: Response) => {
  try {
    const data = await Task.find({ user: req.user.id });
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

const getAllTaskByProjectId = async (req: any, res: Response) => {
  try {
    const projectData = await Project.findById(req.params.id);

    if (!projectData) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // find the user
    const user = await userModel.findById(req.user.id);

    // make sure the loggedin user matches the task owner
    if (projectData?.user.toString() !== user?._id.toString()) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const projectId = projectData._id;
    const task = await Task.find({ projectId });

    res.status(200).json({
      message: "Successful",
      data: task,
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

const getSingleTaskById = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(400).json({
        message: "Task not found",
      });
      return;
    }

    // find the user
    const user = await userModel.findById(req.user.id);

    console.log(task, "Hello");

    // make sure the loggedin user matches the note user
    if (task?.user.toString() !== user?._id.toString()) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const taskData = await Task.find({
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

const createTask = async (req: any, res: Response) => {
  const {
    taskName,
    taskDescription,
    TasktartDate,
    taskEndDate,
    taskComment,
    Tasktatus,
    projectId,
    projectName,
  } = req.body;

  const { error } = createTaskSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
    return;
  }

  // find the user
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(400).json({
      message: "User does not exist",
    });

    return;
  }

  const project = await Project.findById(projectId);

  if (!project) {
    res.status(400).json({
      message: "Project does not exist",
    });

    return;
  }

  // check if the user is the owner of the project
  if (project.user.toString() !== user._id.toString()) {
    res.status(403).json({
      message: "You are not authorized to create a task for this project",
    });
    return;
  }

  try {
    const newTask = await Task.create({
      taskName,
      taskDescription,
      TasktartDate,
      taskEndDate,
      taskComment,
      Tasktatus,
      projectId,
      projectName,
      user: req?.user.id,
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

const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const updatedTaskData = await Task.findByIdAndUpdate(
      task?._id.toString(),
      req.body,
      {
        new: true,
      },
    );

    const user = await userModel.findById(req.user.id);

    // make sure the loggedin user matches the note user
    if (task?.user.toString() !== user?.id) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

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

const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(400).json({
        message: "Task not found",
      });
    }

    const user = await userModel.findById(req.user.id);

    // make sure the loggedin user matches the note user
    if (task?.user.toString() !== user?._id.toString()) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const response = await Task.findByIdAndDelete(task?._id.toString());
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

const searchTaskByName = async (req: any, res: Response) => {
  try {
    const { taskName, projectId } = req.body;
    if (!taskName) {
      res.status(400).json({
        message: "Task name is required",
      });
      return;
    }

    const user = await userModel.findById(req.user.id);
    const project = await Project.findById(projectId);

    if (project?.user.toString() !== user?._id.toString()) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const taskData = await Task.find({ projectId: projectId });
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
