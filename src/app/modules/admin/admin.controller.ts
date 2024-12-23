import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";

const blockUser = catchAsync(async (req:Request, res:Response) => {
    const result = await AdminServices.blockUser(req.params.userId);
    res.send({
        "success": true,
        "message": "User blocked successfully",
        "statusCode": 200
      })
})

export const AdminControllers = {
    blockUser,
};