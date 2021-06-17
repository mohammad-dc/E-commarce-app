"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
var express_1 = __importDefault(require("express"));
var cart_1 = __importDefault(require("../controllers/cart"));
var extractCustomerJWT_1 = __importDefault(require("../helpers/extractCustomerJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var cart_2 = require("../validations/cart");
exports.cartRouter = express_1.default.Router();
//customer
exports.cartRouter.post("/api/v1/user/customer/cart/add", extractCustomerJWT_1.default, extractRequest_1.extractRequest(cart_2.CartSchema), cart_1.default.addToCart);
exports.cartRouter.put("/api/v1/user/customer/cart/update", extractCustomerJWT_1.default, extractRequest_1.extractRequest(cart_2.CartSchema), cart_1.default.updateFromCart);
exports.cartRouter.delete("/api/v1/user/customer/cart/delete", extractCustomerJWT_1.default, cart_1.default.deleteFromCart);
exports.cartRouter.get("/api/v1/user/customer/cart/get/:customer_id", extractCustomerJWT_1.default, cart_1.default.getCart);
