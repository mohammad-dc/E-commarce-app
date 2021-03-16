import express from "express";
import controller from "../controllers/cart";
import extractUserJWT from "../helpers/extractUserJWT";
import {extractRequest} from "../helpers/extractRequest";
import {CartSchema} from "../validations/cart";

export const cartRouter = express.Router();

//customer
cartRouter.post('/api/v1/user/customer/cart/add', extractUserJWT, extractRequest(CartSchema),  controller.addToCart);
cartRouter.put('/api/v1/user/customer/cart/update', extractUserJWT, extractRequest(CartSchema), controller.updateFromCart);
cartRouter.delete('/api/v1/user/customer/cart/delete', extractUserJWT, controller.deleteFromCart);
cartRouter.get('/api/v1/user/customer/cart/get/:user_id', extractUserJWT, controller.getCart);
