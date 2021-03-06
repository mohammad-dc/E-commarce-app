import express from "express";
import controller from "../controllers/customer";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractCustomerJWT from "../helpers/extractCustomerJWT";
import { extractRequest } from "../helpers/extractRequest";
import {
  userSignupSchema,
  userLoginSchema,
  userUpdateSchema,
} from "../validations/user";
import { upload } from "../helpers/uploadImage";

export const customerRouter = express.Router();

//customer
customerRouter.get(
  "/api/v1/user/customer/verify",
  extractCustomerJWT,
  controller.verifyLogin
);
customerRouter.post(
  "/api/v1/user/customer/auth/register",
  extractRequest(userSignupSchema),
  controller.registerUser
);
customerRouter.post(
  "/api/v1/user/customer/auth/login",
  extractRequest(userLoginSchema),
  controller.loginUser
);
customerRouter.put(
  "/api/v1/user/customer/update/with-image/:id",
  extractCustomerJWT,
  upload.single("image"),
  extractRequest(userUpdateSchema),
  controller.updateCustomerWithImage
);
customerRouter.put(
  "/api/v1/user/customer/update/:id",
  extractCustomerJWT,
  extractRequest(userUpdateSchema),
  controller.updateCustomerWithoutImage
);
customerRouter.get(
  "/api/v1/user/customer/get/:id",
  extractCustomerJWT,
  controller.retrieveUser
);

// admin
customerRouter.delete(
  "/api/v1/admin/customer/delete/:id",
  extractAdminJWT,
  controller.deleteUser
);
customerRouter.get(
  "/api/v1/admin/customer/get/:month?",
  extractAdminJWT,
  controller.getAllUsers
);

customerRouter.get(
  "/api/v1/admin/customer/count/get/:month",
  extractAdminJWT,
  controller.getUsersCount
);
