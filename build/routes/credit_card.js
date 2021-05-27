"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditRouter = void 0;
var express_1 = __importDefault(require("express"));
var credit_cards_1 = __importDefault(require("../controllers/credit_cards"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractUserJWT_1 = __importDefault(require("../helpers/extractUserJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var credit_card_1 = require("../validations/credit_card");
exports.creditRouter = express_1.default.Router();
//customer && dealer
exports.creditRouter.post('/api/v1/user/credit/add', extractUserJWT_1.default, extractRequest_1.extractRequest(credit_card_1.CreditCardSchema), credit_cards_1.default.addCreditCard);
exports.creditRouter.put('/api/v1/user/credit/delete/:id', extractUserJWT_1.default, credit_cards_1.default.deleteCreditCard);
exports.creditRouter.delete('/api/v1/user/credit/get/:owner_id&:owner_type', extractUserJWT_1.default, credit_cards_1.default.getAllOwnerCreditCards);
//admin
exports.creditRouter.post('/api/v1/admin/credit/add', extractAdminJWT_1.default, extractRequest_1.extractRequest(credit_card_1.CreditCardSchema), credit_cards_1.default.addCreditCard);
exports.creditRouter.put('/api/v1/admin/credit/delete/:id', extractAdminJWT_1.default, credit_cards_1.default.deleteCreditCard);
exports.creditRouter.delete('/api/v1/admin/credit/get/:owner_id&:owner_type', extractAdminJWT_1.default, credit_cards_1.default.getAllOwnerCreditCards);
exports.creditRouter.delete('/api/v1/admin/credit/transition/get/:owner_type', extractAdminJWT_1.default, credit_cards_1.default.getAllTransitionCreditCards);
