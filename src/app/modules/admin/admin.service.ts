import { UserModel } from "../user/user.model";

const blockUser = async (id:string) => {
    const user = await UserModel.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    user.isBlocked = true;
    await user.save();
    return user;
    
}
export const AdminServices = {
    blockUser,
}