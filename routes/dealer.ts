import express from "express";
import controller from "../controllers/dealer";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractDealerJWT from "../helpers/extractDealerJWT";
import { extractRequest } from "../helpers/extractRequest";
import {
  dealerSignupSchema,
  dealerLoginSchema,
  dealerUpdateSchema,
} from "../validations/dealer";
import { upload } from "../helpers/uploadImage";

export const dealerRouter = express.Router();

//dealer
dealerRouter.get(
  "/api/v1/user/dealer/verify",
  extractDealerJWT,
  controller.verifyLogin
);
dealerRouter.post(
  "/api/v1/user/dealer/auth/register",
  upload.single("SSN_image"),
  extractRequest(dealerSignupSchema),
  controller.registerDealer
);
dealerRouter.post(
  "/api/v1/user/dealer/auth/login",
  extractRequest(dealerLoginSchema),
  controller.loginDealer
);
dealerRouter.put(
  "/api/v1/user/dealer/update/:id",
  extractDealerJWT,
  upload.single("image"),
  extractRequest(dealerUpdateSchema),
  controller.updateDealer
);
dealerRouter.get(
  "/api/v1/user/dealer/get/:id",
  extractDealerJWT,
  controller.retrieveDealer
);

// admin
dealerRouter.delete(
  "/api/v1/admin/dealer/delete/:id",
  extractAdminJWT,
  controller.deleteDealer
);
dealerRouter.get(
  "/api/v1/admin/dealer/get/:accepted",
  extractAdminJWT,
  controller.getAllDealers
);
dealerRouter.put(
  "/api/v1/admin/dealer/active/:id",
  extractAdminJWT,
  controller.acceptDealer
);
dealerRouter.put(
  "/api/v1/admin/dealer/percentage/:id",
  extractAdminJWT,
  controller.changePercentageSales
);
