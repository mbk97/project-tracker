import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("hello");
});
