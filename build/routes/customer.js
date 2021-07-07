"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
var express_1 = __importDefault(require("express"));
var customer_1 = __importDefault(require("../controllers/customer"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractCustomerJWT_1 = __importDefault(require("../helpers/extractCustomerJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var user_1 = require("../validations/user");
exports.customerRouter = express_1.default.Router();
//customer
exports.customerRouter.get("/api/v1/user/customer/verify", extractCustomerJWT_1.default, customer_1.default.verifyLogin);
exports.customerRouter.post("/api/v1/user/customer/auth/register", extractRequest_1.extractRequest(user_1.userSignupSchema), customer_1.default.registerUser);
exports.customerRouter.post("/api/v1/user/customer/auth/login", extractRequest_1.extractRequest(user_1.userLoginSchema), customer_1.default.loginUser);
exports.customerRouter.put("/api/v1/user/customer/update/:id", extractCustomerJWT_1.default, function (req, res, next) {
    res.status(400).json({ success: typeof req.body });
    if (req.file) {
        res.status(400).json({ success: true });
    }
    else {
        res.status(400).json(req.body);
    }
}, extractRequest_1.extractRequest(user_1.userUpdateSchema), customer_1.default.updateUser);
exports.customerRouter.get("/api/v1/user/customer/get/:id", extractCustomerJWT_1.default, customer_1.default.retrieveUser);
// admin
exports.customerRouter.delete("/api/v1/admin/customer/delete/:id", extractAdminJWT_1.default, customer_1.default.deleteUser);
exports.customerRouter.get("/api/v1/admin/customer/get/:month?", extractAdminJWT_1.default, customer_1.default.getAllUsers);
exports.customerRouter.get("/api/v1/admin/customer/count/get/:month", extractAdminJWT_1.default, customer_1.default.getUsersCount);
