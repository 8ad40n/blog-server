import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const login = catchAsync(async (req:Request, res:Response) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.send({
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: {
      accessToken: accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req:Request, res:Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.send({
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,

  });
});

export const AuthController = {
  login,
  refreshToken,
};
