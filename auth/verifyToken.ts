import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "../model/userModel";

const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    // get the token from the header
    let token = req.headers.authorization.split(" ")[1];

    //   verify the token
    const decoded: any = verify(token, process.env.TOKEN_SECRET as string);

    //   this allows the user to be extracted from the token
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

export { protect };
