import bcrypt from "bcrypt";
import config from "../config/config";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async(payload: IUser)=>{
    const checkEmailExists = await UserModel.findOne({ email: payload.email});
    if(checkEmailExists){
        throw new Error("Email already exists");
    }

    const hashedPassword = bcrypt.hashSync(payload.password, config.bcrypt_salt);

    const user = await UserModel.create({...payload, password: hashedPassword});
    return user;
}


export const UserServices = {
    createUser,
}