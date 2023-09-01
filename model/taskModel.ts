import { Schema, model } from "mongoose";
import { ITask } from "../types/types";

const taskSchema = new Schema<ITask>({
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
});

export default model<ITask>("tasks", taskSchema);
