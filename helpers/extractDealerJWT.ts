import jwt from "jsonwebtoken";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";

const extractDealerJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, config.server.token.dealerSecretKey, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          success: false,
          message: "لا يسمح لك بالدخول!!!",
          error,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "لا يسمح لك بالدخول!!!",
      error: {},
    });
  }
};

export default extractDealerJWT;
