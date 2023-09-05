import { Schema, model } from "mongoose";
import { IUser } from "../types/types";

const userModel = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>("user", userModel);
