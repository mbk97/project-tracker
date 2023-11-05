import { Request } from "express";

export interface IProject {
  user: any;
  projectName: string;
  projectDescription: string;
  startDate: any;
  endDate: any;
  status: string;
  _id: any;
}

export interface IUser {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface ITask {
  user: any;
  taskName: string;
  taskDescription: string;
  taskComment: string;
  taskStartDate: string | any;
  taskEndDate: string | any;
  taskStatus: string;
  projectId: string;
  projectName: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}
