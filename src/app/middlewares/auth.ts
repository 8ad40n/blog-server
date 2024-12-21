import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Invalid or missing token");
    }

    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
    const { email, role, iat } = decoded;

    if (!email || !role) {
      throw new Error("Invalid token payload");
    }

    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      throw new Error("Email not found");
    }
    if (checkUser.isBlocked) {
      throw new Error("User is blocked");
    }

    req.user = decoded as JwtPayload;
    next();

  });
};
