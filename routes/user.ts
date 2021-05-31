import express from "express";
import controller from "../controllers/customer";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import { extractRequest } from "../helpers/extractRequest";
import {
  userSignupSchema,
  userLoginSchema,
  userUpdateSchema,
} from "../validations/user";
import { upload } from "../helpers/uploadImage";

export const userRouter = express.Router();

//user
userRouter.get(
  "/api/v1/user/customer/verify",
  extractUserJWT,
  controller.verifyLogin
);
userRouter.post(
  "/api/v1/user/customer/auth/register",
  extractRequest(userSignupSchema),
  controller.registerUser
);
userRouter.post(
  "/api/v1/user/customer/auth/login",
  extractRequest(userLoginSchema),
  controller.loginUser
);
userRouter.put(
  "/api/v1/user/customer/update/:id",
  extractUserJWT,
  extractRequest(userUpdateSchema),
  extractUserJWT,
  upload.single("image"),
  controller.updateUser
);
userRouter.get(
  "/api/v1/user/customer/get/:id",
  extractUserJWT,
  controller.retrieveUser
);

// admin
userRouter.delete(
  "/api/v1/admin/customer/delete/:id",
  extractAdminJWT,
  controller.deleteUser
);
userRouter.get(
  "/api/v1/admin/customer/get",
  extractAdminJWT,
  controller.getAllUsers
);
