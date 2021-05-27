import express from "express";
import controller from "../controllers/order";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import { extractRequest } from "../helpers/extractRequest";
import { ProductAddSchema, ProductUpdateSchema } from "../validations/product";
import { upload } from "../helpers/uploadImage";

export const orderRouter = express.Router();

//user
orderRouter.post(
  "/api/v1/user/order/create",
  extractUserJWT,
  controller.addOrder
);
orderRouter.put(
  "/api/v1/user/order/cancel/:order_id",
  extractUserJWT,
  controller.cancelOrder
);
orderRouter.get(
  "/api/v1/user/order/get/:customer_id",
  extractUserJWT,
  controller.getUserOrders
);
orderRouter.get(
  "/api/v1/user/order/status/get",
  extractUserJWT,
  controller.getUserOrders
);
orderRouter.get(
  "/api/v1/user/dealer/order/status/get/:month/:dealer_id",
  extractUserJWT,
  controller.getDealerOrdersStatus
);
orderRouter.get(
  "/api/v1/user/customer/order/status/get/:month/:customer_id",
  extractUserJWT,
  controller.getCustomerOrdersStatus
);

//admin
orderRouter.get("/api/v1/admin/order/get", controller.getAllOrders);
orderRouter.get(
  "/api/v1/admin/order/status/get/:month",
  extractAdminJWT,
  controller.getOrdersStatus
);
