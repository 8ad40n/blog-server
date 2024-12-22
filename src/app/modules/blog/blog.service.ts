import { Types } from "mongoose";
import { UserModel } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const addBlog = async (payload: IBlog, author: Types.ObjectId) => {
    const blog = await BlogModel.create({ ...payload, author });
    return blog;
}

const updateBlog = async (id: string, payload: Partial<IBlog>, authorEmail: string) => {
    const blogInfo = await BlogModel.findById(id); 

    if (!blogInfo) {
        throw new Error("Blog not found");
    }

    const author = await UserModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("Author not found");
    }

    if (blogInfo.author.toString() !== author._id.toString()) {
        throw new Error("You are not the author of this blog");
    }

    const blog = await BlogModel.findByIdAndUpdate(id, payload, { new: true });
    return { blog, blogInfo };
};

const deleteBlog = async (id: string, authorEmail: string) => {
    const blogInfo = await BlogModel.findById(id); 

    if (!blogInfo) {
        throw new Error("Blog not found");
    }

    const author = await UserModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("Author not found");
    }

    if (blogInfo.author.toString() !== author._id.toString()) {
        throw new Error("You are not the author of this blog");
    }

    const result = await BlogModel.findByIdAndDelete(id);
    return result;

}


export const BlogServices ={
    addBlog,
    updateBlog,
    deleteBlog,
}