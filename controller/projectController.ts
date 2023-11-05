import { Request, Response } from "express";
import { IProject, ITask } from "../types/types";
import userModel from "../model/userModel";
import Task from "../model/taskModel";
import Project from "../model/projectModel";
// import { createProjectSchema } from "../utils/validation";

const getProjects = async (req: any, res: Response) => {
  try {
    const projectsData = await Project.find({ user: req.user.id });
    const totalProjects = projectsData.length;
    if (projectsData) {
      res.status(200).json({
        message: "successful",
        data: projectsData,
        totalNoOfProjects: totalProjects,
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

const createProject = async (req: any, res: Response) => {
  const { projectName, projectDescription, startDate, endDate, status } =
    req.body;

  // const { error } = createProjectSchema.validate(req.body);

  // if (error) {
  //   res.status(400).send(error?.details[0]?.message);
  // }

  try {
    const newProject = await Project.create({
      projectName: projectName,
      projectDescription: projectDescription,
      startDate: startDate,
      endDate: endDate,
      status: status,
      user: req?.user.id,
    });

    if (newProject) {
      res.status(201).json({
        message: "A new project is created",
        data: newProject,
      });
    }
  } catch (error: any) {
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

const editProject = async (req: any, res: Response) => {
  try {
    const projectData = await Project.findById(req.params.id);

    if (!projectData) {
      res.status(400).json({
        message: "Project not found",
      });
    }

    // find the user
    const user = await userModel.findById(req.user.id);

    // make sure the loggedin user matches the note user
    if (projectData?.user.toString() !== user?.id) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (updatedProject) {
      res.status(200).json({
        message: "Project updated",
        data: updatedProject,
      });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  }
};

const deleteProject = async (req: any, res: Response) => {
  try {
    const projectData = await Project.findById(req.params.id);

    if (!projectData) {
      res.status(400).json({
        message: "Project not found",
      });
      return;
    }
    // find the user
    const user = await userModel.findById(req.user.id);

    // make sure the loggedin user matches the note user
    if (!user || projectData.user.toString() !== user.id) {
      return res.status(400).json({ message: "User not authorized" });
    }

    const data = await Project.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({
        message: "Project deleted",
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

const searchProject = async (req: any, res: Response) => {
  try {
    const { projectName } = req.body;

    if (!projectName) {
      res.status(400).json({
        message: "project name not attached",
      });
      return;
    }

    const allProject = await Project.find({ user: req.user.id });
    const response = allProject.filter((project: IProject) => {
      return project?.projectName
        .toLowerCase()
        .includes(projectName.toLowerCase());
    });

    if (response.length === 0) {
      res.status(400).json({
        message: "Project not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: response,
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

const allProjectProgress = async (req: Request, res: Response) => {
  try {
    const projectData = await Project.findById(req.params.id);
    const projectId = projectData?._id.toString();

    if (!projectId) {
      res.status(400).json({
        message: "project does not exist",
      });
      return;
    }
    const tasks = await Task.find({ projectId });
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task: ITask) => {
      return task.taskStatus === "completed";
    });

    const percentageCompleted = (completedTasks.length / totalTasks) * 100;

    if (tasks) {
      res.status(200).json({
        message: "All task",
        completed: `${percentageCompleted}%`,
        task: tasks,
      });
    } else {
      res.status(400).json("no tasks found");
    }
  } catch (error) {}
};

export {
  createProject,
  editProject,
  getProjects,
  deleteProject,
  searchProject,
  allProjectProgress,
};
