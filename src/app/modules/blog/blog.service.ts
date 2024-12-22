import { Types } from "mongoose";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const addBlog = async (payload: IBlog, author: Types.ObjectId) => {
    const blog = await BlogModel.create({ ...payload, author });
    return blog;
}

export const BlogServices ={
    addBlog,
}