import express from "express";
import controller from "../controllers/chat";
import extractUserJWT from "../helpers/extractUserJWT";
import { extractRequest } from "../helpers/extractRequest";
import { CartSchema } from "../validations/cart";

export const chatRouter = express.Router();

chatRouter.post("/api/v1/chat/add", extractUserJWT, controller.chat);
chatRouter.get(
  "/api/v1/chat/get/:user_id/:dealer_id",
  extractUserJWT,
  controller.getChatMessages
);
