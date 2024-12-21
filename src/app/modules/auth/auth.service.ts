import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config/config";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const login = async (payload: ILogin) =>{
    const checkUser = await UserModel.findOne({email: payload.email});
    if(!checkUser){
        throw new Error("Email not found");
    }
    if(checkUser.isBlocked){
        throw new Error("User is blocked");
    }
    const isPasswordMatch = bcrypt.compareSync(payload.password, checkUser.password);
    if(!isPasswordMatch){
        throw new Error("Invalid password");
    }

    const jwtPayload = {
        email: checkUser.email,
        role: checkUser.role,
    }
    
    const accessToken = createToken(jwtPayload, config.jwt_secret, '1h');
    const refreshToken = createToken(jwtPayload, config.jwt_secret, '7d');
    return {accessToken, refreshToken};
}

export const refreshToken = async (refreshToken: string) => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(refreshToken, config.jwt_secret) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }

  const { email, role } = decoded;
  if (!email || !role) {
    throw new Error("Invalid token payload");
  }

  const checkUser = await UserModel.findOne({ email });
  if (!checkUser) {
    throw new Error("Email not found");
  }
  if (checkUser.isBlocked) {
    throw new Error("User is blocked");
  }

  const jwtPayload = {
    email: checkUser.email,
    role: checkUser.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_secret, "1h");
  return { accessToken };
};

export const AuthServices = {
    login,
    refreshToken
}