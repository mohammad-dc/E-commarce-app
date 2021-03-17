import express from "express";
import controller from "../controllers/credit_cards";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import {extractRequest} from "../helpers/extractRequest";
import {CreditCardSchema} from "../validations/credit_card";

export const creditRouter = express.Router();

//customer && dealer
creditRouter.post('/api/v1/user/credit/add', extractUserJWT, extractRequest(CreditCardSchema),  controller.addCreditCard);
creditRouter.put('/api/v1/user/credit/delete/:id', extractUserJWT, controller.deleteCreditCard);
creditRouter.delete('/api/v1/user/credit/get/:owner_id&:owner_type', extractUserJWT, controller.getAllOwnerCreditCards);

//admin
creditRouter.post('/api/v1/admin/credit/add', extractAdminJWT, extractRequest(CreditCardSchema),  controller.addCreditCard);
creditRouter.put('/api/v1/admin/credit/delete/:id', extractAdminJWT, controller.deleteCreditCard);
creditRouter.delete('/api/v1/admin/credit/get/:owner_id&:owner_type', extractAdminJWT, controller.getAllOwnerCreditCards);
creditRouter.delete('/api/v1/admin/credit/transition/get/:owner_type', extractAdminJWT, controller.getAllTransitionCreditCards);

