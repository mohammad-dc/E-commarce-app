import jwt from "jsonwebtoken";
import config from "../config/config";
import {IUser} from "../interfaces/user";

const signUserJWT = (admin: IUser, callback: (error: Error | null, token: string | null) => void): void =>{

    try{
        jwt.sign(
            {
                email: admin.email
            },
            config.server.token.userSecretKey,
            {
                issuer: config.server.token.userIssureKey,
                algorithm: 'HS256',
                expiresIn: '1d'
            }, 
            (error, token) => {
                if(error) {
                    callback(error, null)
                } else if (token) {
                    callback(null, token)
                }
            }
        )
    } catch(error) {
        callback(error, null)
    }
}

export default signUserJWT;