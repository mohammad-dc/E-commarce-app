import express from "express";
import controller from "../controllers/admin";
import extractAdminJWT from "../helpers/extractAdminJWT";
import { extractRequest } from "../helpers/extractRequest";
import { AdminSchema } from "../validations/admin";

export const adminRouter = express.Router();

adminRouter.post(
  "/api/v1/admin/auth/login",
  extractRequest(AdminSchema),
  controller.login
);
adminRouter.put(
  "/api/v1/admin/update",
  extractAdminJWT,
  extractRequest(AdminSchema),
  controller.updateAdmin
);
