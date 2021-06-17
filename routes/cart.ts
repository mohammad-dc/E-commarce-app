import express from "express";
import controller from "../controllers/cart";
import extractCustomerJWT from "../helpers/extractCustomerJWT";
import { extractRequest } from "../helpers/extractRequest";
import { CartSchema } from "../validations/cart";

export const cartRouter = express.Router();

//customer
cartRouter.post(
  "/api/v1/user/customer/cart/add",
  extractCustomerJWT,
  extractRequest(CartSchema),
  controller.addToCart
);
cartRouter.put(
  "/api/v1/user/customer/cart/update",
  extractCustomerJWT,
  extractRequest(CartSchema),
  controller.updateFromCart
);
cartRouter.delete(
  "/api/v1/user/customer/cart/delete",
  extractCustomerJWT,
  controller.deleteFromCart
);
cartRouter.get(
  "/api/v1/user/customer/cart/get/:customer_id",
  extractCustomerJWT,
  controller.getCart
);
