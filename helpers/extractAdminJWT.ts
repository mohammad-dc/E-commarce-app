import jwt from "jsonwebtoken";
import config from "../config/config";
import {Request, Response, NextFunction} from 'express';

const extractAdminJWT = (req: Request, res: Response, next: NextFunction) =>{
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.adminSecretKey, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: 'لا يسمح لك بالدخول, يرجى تسجيل الدخول مرة اخرى',
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'لا يسمح لك بالدخول, يرجى تسجيل الدخول مرة اخرى'
        });
    }
}

export default extractAdminJWT;