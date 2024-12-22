import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserModel } from "../user/user.model";
import { BlogServices } from "./blog.service";

const addBlog = catchAsync(async(req:Request, res:Response)=>{
    const authorEmail = req.user.email;
    const payload = req.body;
    const author = await UserModel.findOne({email: authorEmail});
    if (!author) {
         res.status(404).send({
            status: 404,
            success: false,
            message: "Author not found",
        });
    }
    const result = await BlogServices.addBlog(payload, author._id);

    res.send({
        status: 201,
        success: true,
        message: "Blog created successfully",
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        }
    })
});

export const BlogControllers = {
    addBlog,
}