export interface IProject {
  projectName: string;
  projectDescription: string;
  startDate: any;
  endDate: any;
  status: string;
  _id?: string;
}

export interface ITask {
  taskName: string;
  taskDescription: string;
  taskComment: string;
  taskStartDate: string | any;
  taskEndDate: string | any;
  taskStatus: string;
  projectId: string;
  projectName: string;
}
