import jwt from "jsonwebtoken";
import config from "../config/config";
import {IAdmin} from "../interfaces/admin";

const signAdminJWT = (admin: IAdmin, callback: (error: Error | null, token: string | null) => void): void =>{

    try{
        jwt.sign(
            {
                email: admin.email
            },
            config.server.token.adminSecretKey,
            {
                issuer: config.server.token.adminIssureKey,
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

export default signAdminJWT;