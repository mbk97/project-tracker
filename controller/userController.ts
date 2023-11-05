import { loginSchema, registerSchema } from "../utils/validation";
import { IUser } from "./../types/types";
import { Request, Response } from "express";
import userModel from "../model/userModel";
import { genSalt, hash, compare } from "bcryptjs";
import { generateToken } from "../utils/token";

const registerUser = async (req: Request<IUser>, res: Response) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error?.details[0]?.message);
    }
    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      res.status(400).json({
        message: "User already exist",
      });
      return;
    }

    //hash the password
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    const newUser = await userModel.create({
      name: name,
      email: email.toLowerCase(),
      password: hashPassword,
      phoneNumber: phoneNumber,
    });

    if (newUser) {
      res.status(200).json({
        message: "Registration successful",
        user: {
          name,
          hashPassword,
          phoneNumber,
          token: generateToken(newUser._id.toString()),
        },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

const login = async (req: Request<IUser>, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res.status(400).send(error?.details[0]?.message);
      return;
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      res.status(400).json({
        message: "user not registered",
      });
    }

    const validPassword = await compare(password, user?.password!);

    if (validPassword) {
      res.status(200).json({
        message: "Login successful",
        user: {
          name: user?.name,
          email: user?.email.toLowerCase(),
          token: generateToken(user?._id.toString()!),
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid login details" });
    }
  } catch (error) {
    if (error instanceof Error) {
      message: error.message;
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export { registerUser, login };
