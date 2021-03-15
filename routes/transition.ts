import express from "express";
import controller from "../controllers/transition";
import extractAdminJWT from "../helpers/extractAdminJWT";
import {extractRequest} from "../helpers/extractRequest";
import {TransitionSchema} from "../validations/transition";

export const TransitionRouter = express.Router();

TransitionRouter.post('/api/v1/admin/transition/add', extractAdminJWT, extractRequest(TransitionSchema), controller.addTransition);
TransitionRouter.put('/api/v1/admin/transition/update/:id', extractAdminJWT, extractRequest(TransitionSchema), controller.updateTransition);
TransitionRouter.get('/api/v1/admin/transition/get', extractAdminJWT, controller.getAllTransitions);
TransitionRouter.delete('/api/v1/admin/transition/delete/:id', extractAdminJWT, controller.deleteTransition);