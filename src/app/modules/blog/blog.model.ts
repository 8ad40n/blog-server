import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      minlength: [5, "Blog title must be at least 5 characters long"],
      maxlength: [100, "Blog title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      minlength: [20, "Blog content must be at least 20 characters long"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const BlogModel = model<IBlog>("blog", blogSchema);