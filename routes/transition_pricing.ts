import express from "express";
import controller from "../controllers/transition_pricing";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import {extractRequest} from "../helpers/extractRequest";
import {TransitionPricingSchema} from "../validations/transition_pricing";

export const TransitionPricingRouter = express.Router();

//admin
TransitionPricingRouter.post('/api/v1/admin/transition-pricing/add', extractAdminJWT, extractRequest(TransitionPricingSchema), controller.addTransitionPricing);
TransitionPricingRouter.put('/api/v1/admin/transition-pricing/update/:id', extractAdminJWT, extractRequest(TransitionPricingSchema), controller.updateTransitionPricing);
TransitionPricingRouter.get('/api/v1/admin/transition-pricing/get',  controller.getAllTransitionsPricing);
TransitionPricingRouter.delete('/api/v1/admin/transition-pricing/delete/:id', extractAdminJWT, controller.deleteTransitionPricing);

//user
TransitionPricingRouter.get('/api/v1/user/transition-pricing/get', extractUserJWT, controller.getAllTransitionsPricing);