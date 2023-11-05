import { Model, Schema, model } from "mongoose";
import { IProject } from "../types/types";

const projectSchema = new Schema<IProject>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    projectName: {
      type: String,
      required: [true, "Project name is required"],
    },

    projectDescription: {
      type: String,
      required: [true, "Project description is required"],
    },

    startDate: {
      type: Date,
      required: [true, "start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "end date is required"],
    },
    status: {
      type: String,
      required: [true, "project status is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Project: Model<IProject> = model<IProject>("Project", projectSchema);

export default Project;
