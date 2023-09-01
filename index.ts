import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { projectRouter } from "./routes/projectRoute";
import { taskRouter } from "./routes/taskRoute";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
