import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async(req: Request, res: Response)=>{
    const result = await UserServices.createUser(req.body);
    res.send({
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
});

export const UserControllers = {
    createUser,
}