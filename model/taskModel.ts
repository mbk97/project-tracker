import { Schema, model } from "mongoose";
import { ITask } from "../types/types";
import { Model } from "mongoose";

const taskSchema = new Schema<ITask>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    taskComment: {
      type: String,
      required: true,
    },
    taskStartDate: {
      type: Date,
      required: true,
    },
    taskStatus: {
      type: String,
      required: true,
    },
    taskEndDate: {
      type: Date,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task: Model<ITask> = model<ITask>("Project", taskSchema);

export default Task;
