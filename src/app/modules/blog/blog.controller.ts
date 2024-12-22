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

const updateBlog = catchAsync(async(req:Request, res:Response)=>{
    const id = req.params.id;
    const author = req.user.email;
    const body = req.body;
    const result = await BlogServices.updateBlog(id, body, author);
    const {blog, blogInfo} = result;
    res.send({
        status: 200,
        success: true,
        message: "Blog updated successfully",
        data: {
            blogInfo
        }
    })
})

const deleteBlog = catchAsync(async(req:Request, res:Response)=>{
    const id = req.params.id;
    const author = req.user.email;
    const result = await BlogServices.deleteBlog(id, author);
    res.send({
        status: 200,
        success: true,
        message: "Blog deleted successfully",
    })
})

export const BlogControllers = {
    addBlog,
    updateBlog,
    deleteBlog,
}