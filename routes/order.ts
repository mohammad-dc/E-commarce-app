import express from "express";
import controller from "../controllers/order";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractCustomerJWT from "../helpers/extractCustomerJWT";
import extractDealerJWT from "../helpers/extractDealerJWT";
import { extractRequest } from "../helpers/extractRequest";
import { orderSchema } from "../validations/order";

export const orderRouter = express.Router();

//customer
orderRouter.post(
  "/api/v1/user/customer/order/create",
  extractCustomerJWT,
  extractRequest(orderSchema),
  controller.addOrder
);
orderRouter.put(
  "/api/v1/user/customer/order/cancel/:order_id",
  extractCustomerJWT,
  controller.cancelOrder
);
orderRouter.get(
  "/api/v1/user/customer/order/get/:customer_id/:month",
  extractCustomerJWT,
  controller.getUserOrders
);
orderRouter.get(
  "/api/v1/user/customer/order/status/get/:month/:customer_id",
  extractCustomerJWT,
  controller.getCustomerOrdersStatus
);

//dealer
orderRouter.get(
  "/api/v1/user/dealer/order/get/:dealer_id/:month",
  extractDealerJWT,
  controller.getDealerOrders
);
orderRouter.get(
  "/api/v1/user/dealer/order/status/get/:month/:dealer_id",
  extractDealerJWT,
  controller.getDealerOrdersStatus
);

//admin
orderRouter.get("/api/v1/admin/order/get", controller.getAllOrders);
orderRouter.get(
  "/api/v1/admin/order/status/get/:month",
  extractAdminJWT,
  controller.getOrdersStatus
);
