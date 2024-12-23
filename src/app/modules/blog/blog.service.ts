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

const getAllBlogs = async (query: Record<string, any>) => {
    const { search, sortBy, sortOrder, filter } = query;
  
    let blogsQuery = BlogModel.find();
  
    if (search) {
      blogsQuery = blogsQuery.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      });
    }
  
    if (filter) {
      blogsQuery = blogsQuery.find({ author: filter });
    }
  

    if (sortBy && sortOrder) {
      blogsQuery = blogsQuery.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
    } else if (sortBy) {
      blogsQuery = blogsQuery.sort({ [sortBy]: -1 }); 
    } else {
      blogsQuery = blogsQuery.sort({ createdAt: -1 });
    }
  
    const blogs = await blogsQuery.populate("author", "_id name email");
  
    return blogs;
  };
  


export const BlogServices ={
    addBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
}