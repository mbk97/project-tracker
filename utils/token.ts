import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};
