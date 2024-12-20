import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async(req: Request, res: Response)=>{
    const result = await UserServices.createUser(req.body);
    res.send({
        status: 200,
        success: true,
        message: "User created successfully",
        data: result
    })
});

export const UserControllers = {
    createUser,
}