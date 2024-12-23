import { BlogModel } from "../blog/blog.model";
import { UserModel } from "../user/user.model";

const blockUser = async (id:string) => {
    const user = await UserModel.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    user.isBlocked = true;
    await user.save();
    return user;
    
};

const deleteBlog = async (id:string) => {
    const result = await BlogModel.findByIdAndDelete(id);
    return result;
}


export const AdminServices = {
    blockUser,
    deleteBlog,
}