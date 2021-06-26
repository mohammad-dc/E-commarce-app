import express from "express";
import controller from "../controllers/privacy";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractDealerJWT from "../helpers/extractDealerJWT";
import extractCustomerJWT from "../helpers/extractCustomerJWT";
import { extractRequest } from "../helpers/extractRequest";
import { privacySchema } from "../validations/privacy";

export const privacyRouter = express.Router();

//admin
privacyRouter.post(
  "/api/v1/admin/privacy/create",
  extractAdminJWT,
  extractRequest(privacySchema),
  controller.createPrivacy
);
privacyRouter.put(
  "/api/v1/admin/privacy/update",
  extractAdminJWT,
  extractRequest(privacySchema),
  controller.updatePrivacy
);
privacyRouter.get(
  "/api/v1/admin/privacy/get",
  extractAdminJWT,
  controller.getPrivacy
);

//customer
privacyRouter.get("/api/v1/user/privacy/get", controller.getPrivacy);
