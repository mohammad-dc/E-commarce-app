"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionPricingRouter = void 0;
var express_1 = __importDefault(require("express"));
var transition_pricing_1 = __importDefault(require("../controllers/transition_pricing"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractCustomerJWT_1 = __importDefault(require("../helpers/extractCustomerJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var transition_pricing_2 = require("../validations/transition_pricing");
exports.TransitionPricingRouter = express_1.default.Router();
//admin
exports.TransitionPricingRouter.post("/api/v1/admin/transition-pricing/add", extractAdminJWT_1.default, extractRequest_1.extractRequest(transition_pricing_2.TransitionPricingSchema), transition_pricing_1.default.addTransitionPricing);
exports.TransitionPricingRouter.put("/api/v1/admin/transition-pricing/update/:id", extractAdminJWT_1.default, extractRequest_1.extractRequest(transition_pricing_2.TransitionPricingSchema), transition_pricing_1.default.updateTransitionPricing);
exports.TransitionPricingRouter.get("/api/v1/admin/transition-pricing/get", transition_pricing_1.default.getAllTransitionsPricing);
exports.TransitionPricingRouter.delete("/api/v1/admin/transition-pricing/delete/:id", extractAdminJWT_1.default, transition_pricing_1.default.deleteTransitionPricing);
//customer
exports.TransitionPricingRouter.get("/api/v1/user/customer/transition-pricing/get", extractCustomerJWT_1.default, transition_pricing_1.default.getAllTransitionsPricing);
