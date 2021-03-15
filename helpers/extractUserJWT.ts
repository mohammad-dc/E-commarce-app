import jwt from "jsonwebtoken";
import config from "../config/config";
import {Request, Response, NextFunction} from 'express';

const extractUserJWT = (req: Request, res: Response, next: NextFunction) =>{
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.userSecretKey, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: 'لا يسمح لك بالدخول!!!',
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'لا يسمح لك بالدخول!!!'
        });
    }
}

export default extractUserJWT;