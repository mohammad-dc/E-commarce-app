"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
var express_1 = __importDefault(require("express"));
var chat_1 = __importDefault(require("../controllers/chat"));
var extractUserJWT_1 = __importDefault(require("../helpers/extractUserJWT"));
exports.chatRouter = express_1.default.Router();
exports.chatRouter.post("/api/v1/chat/add", extractUserJWT_1.default, chat_1.default.chat);
exports.chatRouter.get("/api/v1/chat/get/:user_id/:dealer_id", extractUserJWT_1.default, chat_1.default.getChatMessages);
