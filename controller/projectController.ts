import { Request, Response } from "express";
import { createProjectSchema } from "../utils/validation";
import project from "../model/projectModel";

const getProjects = async (req: Request, res: Response) => {
  try {
    const projectsData = await project.find();

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

const createProject = async (req: Request, res: Response) => {
  const { projectName, projectDescription, startDate, endDate, status } =
    req.body;

  const { error } = createProjectSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
  }

  try {
    const newProject = await project.create({
      projectName,
      projectDescription,
      startDate,
      endDate,
      status,
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

const editProject = async (req: Request, res: Response) => {
  try {
    const projectId = await project.findById(req.params.id);

    if (!projectId) {
      res.status(400).json({
        message: "Project not found",
      });
    }

    const updatedProject = await project.findByIdAndUpdate(
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

const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = await project.findById(req.params.id);

    if (!projectId) {
      res.status(400).json({
        message: "Project not found",
      });

      return;
    }

    const data = await project.findByIdAndDelete(projectId);
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

export { createProject, editProject, getProjects, deleteProject };
