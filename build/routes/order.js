"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var order_1 = __importDefault(require("../controllers/order"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractUserJWT_1 = __importDefault(require("../helpers/extractUserJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var order_2 = require("../validations/order");
exports.orderRouter = express_1.default.Router();
//user
exports.orderRouter.post("/api/v1/user/customer/order/create", extractUserJWT_1.default, extractRequest_1.extractRequest(order_2.orderSchema), order_1.default.addOrder);
exports.orderRouter.put("/api/v1/user/customer/order/cancel/:order_id", extractUserJWT_1.default, order_1.default.cancelOrder);
exports.orderRouter.get("/api/v1/user/customer/order/get/:customer_id/:month", extractUserJWT_1.default, order_1.default.getUserOrders);
exports.orderRouter.get("/api/v1/user/dealer/order/get/:dealer_id/:month", extractUserJWT_1.default, order_1.default.getDealerOrders);
exports.orderRouter.get("/api/v1/user/order/status/get", extractUserJWT_1.default, order_1.default.getUserOrders);
exports.orderRouter.get("/api/v1/user/dealer/order/status/get/:month/:dealer_id", extractUserJWT_1.default, order_1.default.getDealerOrdersStatus);
exports.orderRouter.get("/api/v1/user/customer/order/status/get/:month/:customer_id", extractUserJWT_1.default, order_1.default.getCustomerOrdersStatus);
//admin
exports.orderRouter.get("/api/v1/admin/order/get", order_1.default.getAllOrders);
exports.orderRouter.get("/api/v1/admin/order/status/get/:month", extractAdminJWT_1.default, order_1.default.getOrdersStatus);
