import { Request, Response } from "express";
import { Types } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { UserModel } from "../user/user.model";
import { BlogServices } from "./blog.service";

const addBlog = catchAsync(async(req:Request, res:Response):Promise<any>=>{
    const authorEmail = req.user.email;
    const payload = req.body;
    const authorDoc = await UserModel.findOne({ email: authorEmail });
    if (!authorDoc) {
        return res.status(404).send({
            status: 404,
            success: false,
            message: "Author not found",
        });
    }
    const author: Types.ObjectId = authorDoc._id;
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
});


const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const blogs = await BlogServices.getAllBlogs(query);

    res.status(200).send({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: blogs,
    });
});

export const BlogControllers = {
    addBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
}