import * as jwt from 'jsonwebtoken';
export const createToken = (jwtPayload:{ email:string, role: "admin" | "user" | undefined},
    secret: string, expiresIn: string)=> {
        return jwt.sign(jwtPayload, secret, {expiresIn});
}