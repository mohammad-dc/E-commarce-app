import jwt from "jsonwebtoken";
import config from "../config/config";
import { IUser } from "../interfaces/user";

const signDealerJWT = (
  admin: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  try {
    jwt.sign(
      {
        email: admin.email,
      },
      config.server.token.dealerSecretKey,
      {
        issuer: config.server.token.dealerIssuerKey,
        algorithm: "HS256",
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    callback(error, null);
  }
};

export default signDealerJWT;
