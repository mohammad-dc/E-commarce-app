import express from "express";
import controller from "../controllers/product";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractCustomerJWT from "../helpers/extractCustomerJWT";
import extractDealerJWT from "../helpers/extractDealerJWT";
import { extractRequest } from "../helpers/extractRequest";
import { ProductAddSchema, ProductUpdateSchema } from "../validations/product";
import { upload } from "../helpers/uploadImage";

export const productRouter = express.Router();

// dealer
productRouter.post(
  "/api/v1/user/dealer/product/create",
  extractDealerJWT,
  upload.single("image"),
  extractRequest(ProductAddSchema),
  controller.addProduct
);
productRouter.put(
  "/api/v1/user/dealer/product/update/:id",
  extractDealerJWT,
  upload.single("image"),
  extractRequest(ProductUpdateSchema),
  controller.updateProducts
);
productRouter.delete(
  "/api/v1/user/dealer/product/delete/:id",
  extractDealerJWT,
  controller.deleteProduct
);
productRouter.get(
  "/api/v1/user/dealer/product/get/:dealer_id/:limit?",
  extractDealerJWT,
  controller.getAllDealerProducts
);

//admin
productRouter.delete(
  "/api/v1/admin/product/delete/:id",
  extractAdminJWT,
  controller.deleteProduct
);
productRouter.get(
  "/api/v1/admin/product/get/:limit?",
  extractAdminJWT,
  controller.getAllProducts
);

//customer
productRouter.get(
  "/api/v1/user/customer/product/search/:search_name/:type/:limit?",
  extractCustomerJWT,
  controller.searchProduct
);
productRouter.get(
  "/api/v1/user/customer/product/get/:limit?",
  extractCustomerJWT,
  controller.getAllProducts
);
productRouter.get(
  "/api/v1/user/customer/product/sample/get",
  extractCustomerJWT,
  controller.getSampleProducts
);
