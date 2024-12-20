import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async(payload: IUser)=>{
    const checkEmailExists = await UserModel.findOne({ email: payload.email});
    if(checkEmailExists){
        throw new Error("Email already exists");
    }
    const user = await UserModel.create(payload);
    return user;
}


export const UserServices = {
    createUser,
}